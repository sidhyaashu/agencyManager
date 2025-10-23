"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, UserPlus, UserMinus, Trash2, MailWarning } from "lucide-react";

const taskBundles = [
  {
    title: "Client Onboarding Bundle",
    description: "A full set of tasks to bring a new client online.",
    icon: UserPlus,
    action: "Start Onboarding",
  },
  {
    title: "Client Sunsetting Bundle",
    description: "Offboard a client and archive their assets.",
    icon: UserMinus,
    action: "Start Sunsetting",
  },
  {
    title: "Campaign Deletion Bundle",
    description: "Retire a failed campaign and launch a new one.",
    icon: Trash2,
    action: "Delete Campaign",
  },
  {
    title: "Email Account Deletion Bundle",
    description: "Replace a poorly performing or banned email account.",
    icon: MailWarning,
    action: "Replace Account",
  },
];

export default function CreateTaskBundlePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create Task Bundle</h1>
        <p className="text-muted-foreground mt-1">
          Streamline complex processes by creating pre-defined collections of tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {taskBundles.map((bundle) => {
          const Icon = bundle.icon;
          return (
            <Card key={bundle.title} className="hover:shadow-lg hover:border-primary transition-all">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">{bundle.title}</CardTitle>
                  <CardDescription>{bundle.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full mt-4">
                  {bundle.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}