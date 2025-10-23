import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VaDashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">VA Dashboard</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to your Dashboard!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        This is the main dashboard for the Virtual Assistant. From here, you can access your assigned tasks and view client analytics.
                    </p>
                    <p className="mt-4">
                        Your navigation is restricted to only show what you need to perform your duties.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}