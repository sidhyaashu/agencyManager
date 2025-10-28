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



































// "use server";

// import { google } from "googleapis";
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
// import { prisma } from "@/lib/prisma";
// import { Auth } from "googleapis";

// // This is our new, more robust helper function
// async function getAuthenticatedAuthClient(): Promise<Auth.OAuth2Client> {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.id) {
//     throw new Error("Not authenticated: No session found.");
//   }

//   const account = await prisma.account.findFirst({
//     where: { userId: session.user.id, provider: 'google' }
//   });

//   if (!account) {
//     throw new Error("Google account not linked.");
//   }

//   if (!account.refresh_token) {
//     throw new Error("Refresh token not found. Please re-authenticate by logging out and back in.");
//   }

//   const auth = new google.auth.OAuth2({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   });

//   auth.setCredentials({
//     access_token: account.access_token,
//     refresh_token: account.refresh_token,
//     expiry_date: account.expires_at ? account.expires_at * 1000 : null,
//   });

//   // Check if the access token has expired.
//   // We use a 60-second buffer to be safe.
//   const isTokenExpired = account.expires_at ? (account.expires_at * 1000) < (Date.now() + 60000) : true;

//   if (isTokenExpired) {
//     console.log("Access token expired. Refreshing...");
//     try {
//       const { credentials } = await auth.refreshAccessToken();
      
//       // Update the database with the new tokens
//       await prisma.account.update({
//         where: {
//           provider_providerAccountId: {
//             provider: 'google',
//             providerAccountId: account.providerAccountId,
//           },
//         },
//         data: {
//           access_token: credentials.access_token,
//           expires_at: credentials.expiry_date ? Math.floor(credentials.expiry_date / 1000) : undefined,
//           // A new refresh token is sometimes returned, save it if it exists
//           refresh_token: credentials.refresh_token ?? account.refresh_token,
//         },
//       });
      
//       // Apply the new credentials to the auth client for the current request
//       auth.setCredentials(credentials);
//       console.log("Access token refreshed successfully.");
      
//     } catch (error: any) {
//       console.error("Error refreshing access token:", error.message);
//       // If refresh fails, it's a critical error. The user must re-authenticate.
//       throw new Error("Could not refresh access token. Please re-authenticate by logging out and back in.");
//     }
//   }

//   return auth;
// }


// // --- API Actions (No changes needed below this line) ---

// // 1. ACTION: List all Google Sheets the user has
// export async function listSheets() {
//   const auth = await getAuthenticatedAuthClient();
//   const drive = google.drive({ version: 'v3', auth });

//   try {
//     const res = await drive.files.list({
//       q: "mimeType='application/vnd.google-apps.spreadsheet'",
//       fields: 'files(id, name, modifiedTime)',
//       orderBy: 'modifiedTime desc',
//     });
//     return res.data.files || [];
//   } catch (error: any) {
//     console.error("Error listing sheets:", error.message);
//     throw new Error("Failed to list Google Sheets.");
//   }
// }

// // 2. ACTION: Create a new Google Sheet
// export async function createSheet(title: string) {
//   const auth = await getAuthenticatedAuthClient();
//   const sheets = google.sheets({ version: 'v4', auth });

//   try {
//     const spreadsheet = await sheets.spreadsheets.create({
//       requestBody: {
//         properties: {
//           title,
//         },
//       },
//     });
//     return spreadsheet.data;
//   } catch (error: any) {
//     console.error("Error creating sheet:", error.message);
//     throw new Error("Failed to create Google Sheet.");
//   }
// }

// // 3. ACTION: Read data from a specific sheet (CRUD - Read)
// export async function readSheetData(spreadsheetId: string, range: string) {
//   const auth = await getAuthenticatedAuthClient();
//   const sheets = google.sheets({ version: 'v4', auth });

//   try {
//     const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
//     return response.data.values;
//   } catch (error: any) {
//     console.error("The Google Sheets API returned an error: " + error.message);
//     throw new Error("Failed to fetch sheet data. Check the Sheet ID and permissions.");
//   }
// }

// // 4. ACTION: Update data in a specific sheet (CRUD - Update)
// export async function updateSheetData(spreadsheetId: string, range: string, values: any[][]) {
//   const auth = await getAuthenticatedAuthClient();
//   const sheets = google.sheets({ version: 'v4', auth });

//   try {
//     const response = await sheets.spreadsheets.values.update({
//       spreadsheetId,
//       range,
//       valueInputOption: 'USER_ENTERED',
//       requestBody: {
//         values,
//       },
//     });
//     return response.data;
//   } catch (error: any) {
//     console.error("Error updating sheet:", error.message);
//     throw new Error("Failed to update Google Sheet.");
//   }
// }