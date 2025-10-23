import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function NewClientTaskPage() {
    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Create a New Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="request-title">Request Title</Label>
                    <Input id="request-title" placeholder="e.g., Please upload new lead list" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="request-details">Details</Label>
                    <Textarea id="request-details" placeholder="Provide as much detail as possible..." rows={5}/>
                </div>
                <Button>Submit Request</Button>
            </CardContent>
        </Card>
    );
}