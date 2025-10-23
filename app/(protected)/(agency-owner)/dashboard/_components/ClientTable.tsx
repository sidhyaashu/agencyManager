"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ---------- Client Data ----------
type Client = {
  id: string;
  name: string;
  avatar: string;
  campaigns: number;
  emailAccounts: number;
  avgPositiveReplies: number;
};

const data: Client[] = [
  {
    id: "1",
    name: "Junaid Asghar",
    avatar: "/avatars/junaid.png",
    campaigns: 6,
    emailAccounts: 16,
    avgPositiveReplies: 72,
  },
  {
    id: "2",
    name: "Shekhar Gupta",
    avatar: "/avatars/shekhar.png",
    campaigns: 7,
    emailAccounts: 22,
    avgPositiveReplies: 52,
  },
  {
    id: "3",
    name: "Nitin Soni",
    avatar: "/avatars/nitin.png",
    campaigns: 5,
    emailAccounts: 12,
    avgPositiveReplies: 45,
  },
  {
    id: "4",
    name: "Harish Malhi",
    avatar: "/avatars/harish.png",
    campaigns: 12,
    emailAccounts: 25,
    avgPositiveReplies: 61,
  },
];

// ---------- Table Columns ----------
export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div
        className="flex items-center gap-1 cursor-pointer select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="h-4 w-4 opacity-50" />
      </div>
    ),
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div className="flex items-center gap-2">
          <img
            // src={client?.avatar}
            src={"https://cdn-icons-png.flaticon.com/512/6858/6858504.png"}
            alt={client.name}
            className="w-8 h-8 rounded-full border"
          />
          <span className="font-medium">{client.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "campaigns",
    header: "Campaigns",
    cell: ({ row }) => <span>{row.original.campaigns}</span>,
  },
  {
    accessorKey: "emailAccounts",
    header: "Email Accounts",
    cell: ({ row }) => <span>{row.original.emailAccounts}</span>,
  },
  {
    accessorKey: "avgPositiveReplies",
    header: ({ column }) => (
      <div
        className="flex items-center gap-1 cursor-pointer select-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Avg Positive Replies
        <ArrowUpDown className="h-4 w-4 opacity-50" />
      </div>
    ),
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-md text-sm font-medium ${
          row.original.avgPositiveReplies >= 60
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {row.original.avgPositiveReplies}%
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>
            Client Tasks <span className="text-xs text-red-500">(14)</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Client Campaigns</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Client Email Accounts</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Automations</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Account Vitals</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Alerts/Notifications</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Edit Client</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600 cursor-pointer">Delete Client</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// ---------- Client Table ----------
const ClientTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filter, setFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter: filter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // ---------- Dropdown Sorting Options ----------
  const sortingOptions = [
    { label: "Top Clients", value: [{ id: "avgPositiveReplies", desc: true }] },
    { label: "Lowest Replies", value: [{ id: "avgPositiveReplies", desc: false }] },
    { label: "Most Campaigns", value: [{ id: "campaigns", desc: true }] },
    { label: "Least Campaigns", value: [{ id: "campaigns", desc: false }] },
    { label: "Most Email Accounts", value: [{ id: "emailAccounts", desc: true }] },
    { label: "Least Email Accounts", value: [{ id: "emailAccounts", desc: false }] },
    { label: "Name A → Z", value: [{ id: "name", desc: false }] },
    { label: "Name Z → A", value: [{ id: "name", desc: true }] },
    { 
      label: "Top Clients + Most Campaigns", 
      value: [
        { id: "avgPositiveReplies", desc: true },
        { id: "campaigns", desc: true },
      ] 
    },
    { 
      label: "Most Campaigns + Most Email Accounts", 
      value: [
        { id: "campaigns", desc: true },
        { id: "emailAccounts", desc: true },
      ] 
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border p-6">
      {/* ---------- Header & Controls ---------- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <h2 className="text-lg font-semibold">Clients</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Input
            placeholder="Search clients"
            className="w-64 rounded-md"
            value={filter ?? ""}
            onChange={(e) => setFilter(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                Sort Options <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>Sort Clients</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortingOptions.map((option) => (
                <DropdownMenuItem
                  key={option.label}
                  onClick={() => setSorting(option.value)}
                  className="cursor-pointer"
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ---------- Table ---------- */}
<div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-gray-50/50 text-gray-600 font-medium">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Enhanced Empty State
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No clients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClientTable;
