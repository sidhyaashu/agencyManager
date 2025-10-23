"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

type ShareTemplateDialogProps = {
  templateTitle: string;
};

export default function ShareTemplateDialog({ templateTitle }: ShareTemplateDialogProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Simulated share link (you can later generate real dynamic URLs)
  const shareLink = `https://yourapp.com/templates/share/${encodeURIComponent(templateTitle)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          Share
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Share Template
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Label>Template</Label>
          <p className="font-medium text-gray-700 border p-2 rounded-md bg-gray-50">
            {templateTitle}
          </p>

          <Label>Shareable Link</Label>
          <div className="flex items-center gap-2">
            <Input value={shareLink} readOnly className="flex-1" />
            <Button
              variant="secondary"
              onClick={handleCopy}
              className="flex items-center gap-1"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
