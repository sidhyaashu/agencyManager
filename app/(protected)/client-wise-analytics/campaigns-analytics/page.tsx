"use client";

import { useState } from "react";
import { motion } from "motion/react"
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Campaign = {
  id: string;
  name: string;
  uniquePositiveReplies: number;
  positiveChange: number;
  replies: number;
  repliesChange: number;
  bounceRate: number;
  bounceChange: number;
  opened?: number;
  clicked?: number;
};

export default function CampaignAnalyticsPage() {
  const [campaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Campaign 1",
      uniquePositiveReplies: 80,
      positiveChange: 37.8,
      replies: 25,
      repliesChange: -2,
      bounceRate: 12,
      opened: 60,
      bounceChange: 6,
      clicked: 25,
    },
    {
      id: "2",
      name: "Campaign 2",
      uniquePositiveReplies: 50,
      positiveChange: 37.8,
      replies: 25,
      repliesChange: -2,
      bounceRate: 12,
      bounceChange: 6,
      opened: 60,
      clicked: 25,
    },
    {
      id: "3",
      name: "Campaign 3",
      uniquePositiveReplies: 60,
      positiveChange: 37.8,
      replies: 25,
      repliesChange: -2,
      opened: 60,
      bounceRate: 12,
      clicked: 25,
      bounceChange: 6,
    },
  ]);

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSort, setSelectedSort] = useState("positive");
  const [client, setClient] = useState("junaid-asghar");
  const [search, setSearch] = useState("");

  const filteredCampaigns = campaigns.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Campaigns Analytics</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
          </SelectContent>
        </Select>

        <Select value={client} onValueChange={setClient}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="junaid-asghar">Junaid Asghar</SelectItem>
            <SelectItem value="shekhar-gupta">Shekhar Gupta</SelectItem>
            <SelectItem value="ashutosh">Ashutosh</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[240px]"
        />

        <Select value={selectedSort} onValueChange={setSelectedSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="positive">Positive Replies</SelectItem>
            <SelectItem value="replies">Total Replies</SelectItem>
            <SelectItem value="bounced">Bounce Rate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Message */}
      <div className="text-gray-700 font-medium text-lg mt-4">
        Hey, you’re doing great 👏 — just keep an eye on the{" "}
        <span className="text-orange-600 font-semibold">bounce rate</span>.
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white shadow-sm rounded-xl p-6">
        <StatCard title="Unique Positive Replies" value="50%" trend={37.8} trendLabel="this week" trendUp />
        <StatCard title="No of Replies" value="66.67%" trend={2} trendLabel="this week" trendUp={false} />
        <StatCard title="Bounced" value="3%" trend={6} trendLabel="this day" trendUp />
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign, index) => (
        //   <motion.div
        //     key={campaign.id}
        //     initial={{ opacity: 0, y: 20 }}
        //     animate={{ opacity: 1, y: 0 }}
        //     transition={{ delay: index * 0.1 }}
        //     whileHover={{ scale: 1.03 }}
        //   >
            <CampaignCard campaign={campaign} key={campaign.id} />
        //   </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  trend,
  trendLabel,
  trendUp,
}: {
  title: string;
  value: string;
  trend: number;
  trendLabel: string;
  trendUp: boolean;
}) {
  return (
    <div className="flex flex-col items-start justify-between rounded-lg border bg-card p-4 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="text-3xl font-semibold text-gray-900">{value}</div>
      <div
        className={cn(
          "flex items-center gap-1 text-sm font-medium mt-1",
          trendUp ? "text-green-600" : "text-red-600"
        )}
      >
        {trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        {trend}% {trendLabel}
      </div>
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm text-gray-500 font-medium">
          • Campaign Status
        </CardTitle>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded-full hover:bg-gray-100 transition">
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Details</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        {/* Circular Progress */}
        <div className="w-24 h-24">
          <CircularProgressbar
            value={campaign.uniquePositiveReplies}
            text={`${campaign.uniquePositiveReplies}%`}
            styles={buildStyles({
              textColor: "#111827",
              pathColor: "#3b82f6",
              trailColor: "#e5e7eb",
              textSize: "16px",
              strokeLinecap: "round",
            })}
          />
        </div>

        <div className="text-sm text-green-600 flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          {campaign.positiveChange}% this week
        </div>

        <Separator className="my-2" />
        <div className="text-gray-700 font-semibold">{campaign.name}</div>

        <div className="w-full space-y-2 mt-2">
          {campaign.opened ? (
            <>
              <Metric label="Unique Opened" value={`${campaign.opened}%`} />
              <Metric label="Unique Clicked" value={`${campaign.clicked}%`} />
              <Metric label="Bounced" value={`${campaign.bounceRate}%`} color="text-red-600" />
            </>
          ) : (
            <>
              <Metric label="No of Replies" value={`${campaign.replies}`} />
              <Metric label="Bounce Rate" value={`${campaign.bounceRate}%`} color="text-red-600" />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Metric({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-600">{label}</span>
      <span className={cn("font-semibold", color)}>{value}</span>
    </div>
  );
}
