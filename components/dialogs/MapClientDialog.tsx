"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const campaignsList = ["Campaign 1", "Campaign 2", "Campaign 3"];
const emailAccountsList = [
  "james@jstudio.com",
  "alex@jstudio.com",
  "john@jstudio.com",
];

export default function MapClientDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const toggleSelect = (
    item: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (!item) return;
    if (list.includes(item)) setter(list.filter((i) => i !== item));
    else setter([...list, item]);
  };

  const handleSubmit = () => {
    console.log({
      name,
      email,
      campaigns: selectedCampaigns,
      emails: selectedEmails,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        {/* ---------- Header ---------- */}
        <DialogHeader className="text-center sm:text-left mb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
            Map New Client
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Map Client, Campaigns & Email Accounts
          </p>
        </DialogHeader>

        {/* ---------- Form Fields ---------- */}
        <div className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <Label className="mb-2 font-medium text-gray-700">Name</Label>
            <Input
              placeholder="Shekhar Gupta"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 p-3"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <Label className="mb-2 font-medium text-gray-700">Email</Label>
            <Input
              placeholder="We'll create a unique client portal for this email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 p-3"
            />
          </div>

          {/* Campaigns */}
          <div className="flex flex-col">
            <Label className="mb-2 font-medium text-gray-700">Campaigns</Label>

            <div className="flex flex-wrap gap-2 mt-2">
              {selectedCampaigns.map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm shadow hover:bg-green-200 transition"
                >
                  {c}
                  <X
                    className="h-4 w-4 cursor-pointer hover:text-green-900"
                    onClick={() =>
                      setSelectedCampaigns(
                        selectedCampaigns.filter((i) => i !== c)
                      )
                    }
                  />
                </span>
              ))}
            </div>

            <Select
              onValueChange={(val) =>
                toggleSelect(val, selectedCampaigns, setSelectedCampaigns)
              }
              value=""
            >
              <SelectTrigger className="mt-3 rounded-xl border p-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition">
                <SelectValue placeholder="Select campaign" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border shadow-lg">
                {campaignsList.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Email Accounts */}
          <div className="flex flex-col">
            <Label className="mb-2 font-medium text-gray-700">Email Accounts</Label>

            <div className="flex flex-wrap gap-2 mt-2">
              {selectedEmails.map((em) => (
                <span
                  key={em}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow hover:bg-blue-200 transition"
                >
                  {em}
                  <X
                    className="h-4 w-4 cursor-pointer hover:text-blue-900"
                    onClick={() =>
                      setSelectedEmails(selectedEmails.filter((i) => i !== em))
                    }
                  />
                </span>
              ))}
            </div>

            <Select
              onValueChange={(val) =>
                toggleSelect(val, selectedEmails, setSelectedEmails)
              }
              value=""
            >
              <SelectTrigger className="mt-3 rounded-xl border p-3 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition">
                <SelectValue placeholder="Select email" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border shadow-lg">
                {emailAccountsList.map((em) => (
                  <SelectItem key={em} value={em}>
                    {em}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ---------- Footer ---------- */}
        <DialogFooter className="mt-8 flex justify-end gap-4">
          <Button
            variant="outline"
            className="px-5 py-2 rounded-xl hover:bg-gray-100 transition"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md transition"
          >
            Add Client
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
