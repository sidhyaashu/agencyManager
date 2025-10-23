"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Suggestion = {
  title: string;
  description: string;
  campaign: string;
  color: "orange" | "blue" | "beige";
};

interface AISuggestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const suggestions: Suggestion[] = [
  { title: "Bounce rate is rising", description: "Manage your leads quality", campaign: "Campaign 1", color: "orange" },
  { title: "Avg Reply Rate is too low", description: "Improve your email messages", campaign: "Campaign 2", color: "beige" },
  { title: "Increase positive replies", description: "Integrate automations", campaign: "Campaign 3", color: "blue" },
  { title: "Bounce rate is rising", description: "Manage your leads quality", campaign: "Campaign 1", color: "orange" },
  { title: "Avg Reply Rate is too low", description: "Improve your email messages", campaign: "Campaign 2", color: "beige" },
  { title: "Increase positive replies", description: "Integrate automations", campaign: "Campaign 3", color: "blue" },
];

const colorClasses = {
  orange: "bg-orange-100",
  blue: "bg-indigo-100",
  beige: "bg-amber-50",
};

export default function AISuggestionsDialog({
  open,
  onOpenChange,
}: AISuggestionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 sm:max-w-3xl lg:max-w-5xl rounded-2xl p-8 gap-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold text-gray-900 flex flex-col gap-2">
            AI Suggestions
            <Badge variant="secondary" className="text-xs font-medium">
            Optimize your campaigns
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex"
            >
              <Card
                className={cn(
                  "border-none rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex-1 flex flex-col",
                  colorClasses[suggestion.color]
                )}
              >
                <CardContent className="p-4 flex flex-col justify-between flex-1 gap-5">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 text-base leading-snug">
                      {suggestion.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {suggestion.description}
                    </p>
                    
                  </div>

                  <div className="flex justify-between pt-4">
                    <p className="text-sm font-medium text-gray-800 pt-1">
                      {suggestion.campaign}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-white/50 hover:bg-white border-gray-200 font-medium transition-colors"
                    >
                      Optimize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
