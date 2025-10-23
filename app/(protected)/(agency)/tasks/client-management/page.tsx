"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

interface ClientData {
  id: number;
  name: string;
  avatar: string;
  forwardEmail: number;
  warmupFrequency: number;
  warmupStatus: string;
  dueTasks: number;
  status: "Active" | "Inactive";
  payment: "Paid" | "Pending";
}

const clients: ClientData[] = [
  {
    id: 1,
    name: "Junaid Asghar",
    avatar: "/avatars/avatar-1.png",
    forwardEmail: 5,
    warmupFrequency: 16,
    warmupStatus: "4%",
    dueTasks: 12,
    status: "Active",
    payment: "Paid",
  },
  {
    id: 2,
    name: "Shekhar Gupta",
    avatar: "/avatars/avatar-2.png",
    forwardEmail: 10,
    warmupFrequency: 22,
    warmupStatus: "5%",
    dueTasks: 13,
    status: "Active",
    payment: "Paid",
  },
  {
    id: 3,
    name: "Nitin Soni",
    avatar: "/avatars/avatar-3.png",
    forwardEmail: 15,
    warmupFrequency: 12,
    warmupStatus: "2%",
    dueTasks: 3,
    status: "Inactive",
    payment: "Pending",
  },
  {
    id: 4,
    name: "Harish Malhi",
    avatar: "/avatars/avatar-4.png",
    forwardEmail: 7,
    warmupFrequency: 25,
    warmupStatus: "3.4%",
    dueTasks: 5,
    status: "Inactive",
    payment: "Pending",
  },
];

export default function ClientSettingsPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [sortBy, setSortBy] = React.useState("Top Clients");

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Client Settings</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by: Top Clients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Top Clients">Sort by: Top Clients</SelectItem>
              <SelectItem value="Due Tasks">Sort by: Due Tasks</SelectItem>
              <SelectItem value="Warmup Frequency">Sort by: Warmup Frequency</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by: Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border shadow-sm bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[220px]">Name</TableHead>
              <TableHead>Forward Email</TableHead>
              <TableHead>Warmup Frequency</TableHead>
              <TableHead>Warmup Status</TableHead>
              <TableHead>Due Tasks</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="flex items-center gap-3 font-medium">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border">
                    <Image
                    //   src={client.avatar}
                      src={"https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png"}
                      alt={client.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {client.name}
                </TableCell>
                <TableCell>{client.forwardEmail}</TableCell>
                <TableCell>{client.warmupFrequency}</TableCell>
                <TableCell>{client.warmupStatus}</TableCell>
                <TableCell>{client.dueTasks}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      client.status === "Active"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                    }
                  >
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      client.payment === "Paid"
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                    }
                  >
                    {client.payment}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuItem>Change Client Status</DropdownMenuItem>
                      <DropdownMenuItem>Send Invoice Reminder</DropdownMenuItem>
                      <DropdownMenuItem>Client Automations</DropdownMenuItem>
                      <DropdownMenuItem>Go to Client Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Client Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete Client</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {filteredClients.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-6">
                  No clients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
