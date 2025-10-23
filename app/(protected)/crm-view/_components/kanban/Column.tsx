"use client";

import CardItem from "./CardItem";

interface ColumnProps {
  title: string;
  variant: "green" | "yellow" | "blue" | "orange";
  buttonText: string;
  items: {
    id: string;
    campaign: string;
    name: string;
    content: string;
    date?: string;
  }[];
}

export default function Column({ title, variant, buttonText, items }: ColumnProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{title}</h2>
      <div className="flex flex-col gap-3">
        {items.length > 0 ? (
          items.map((item) => (
            <CardItem
              key={item.id}
              campaign={item.campaign}
              name={item.name}
              content={item.content}
              date={item.date}
              variant={variant}
              buttonText={buttonText}
            />
          ))
        ) : (
          <div className="text-sm text-gray-400 italic py-4 text-center border rounded-xl bg-gray-50">
            No items available
          </div>
        )}
      </div>
    </div>
  );
}
