import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ClientTasksPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>My Requests</CardTitle>
            </CardHeader>
            <CardContent>
                <p>This page will display a list of all tasks or requests submitted by the client.</p>
            </CardContent>
        </Card>
    );
}