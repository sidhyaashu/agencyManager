"use client";

import { motion } from "motion/react";
import Column from "./Column";

const dummyData = {
  reply: [
    { id: "1", campaign: "Campaign 1", name: "Sheikh Rohan", content: "Lead Response" },
    { id: "2", campaign: "Campaign 3", name: "Shekhar Gupta", content: "Email body here" },
  ],
  followup: [
    { id: "3", campaign: "Campaign 1", name: "Harish", content: "Our Response" },
  ],
  ooo: [
    { id: "4", campaign: "Campaign 2", name: "Rohit", content: "Out of office message" },
  ],
  meeting: [
    { id: "5", campaign: "Campaign 1", name: "Sheikh Rohan", content: "Meeting link here", date: "12 July, 2024" },
    { id: "6", campaign: "Campaign 2", name: "Sheikh Rohan", content: "Meeting link here", date: "12 July, 2024" },
  ],
};

export default function Board() {
  const columns = [
    {
      key: "reply",
      title: "Replies",
      variant: "green" as const,
      buttonText: "Reply Now",
      description: "Leads that replied recently",
    },
    {
      key: "followup",
      title: "Follow-ups",
      variant: "yellow" as const,
      buttonText: "Waiting for Reply",
      description: "Need follow-up action",
    },
    {
      key: "ooo",
      title: "Out of Office",
      variant: "orange" as const,
      buttonText: "Reply Later",
      description: "Temporarily unavailable leads",
    },
    {
      key: "meeting",
      title: "Meetings",
      variant: "blue" as const,
      buttonText: "View Meeting",
      description: "Confirmed meetings with leads",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {columns.map((col, i) => (
        <motion.div
          key={col.key}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="flex flex-col"
        >
          <div
            className={`rounded-2xl shadow-sm border-t-4 bg-white ${
              col.variant === "green"
                ? "border-green-500"
                : col.variant === "yellow"
                ? "border-yellow-500"
                : col.variant === "blue"
                ? "border-blue-500"
                : "border-orange-500"
            }`}
          >
            <div className="p-4 border-b bg-gray-50 rounded-t-2xl">
              <h2 className="text-lg font-semibold text-gray-800">{col.title}</h2>
              <p className="text-xs text-gray-500">{col.description}</p>
            </div>

            <div className="p-4">
              <Column
                title={col.title}
                variant={col.variant}
                buttonText={col.buttonText}
                items={dummyData[col.key as keyof typeof dummyData]}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
