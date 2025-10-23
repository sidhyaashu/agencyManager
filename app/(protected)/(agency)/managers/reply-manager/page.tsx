"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Edit, Trash, Eye } from "lucide-react";
import { motion } from "motion/react";
import { ReplyTemplateDialog } from "@/components/dialogs/ReplyTemplateDialog";

const dummyData = [
  {
    category: "Introduction/First Contact",
    color: "bg-green-100",
    templates: [
      { id: 1, subject: "Exciting Opportunities with [Your Company Name]", body: "Body Preview here...." },
      { id: 2, subject: "Exciting Opportunities with [Your Company Name]", body: "Body Preview here...." },
      { id: 3, subject: "Exciting Opportunities with [Your Company Name]", body: "Body Preview here...." },
    ],
  },
  {
    category: "Follow-Up",
    color: "bg-yellow-100",
    templates: [
      { id: 4, subject: "Exciting Opportunities with [Your Company Name]", body: "Body Preview here...." },
      { id: 5, subject: "Exciting Opportunities with [Your Company Name]", body: "Body Preview here...." },
      { id: 6, subject: "Exciting Opportunities with [Your Company Name]", body: "Body Preview here...." },
    ],
  },
  {
    category: "Meeting/Call Request",
    color: "bg-red-100",
    templates: [
      { id: 7, subject: "Exciting Opportunities with [Your Company Name]", body: "Body Preview here...." },
      { id: 8, subject: "Exciting Opportunities with [Your Company Name]", body: "Body Preview here...." },
      { id: 9, subject: "Exciting Opportunities with [Your Company Name]", body: "Body Preview here...." },
    ],
  },
];

export default function TemplateDashboard() {
  const [category, setCategory] = useState("Template");
  const [client, setClient] = useState("All Clients");

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 flex-wrap">
          <Select onValueChange={setCategory} defaultValue={category}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Template">Template</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
              <SelectItem value="SMS">SMS</SelectItem>
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

        {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md">New Template</Button> */}
        <ReplyTemplateDialog
        trigger={<Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md cursor-pointer">New Template</Button>}
        onCreate={(data) => console.log('New template created:', data)}
      />
      </div>

      {/* Template Categories */}
      <div className="space-y-8">
        {dummyData.map((section) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-1">{section.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.templates.map((template) => (
                <Card key={template.id} className={`${section.color} border-none shadow-sm rounded-2xl`}>
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold text-gray-800">
                      Subject: {template.subject}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{template.body}</p>
                    <div className="flex justify-between items-center">
                      <Button variant="secondary" size="sm" className="flex items-center gap-1">
                        <Eye className="w-4 h-4" /> View Template
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="icon" className="h-8 w-8">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
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