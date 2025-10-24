"use client";

import { useState } from "react";
import { readSheetData } from "@/app/actions/googleSheetActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TestSheetsPage() {
  const [sheetId, setSheetId] = useState("");
  const [range, setRange] = useState("Sheet1!A1:E5"); // Default range
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await readSheetData(sheetId, range);
      setData(result || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
        <Button variant="outline" asChild className="mb-8">
            <Link href="/">Back to Home</Link>
        </Button>
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Google Sheets API Test Page</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="sheetId">Google Sheet ID</label>
                    <Input
                        id="sheetId"
                        placeholder="Enter Google Sheet ID"
                        value={sheetId}
                        onChange={(e) => setSheetId(e.target.value)}
                    />
                     <p className="text-xs text-gray-500">
                        You can find this in your Google Sheet URL: /spreadsheets/d/<b>[SHEET_ID]</b>/edit
                    </p>
                </div>

                <div className="space-y-2">
                    <label htmlFor="range">Range (A1 Notation)</label>
                    <Input
                        id="range"
                        placeholder="e.g., Sheet1!A1:E5"
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                    />
                </div>
            
                <Button onClick={handleFetchData} disabled={loading || !sheetId}>
                    {loading ? "Loading..." : "Fetch Data from Sheet"}
                </Button>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                        <strong className="font-bold">Error: </strong>
                        <span>{error}</span>
                    </div>
                )}

                {data && (
                    <div>
                        <h3 className="font-semibold mb-2">Data Fetched:</h3>
                        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}