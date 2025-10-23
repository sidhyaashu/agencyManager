import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ClientDashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Client Dashboard</h1>
                <Button>Create a Request</Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to your Client Portal!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        This is your simplified dashboard to view campaign performance and communicate with the agency.
                    </p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="flex gap-4">
                        <Button variant="outline" asChild><Link href="#">View Campaign Analytics</Link></Button>
                        <Button variant="outline" asChild><Link href="#">See My Requests (Tasks)</Link></Button>
                   </div>
                </CardContent>
            </Card>
        </div>
    );
}