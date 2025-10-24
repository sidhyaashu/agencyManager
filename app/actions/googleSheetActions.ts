"use server";

import { google } from "googleapis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

// This helper function is now more central to our logic
async function getAuthenticatedAuthClient() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const account = await prisma.account.findFirst({
    where: { userId: session.user.id, provider: 'google' }
  });

  if (!account) throw new Error("Google account not linked.");

  const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });

  auth.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at ? account.expires_at * 1000 : null,
  });

  // Automatically handle token refreshing
  auth.on('tokens', async (tokens) => {
    if (tokens.refresh_token) {
      // New refresh token might be issued, save it.
      await prisma.account.update({
        where: { id: account.id },
        data: { refresh_token: tokens.refresh_token },
      });
    }
    await prisma.account.update({
      where: { id: account.id },
      data: {
        access_token: tokens.access_token,
        expires_at: Math.floor((auth.credentials.expiry_date || Date.now()) / 1000),
      },
    });
  });

  return auth;
}


// 1. ACTION: List all Google Sheets the user has
export async function listSheets() {
  const auth = await getAuthenticatedAuthClient();
  const drive = google.drive({ version: 'v3', auth });

  try {
    const res = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
      fields: 'files(id, name, modifiedTime)',
      orderBy: 'modifiedTime desc',
    });
    return res.data.files || [];
  } catch (error: any) {
    console.error("Error listing sheets:", error.message);
    throw new Error("Failed to list Google Sheets.");
  }
}

// 2. ACTION: Create a new Google Sheet
export async function createSheet(title: string) {
  const auth = await getAuthenticatedAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title,
        },
      },
    });
    return spreadsheet.data;
  } catch (error: any) {
    console.error("Error creating sheet:", error.message);
    throw new Error("Failed to create Google Sheet.");
  }
}

// 3. ACTION: Read data from a specific sheet (CRUD - Read)
export async function readSheetData(spreadsheetId: string, range: string) {
  const auth = await getAuthenticatedAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    return response.data.values;
  } catch (error: any) {
    console.error("The Google Sheets API returned an error: " + error.message);
    throw new Error("Failed to fetch sheet data. Check the Sheet ID and permissions.");
  }
}

// 4. ACTION: Update data in a specific sheet (CRUD - Update)
export async function updateSheetData(spreadsheetId: string, range: string, values: any[][]) {
  const auth = await getAuthenticatedAuthClient();
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error updating sheet:", error.message);
    throw new Error("Failed to update Google Sheet.");
  }
}