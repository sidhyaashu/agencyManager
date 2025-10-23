"use client";

import { Card as UICard, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CardItemProps {
  campaign: string;
  name: string;
  content: string;
  date?: string;
  variant: "green" | "yellow" | "blue" | "orange";
  buttonText: string;
}

export default function CardItem({
  campaign,
  name,
  content,
  date,
  variant,
  buttonText,
}: CardItemProps) {
  const bgColors: Record<CardItemProps["variant"], string> = {
    green: "bg-green-50 border-green-300 hover:border-green-400",
    yellow: "bg-yellow-50 border-yellow-300 hover:border-yellow-400",
    blue: "bg-blue-50 border-blue-300 hover:border-blue-400",
    orange: "bg-orange-50 border-orange-300 hover:border-orange-400",
  };

  return (
    <UICard
      className={cn(
        "rounded-2xl border shadow-sm transition-all hover:shadow-md hover:scale-[1.01]",
        bgColors[variant]
      )}
    >
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {campaign}
        </div>
        <div className="font-medium text-gray-800">{name}</div>
        <div className="text-sm text-gray-600 line-clamp-2">{content}</div>
        {date && <div className="text-xs text-gray-500">{date}</div>}
        <Button
          size="sm"
          variant="secondary"
          className="mt-2 w-fit text-sm font-medium shadow-md cursor-pointer"
        >
          {buttonText}
        </Button>
      </CardContent>
    </UICard>
  );
}
