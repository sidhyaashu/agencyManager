"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

type FieldType = "text" | "file" | "image";

interface Field {
  id: number;
  name: string;
  placeholder: string;
  required: boolean;
  type: FieldType;
}

export default function OnboardingFormDialog() {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState("Client 1");
  const [formTitle, setFormTitle] = useState("");
  const [fields, setFields] = useState<Field[]>([
    {
      id: 1,
      name: "Field 1 Name",
      placeholder: "Enter text here",
      required: true,
      type: "text",
    },
  ]);

  // Add new field based on type
  const addField = (type: FieldType) => {
    const defaultPlaceholder =
      type === "file"
        ? "Upload a file"
        : type === "image"
        ? "Upload an image"
        : "Enter text here";

    const newField: Field = {
      id: fields.length + 1,
      name: `Field ${fields.length + 1}`,
      placeholder: defaultPlaceholder,
      required: false,
      type,
    };

    setFields((prev) => [...prev, newField]);
  };

  // Update field property
  const updateField = (id: number, key: keyof Field, value: any) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, [key]: value } : field))
    );
  };

  // Remove field
  const removeField = (id: number) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md">
          New Onboarding
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl w-full rounded-2xl p-6 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Create Onboarding Form
          </DialogTitle>
        </DialogHeader>

        {/* Client Selector */}
        <div className="space-y-2">
          <Label>Choose Client</Label>
          <Select onValueChange={setClient} defaultValue={client}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Client 1">Client 1</SelectItem>
              <SelectItem value="Client 2">Client 2</SelectItem>
              <SelectItem value="Client 3">Client 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Form Title */}
        <div className="space-y-2 mt-4">
          <Label>Form Title</Label>
          <Input
            placeholder="Enter form title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
        </div>

        {/* Dynamic Fields */}
        <div className="space-y-4 mt-4">
          {fields.map((field) => (
            <div
              key={field.id}
              className="border rounded-xl p-4 bg-gray-50 relative shadow-sm"
            >
              <button
                type="button"
                onClick={() => removeField(field.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              >
                <X size={16} />
              </button>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">
                  {field.name}
                </Label>

                {/* Required Checkbox */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Required</span>
                  <Checkbox
                    checked={field.required}
                    onCheckedChange={(val) =>
                      updateField(field.id, "required", val)
                    }
                  />
                </div>

                {/* Field Type Input */}
                {field.type === "text" && (
                  <Input
                    placeholder={field.placeholder}
                    value={field.placeholder}
                    onChange={(e) =>
                      updateField(field.id, "placeholder", e.target.value)
                    }
                  />
                )}

                {field.type === "file" && (
                  <Input type="file" className="cursor-pointer" />
                )}

                {field.type === "image" && (
                  <Input
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                  />
                )}

                <p className="text-xs text-gray-500 mt-1">
                  Type: {field.type === "text"
                    ? "Text Field"
                    : field.type === "file"
                    ? "File Uploader"
                    : "Image Uploader"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Field Dropdown */}
        <div className="flex justify-center mt-6">
          <Select onValueChange={(val) => addField(val as FieldType)}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Add a new field" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text Field</SelectItem>
              <SelectItem value="file">File Uploader</SelectItem>
              <SelectItem value="image">Image Uploader</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="flex justify-between pt-6">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
