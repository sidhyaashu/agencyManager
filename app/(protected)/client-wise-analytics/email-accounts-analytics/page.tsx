"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreVertical, Search, ArrowUpDown, Filter, Download, RefreshCw, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type EmailAccount = {
  name: string;
  emailSent: number;
  openRate: string;
  warmupStatus: "Active" | "Paused";
  accountStatus: "Active" | "Banned";
  healthStatus: "Good" | "Bad";
  client: string;
};

type DomainVital = {
  name: string;
  dkim: number;
  spf: number;
  dmarc: number;
  mx: number;
  blacklisted: boolean;
  healthStatus: "Good" | "Bad";
};

type SortField = "name" | "emailSent" | "openRate" | "client";
type SortOrder = "asc" | "desc";

export default function EmailDashboardPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("email");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const emailAccounts: EmailAccount[] = [
    { name: "email_1@gmail.com", emailSent: 6, openRate: "5%", warmupStatus: "Active", accountStatus: "Active", healthStatus: "Good", client: "Client A" },
    { name: "email_2@gmail.com", emailSent: 7, openRate: "6%", warmupStatus: "Active", accountStatus: "Active", healthStatus: "Good", client: "Client B" },
    { name: "email_3@gmail.com", emailSent: 5, openRate: "1%", warmupStatus: "Paused", accountStatus: "Banned", healthStatus: "Bad", client: "Client A" },
    { name: "email_4@gmail.com", emailSent: 12, openRate: "3%", warmupStatus: "Paused", accountStatus: "Banned", healthStatus: "Bad", client: "Client C" },
    { name: "email_5@gmail.com", emailSent: 15, openRate: "8%", warmupStatus: "Active", accountStatus: "Active", healthStatus: "Good", client: "Client B" },
    { name: "email_6@gmail.com", emailSent: 3, openRate: "2%", warmupStatus: "Paused", accountStatus: "Active", healthStatus: "Good", client: "Client A" },
  ];

  const domainVitals: DomainVital[] = [
    { name: "email_1@gmail.com", dkim: 6, spf: 5, dmarc: 5, mx: 5, blacklisted: false, healthStatus: "Good" },
    { name: "email_2@gmail.com", dkim: 7, spf: 6, dmarc: 6, mx: 6, blacklisted: false, healthStatus: "Good" },
    { name: "email_3@gmail.com", dkim: 5, spf: 1, dmarc: 1, mx: 1, blacklisted: true, healthStatus: "Bad" },
    { name: "email_4@gmail.com", dkim: 12, spf: 3, dmarc: 3, mx: 3, blacklisted: true, healthStatus: "Bad" },
    { name: "email_5@gmail.com", dkim: 8, spf: 7, dmarc: 7, mx: 7, blacklisted: false, healthStatus: "Good" },
    { name: "email_6@gmail.com", dkim: 4, spf: 4, dmarc: 4, mx: 4, blacklisted: false, healthStatus: "Good" },
  ];

  const filteredAndSortedEmails = useMemo(() => {
    let filtered = emailAccounts.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.client.toLowerCase().includes(search.toLowerCase())
    );

    if (filterStatus !== "all") {
      filtered = filtered.filter((e) => e.healthStatus.toLowerCase() === filterStatus);
    }

    return filtered.sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (sortField === "openRate") {
        aVal = parseFloat(a.openRate);
        bVal = parseFloat(b.openRate);
      }

      if (typeof aVal === "string") {
        return sortOrder === "asc" 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [search, sortField, sortOrder, filterStatus, emailAccounts]);

  const filteredDomains = useMemo(() => {
    return domainVitals.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, domainVitals]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const stats = useMemo(() => {
    const totalSent = emailAccounts.reduce((sum, e) => sum + e.emailSent, 0);
    const avgOpenRate = (
      emailAccounts.reduce((sum, e) => sum + parseFloat(e.openRate), 0) / emailAccounts.length
    ).toFixed(2);
    const warmupEnabled = (
      (emailAccounts.filter((e) => e.warmupStatus === "Active").length / emailAccounts.length) * 100
    ).toFixed(0);
    const overallHealth = (
      (emailAccounts.filter((e) => e.healthStatus === "Good").length / emailAccounts.length) * 100
    ).toFixed(0);

    return { totalSent, avgOpenRate, warmupEnabled, overallHealth };
  }, [emailAccounts]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Management Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your email accounts and domain health</p>
        </div>

        <Tabs defaultValue="email" onValueChange={setActiveTab} className="space-y-6">
          {/* Tabs Navigation */}
          <TabsList className="bg-white border">
            <TabsTrigger value="email">Email Accounts</TabsTrigger>
            <TabsTrigger value="domain">Domain Vitals</TabsTrigger>
          </TabsList>

          {/* Overview Cards */}
          {activeTab === "email" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Email Sent" value={stats.totalSent.toString()} />
              <StatCard label="Avg. Open Rate" value={`${stats.avgOpenRate}%`} />
              <StatCard label="Warmup Enabled" value={`${stats.warmupEnabled}%`} />
              <StatCard label="Overall Health" value={`${stats.overallHealth}%`} />
            </div>
          )}

          {/* Controls Bar */}
          <div className="bg-white rounded-lg border p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by email or client..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 flex-wrap">
                {activeTab === "email" && (
                  <>
                    {/* Sort Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ArrowUpDown className="h-4 w-4 mr-2" />
                          Sort
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleSort("name")}>
                          By Name {sortField === "name" && `(${sortOrder === "asc" ? "A-Z" : "Z-A"})`}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort("emailSent")}>
                          By Email Sent {sortField === "emailSent" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort("openRate")}>
                          By Open Rate {sortField === "openRate" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSort("client")}>
                          By Client {sortField === "client" && `(${sortOrder === "asc" ? "A-Z" : "Z-A"})`}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Filter Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                          All Accounts {filterStatus === "all" && "✓"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("good")}>
                          Healthy Only {filterStatus === "good" && "✓"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterStatus("bad")}>
                          Issues Only {filterStatus === "bad" && "✓"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}

                {/* More Actions Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4 mr-2" />
                      More
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh All
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Account
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Email Accounts Table */}
          <TabsContent value="email" className="mt-0">
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Sent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warmup</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAndSortedEmails.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.client}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.emailSent}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.openRate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={item.warmupStatus} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={item.accountStatus} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={item.healthStatus} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <ActionMenu />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredAndSortedEmails.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No accounts found matching your search.
                </div>
              )}
            </div>
          </TabsContent>

          {/* Domain Vitals Table */}
          <TabsContent value="domain" className="mt-0">
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DKIM</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SPF</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DMARC</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MX</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blacklisted</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredDomains.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.dkim}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.spf}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.dmarc}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.mx}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            item.blacklisted ? "bg-red-50 text-red-700 border border-red-200" : "bg-gray-50 text-gray-700 border border-gray-200"
                          )}>
                            {item.blacklisted ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={item.healthStatus} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <DomainActionMenu />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredDomains.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No domains found matching your search.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/* ===== Subcomponents ===== */

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border">
      <CardContent className="p-6">
        <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    Active: "bg-green-50 text-green-700 border-green-200",
    Paused: "bg-gray-50 text-gray-700 border-gray-200",
    Good: "bg-green-50 text-green-700 border-green-200",
    Bad: "bg-red-50 text-red-700 border-red-200",
    Banned: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span className={cn("px-2 py-1 rounded-full text-xs font-medium border inline-block", variants[status] || "bg-gray-50 text-gray-700 border-gray-200")}>
      {status}
    </span>
  );
}

function ActionMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>View Details</DropdownMenuItem>
        <DropdownMenuItem>Edit Account</DropdownMenuItem>
        <DropdownMenuItem>Related Tasks</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Toggle Warmup</DropdownMenuItem>
        <DropdownMenuItem>Account Vitals</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          Delete Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DomainActionMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>View DNS Records</DropdownMenuItem>
        <DropdownMenuItem>Run Diagnostics</DropdownMenuItem>
        <DropdownMenuItem>Check Blacklist</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Update Configuration</DropdownMenuItem>
        <DropdownMenuItem>Export Report</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}