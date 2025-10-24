"use client";

import { useState } from "react";
import { 
  listSheets,
  createSheet,
  readSheetData,
  updateSheetData
} from "@/app/actions/googleSheetActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";

export default function TestSheetsPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // State for listing sheets
  const [sheets, setSheets] = useState<any[]>([]);

  // State for creating a sheet
  const [newSheetTitle, setNewSheetTitle] = useState("My New Sheet from App");

  // State for reading/updating a specific sheet
  const [selectedSheetId, setSelectedSheetId] = useState("");
  const [range, setRange] = useState("Sheet1!A1:B2");
  const [sheetData, setSheetData] = useState<any[] | null>(null);

  const handleAction = async (action: () => Promise<any>, loadingState: string, onSuccess: (data: any) => void) => {
    setLoading(loadingState);
    setError(null);
    try {
      const result = await action();
      onSuccess(result);
      toast.success(`${loadingState} completed successfully!`);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
        <Button variant="outline" asChild className="mb-8">
            <Link href="/">Back to Home</Link>
        </Button>
        <div className="space-y-8">
            {/* 1. LIST SHEETS */}
            <Card>
                <CardHeader>
                    <CardTitle>1. List Your Google Sheets</CardTitle>
                    <CardDescription>Fetch a list of all spreadsheets in your Google Drive.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => handleAction(listSheets, 'Listing Sheets', setSheets)} disabled={!!loading}>
                        {loading === 'Listing Sheets' ? "Loading..." : "Fetch My Sheets"}
                    </Button>
                    {sheets.length > 0 && (
                        <div className="mt-4 max-h-60 overflow-y-auto rounded-lg border p-4 space-y-2">
                            {sheets.map(sheet => (
                                <div key={sheet.id} className="text-sm p-2 bg-gray-50 rounded-md">
                                    <p className="font-medium">{sheet.name}</p>
                                    <p className="text-xs text-gray-500">ID: {sheet.id}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* 2. CREATE SHEET */}
            <Card>
                <CardHeader>
                    <CardTitle>2. Create a New Google Sheet</CardTitle>
                </CardHeader>
                <CardContent className="flex items-end gap-4">
                    <div className="flex-grow space-y-2">
                        <label htmlFor="newSheetTitle">New Sheet Title</label>
                        <Input id="newSheetTitle" value={newSheetTitle} onChange={e => setNewSheetTitle(e.target.value)} />
                    </div>
                    <Button onClick={() => handleAction(() => createSheet(newSheetTitle), 'Creating Sheet', (data) => console.log('Created:', data))} disabled={!!loading}>
                        {loading === 'Creating Sheet' ? "Creating..." : "Create Sheet"}
                    </Button>
                </CardContent>
            </Card>

            {/* 3. READ & UPDATE SHEET */}
            <Card>
                <CardHeader>
                    <CardTitle>3. Read & Update a Specific Sheet</CardTitle>
                    <CardDescription>Enter a Sheet ID (from the list above) to perform actions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input placeholder="Paste Sheet ID here..." value={selectedSheetId} onChange={e => setSelectedSheetId(e.target.value)} />
                    <Input placeholder="Range (e.g., Sheet1!A1:B2)" value={range} onChange={e => setRange(e.target.value)} />
                    <div className="flex gap-4">
                        <Button onClick={() => handleAction(() => readSheetData(selectedSheetId, range), 'Reading Data', setSheetData)} disabled={!!loading || !selectedSheetId}>
                            {loading === 'Reading Data' ? "Reading..." : "Read Data"}
                        </Button>
                        <Button onClick={() => handleAction(() => updateSheetData(selectedSheetId, range, [["Hello", "World"], ["From", "App"]]), 'Updating Data', () => {})} disabled={!!loading || !selectedSheetId}>
                            {loading === 'Updating Data' ? "Updating..." : "Update with 'Hello World'"}
                        </Button>
                    </div>
                    {sheetData && (
                        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                            {JSON.stringify(sheetData, null, 2)}
                        </pre>
                    )}
                </CardContent>
            </Card>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mt-4">
                    <strong className="font-bold">Last Error: </strong>
                    <span>{error}</span>
                </div>
            )}
        </div>
    </div>
  );
}