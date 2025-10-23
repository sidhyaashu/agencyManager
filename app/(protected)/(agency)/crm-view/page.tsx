"use client";

import Board from "./_components/kanban/Board";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  return (
    <main className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Interested Leads
        </h1>

        {/* Shadcn Select */}
        <Select defaultValue="All Clients">
          <SelectTrigger className="w-[180px] border-gray-300 focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Select Client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Clients">All Clients</SelectItem>
            <SelectItem value="Client A">Client A</SelectItem>
            <SelectItem value="Client B">Client B</SelectItem>
            <SelectItem value="Client C">Client C</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Board />
    </main>
  );
}
