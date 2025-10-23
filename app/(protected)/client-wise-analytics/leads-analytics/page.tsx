"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Search, ArrowUpDown, Filter, TrendingUp, AlertCircle, Play, Pause, StopCircle, CheckCircle, Download, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

type CampaignStatus = "Completed" | "Running" | "Paused" | "Stopped";

type Campaign = {
  id: number;
  name: string;
  status: CampaignStatus;
  contactedRate: number;
  leadsBounced: number;
  leadsUnsubscribed: number;
  leadsReached: number;
  totalLeads: number;
  client: string;
};

type Suggestion = {
  title: string;
  message: string;
  client: string;
  email: string;
  severity: "warning" | "info";
};

type SortField = "name" | "contactedRate" | "leadsBounced" | "totalLeads";
type SortOrder = "asc" | "desc";

export default function CampaignDashboardPage() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filterStatus, setFilterStatus] = useState<CampaignStatus | "all">("all");

  const campaigns: Campaign[] = [
    { id: 1, name: "Campaign 1", status: "Completed", contactedRate: 100, leadsBounced: 12, leadsUnsubscribed: 0, leadsReached: 3, totalLeads: 150, client: "Client A" },
    { id: 2, name: "Campaign 2", status: "Running", contactedRate: 75, leadsBounced: 14, leadsUnsubscribed: 0, leadsReached: 3, totalLeads: 200, client: "Client B" },
    { id: 3, name: "Campaign 3", status: "Paused", contactedRate: 75, leadsBounced: 12, leadsUnsubscribed: 0, leadsReached: 3, totalLeads: 180, client: "Client A" },
    { id: 4, name: "Campaign 4", status: "Stopped", contactedRate: 50, leadsBounced: 10, leadsUnsubscribed: 3, leadsReached: 1, totalLeads: 120, client: "Client C" },
    { id: 5, name: "Campaign 5", status: "Running", contactedRate: 85, leadsBounced: 8, leadsUnsubscribed: 1, leadsReached: 5, totalLeads: 220, client: "Client B" },
    { id: 6, name: "Campaign 6", status: "Completed", contactedRate: 95, leadsBounced: 15, leadsUnsubscribed: 2, leadsReached: 4, totalLeads: 190, client: "Client A" },
  ];

  const suggestions: Suggestion[] = [
    {
      title: "Bounce rate is rising",
      message: "Manage your leads quality",
      client: "Client 1",
      email: "Campaign 1",
      severity: "warning",
    },
    {
      title: "Avg Reply Rate is too low",
      message: "Improve your email messages",
      client: "Client",
      email: "email@domain.com",
      severity: "info",
    },
  ];

  const filteredAndSortedCampaigns = useMemo(() => {
    let filtered = campaigns.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.client.toLowerCase().includes(search.toLowerCase())
    );

    if (filterStatus !== "all") {
      filtered = filtered.filter((c) => c.status === filterStatus);
    }

    return filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc" 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }, [search, sortField, sortOrder, filterStatus]);

  const overallStats = useMemo(() => {
    const totalCampaigns = campaigns.length;
    const avgContactedRate = (campaigns.reduce((sum, c) => sum + c.contactedRate, 0) / totalCampaigns).toFixed(1);
    const totalBounced = campaigns.reduce((sum, c) => sum + c.leadsBounced, 0);
    const totalUnsubscribed = campaigns.reduce((sum, c) => sum + c.leadsUnsubscribed, 0);
    const totalReached = campaigns.reduce((sum, c) => sum + c.leadsReached, 0);
    const activeCampaigns = campaigns.filter((c) => c.status === "Running").length;

    return { totalCampaigns, avgContactedRate, totalBounced, totalUnsubscribed, totalReached, activeCampaigns };
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leads Analytics</h1>
          <p className="text-gray-600">Monitor campaign performance and optimize your outreach</p>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CampaignSummary stats={overallStats} />
          <AISuggestions suggestions={suggestions} />
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search campaigns or clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap">
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
                  <DropdownMenuItem onClick={() => handleSort("contactedRate")}>
                    By Contact Rate {sortField === "contactedRate" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("leadsBounced")}>
                    By Bounce Rate {sortField === "leadsBounced" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("totalLeads")}>
                    By Volume {sortField === "totalLeads" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
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
                    All Campaigns {filterStatus === "all" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterStatus("Running")}>
                    Running Only {filterStatus === "Running" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Completed")}>
                    Completed Only {filterStatus === "Completed" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Paused")}>
                    Paused Only {filterStatus === "Paused" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Stopped")}>
                    Stopped Only {filterStatus === "Stopped" && "✓"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

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
                    Export Report
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Bulk Actions
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Create Campaign
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Leads Analytics
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({filteredAndSortedCampaigns.length} {filteredAndSortedCampaigns.length === 1 ? 'campaign' : 'campaigns'})
            </span>
          </h2>
        </div>

        {/* Campaign Cards Grid */}
        {filteredAndSortedCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCampaigns.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 text-center">No campaigns found matching your search.</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setSearch("")}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

/* ======= Components ======= */

function CampaignSummary({ stats }: { stats: any }) {
  return (
    <Card className="border">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-medium text-gray-600">Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <ProgressCircle percentage={parseFloat(stats.avgContactedRate)} color="stroke-green-700" />
            <div className="absolute text-center">
              <div className="text-xl font-bold text-gray-900">{stats.avgContactedRate}%</div>
              <p className="text-xs text-gray-500">Avg Contact</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Campaigns</span>
            <span className="font-semibold text-gray-900">{stats.totalCampaigns}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Active Campaigns</span>
            <span className="font-semibold text-gray-900">{stats.activeCampaigns}</span>
          </div>
          <div className="border-t pt-3 space-y-2">
            <StatusRow color="bg-red-100 border border-red-200" label="Leads Bounced" value={stats.totalBounced} />
            <StatusRow color="bg-gray-100 border border-gray-200" label="Unsubscribed" value={stats.totalUnsubscribed} />
            <StatusRow color="bg-blue-100 border border-blue-200" label="Leads Reached" value={stats.totalReached} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AISuggestions({ suggestions }: { suggestions: Suggestion[] }) {
  return (
    <div className="lg:col-span-2 flex flex-col gap-5 bg-gray-50 p-5 rounded-xl ">
      <div className="flex flex-col mb-1">
        <h3 className="text-sm font-medium text-gray-900">AI Suggestions</h3>
        <span className="text-xs text-gray-500">Optimize your campaigns</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((s, i) => (
          <Card key={i} className="border bg-orange-50">
            <CardContent className="p-5 space-y-3">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs font-medium border-purple-200">
                Optimize your campaigns
              </Badge>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{s.title}</h4>
                <p className="text-sm text-gray-600">{s.message}</p>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-700">{s.client}</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{s.email}</span>
                  <Button size="sm" variant="outline" className="h-8 text-xs bg-white hover:bg-gray-50">
                    Optimize
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const { name, status, contactedRate, leadsBounced, leadsUnsubscribed, leadsReached, totalLeads, client } = campaign;

  const statusConfig = {
    Completed: { 
      color: "text-green-700", 
      bgColor: "bg-green-50 border-green-200",
      icon: CheckCircle,
      strokeColor: "stroke-green-600"
    },
    Running: { 
      color: "text-blue-700", 
      bgColor: "bg-blue-50 border-blue-200",
      icon: Play,
      strokeColor: "stroke-blue-600"
    },
    Paused: { 
      color: "text-gray-700", 
      bgColor: "bg-gray-50 border-gray-200",
      icon: Pause,
      strokeColor: "stroke-gray-600"
    },
    Stopped: { 
      color: "text-red-700", 
      bgColor: "bg-red-50 border-red-200",
      icon: StopCircle,
      strokeColor: "stroke-red-600"
    },
  }[status];

  const StatusIcon = statusConfig.icon;

  return (
    <Card className="border hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge className={cn("text-xs font-medium border", statusConfig.bgColor, statusConfig.color)}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {status}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>View Analytics</DropdownMenuItem>
              <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Lead Settings</DropdownMenuItem>
              <DropdownMenuItem>Automations</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuSeparator />
              {status === "Running" && <DropdownMenuItem>Pause Campaign</DropdownMenuItem>}
              {status === "Paused" && <DropdownMenuItem>Resume Campaign</DropdownMenuItem>}
              <DropdownMenuItem className="text-red-600">Delete Campaign</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Circle */}
        <div className="flex flex-col items-center">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <ProgressCircle percentage={contactedRate} color={statusConfig.strokeColor} />
            <div className="absolute text-center">
              <div className="text-xl font-bold text-gray-900">{contactedRate}%</div>
              <div className="text-[10px] text-gray-500">Contacted</div>
            </div>
          </div>
        </div>

        {/* Campaign Info */}
        <div className="text-center space-y-1">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-xs text-gray-500">{client}</p>
          <p className="text-xs text-gray-400">{totalLeads} total leads</p>
        </div>

        {/* Stats */}
        <div className="space-y-2 pt-2 border-t">
          <StatusRow color="bg-red-100 border border-red-200" label="Bounced" value={leadsBounced} />
          <StatusRow color="bg-gray-100 border border-gray-200" label="Unsubscribed" value={leadsUnsubscribed} />
          <StatusRow color="bg-blue-100 border border-blue-200" label="Reached" value={leadsReached} />
        </div>
      </CardContent>
    </Card>
  );
}

/* ===== Helper Components ===== */

function ProgressCircle({ percentage, color }: { percentage: number; color: string }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="w-full h-full transform -rotate-90">
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        stroke="currentColor"
        strokeWidth="8"
        fill="none"
        className="text-gray-200"
      />
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className={cn(color, "transition-all duration-700 ease-out")}
      />
    </svg>
  );
}

function StatusRow({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <div className="flex items-center gap-2">
        <div className={cn("w-3 h-3 rounded-full", color)}></div>
        <span className="text-gray-600">{label}</span>
      </div>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}