"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Share2 } from "lucide-react";
import { motion } from "motion/react";
import OnboardingFormDialog from "@/components/dialogs/OnboardingFormDialog";
import ShareTemplateDialog from "@/components/dialogs/ShareTemplateDialog";

const dummyData = [
  {
    section: "Template Gallery",
    color: "border-green-200 bg-green-50",
    templates: [
      { id: 1, title: "About Agency Template" },
      { id: 2, title: "Business KYC Template" },
      { id: 3, title: "Campaign Preferences" },
    ],
  },
  {
    section: "My Templates",
    color: "border-yellow-200 bg-yellow-50",
    templates: [
      { id: 4, title: "About Agency Template" },
      { id: 5, title: "Business KYC Template" },
      { id: 6, title: "Campaign Preferences" },
    ],
  },
];

export default function OnboardingTemplates() {
  const [status, setStatus] = useState("Completed");
  const [client, setClient] = useState("All Clients");

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 flex-wrap">
          <Select onValueChange={setStatus} defaultValue={status}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setClient} defaultValue={client}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Clients">All Clients</SelectItem>
              <SelectItem value="Client A">Client A</SelectItem>
              <SelectItem value="Client B">Client B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Replaces the old button */}
        <OnboardingFormDialog />
      </div>

      {/* Template Sections */}
      <div className="space-y-8">
        {dummyData.map((section) => (
          <motion.div
            key={section.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`space-y-4 p-4 border rounded-2xl ${section.color}`}
          >
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-1">
              {section.section}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.templates.map((template) => (
                <Card
                  key={template.id}
                  className="bg-green-100 border-none shadow-sm rounded-2xl"
                >
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold text-gray-800">
                      Title: {template.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </Button>
                      {section.section === "My Templates" && (
                        <ShareTemplateDialog templateTitle={template.title} />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
