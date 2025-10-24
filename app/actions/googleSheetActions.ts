"use server";

import { google } from "googleapis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

async function getRefreshedAccessToken(userId: string) {
  // Find the user's account in the database which contains the refresh token
  const account = await prisma.account.findFirst({
    where: {
      userId: userId,
      provider: "google",
    },
  });

  if (!account || !account.refresh_token) {
    throw new Error("Refresh token not found. Please re-authenticate.");
  }

  // Use the refresh token to get a new access token from Google
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: account.refresh_token,
      }),
    });

    const tokens = await response.json();

    if (!response.ok) {
      throw new Error(tokens.error_description || "Failed to refresh token");
    }

    // Update the access token and its expiry in the database for future use
    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        access_token: tokens.access_token,
        expires_at: Math.floor(Date.now() / 1000) + tokens.expires_in,
      },
    });

    return tokens.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Could not refresh access token. Please re-authenticate.");
  }
}

export async function readSheetData(spreadsheetId: string, range: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  // Find the user's account to check token expiry
  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      provider: 'google'
    }
  });

  if (!account) {
    throw new Error("Google account not linked.");
  }

  let accessToken = account.access_token;

  // Check if the token is expired (with a 60-second buffer)
  const isTokenExpired = Date.now() > (account.expires_at! * 1000 - 60000);

  if (isTokenExpired) {
    console.log("Access token expired, refreshing...");
    accessToken = await getRefreshedAccessToken(session.user.id);
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const sheets = google.sheets({ version: "v4", auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.data.values;
  } catch (error: any) {
    console.error("The Google Sheets API returned an error: " + error.message);
    throw new Error("Failed to fetch sheet data. Check the Sheet ID and permissions.");
  }
}