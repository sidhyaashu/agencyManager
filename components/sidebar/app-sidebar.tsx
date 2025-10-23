"use client";

import * as React from "react";
import Link from "next/link"; // Import Link
import {
  Settings2,
  Diameter,
  Axe,
  SquareDashedKanban,
  Workflow,
  UserCog,
  SquareKanban,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { Button } from "../ui/button";

// UPDATED: All URLs now point to the correct file-based routes
const agencyNavData = {
  navMain: [
    {
      title: "Client Map",
      url: "/client-map",
      icon: UserCog,
      items: [
        { title: "Overview", url: "/client-map" },
      ],
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: Axe,
      items: [
        { title: "1-Click Execute", url: "/tasks/create-task" },
        { title: "Agency Open Tasks", url: "/tasks/agency-open-task" },
        { title: "VA Open Tasks", url: "/tasks/va-open-task" },
        { title: "Client Settings", url: "/tasks/client-management" },
      ],
    },
    {
      title: "Client Wise Analytics",
      url: "/client-wise-analytics",
      icon: SquareDashedKanban,
      items: [
        { title: "Campaigns", url: "/client-wise-analytics/campaigns-analytics" },
        { title: "Email Accounts", url: "/client-wise-analytics/email-accounts-analytics" },
        { title: "Leads", url: "/client-wise-analytics/leads-analytics" },
      ],
    },
    {
      title: "Client Wise Automation",
      url: "/client-wise-automation",
      icon: Workflow,
      items: [
        { title: "Integrations", url: "/client-wise-automation/integrations" },
      ],
    },
    {
      title: "Managers",
      url: "/managers",
      icon: Settings2,
      items: [
        { title: "Onboarding Manager", url: "/managers/onboarding-manager" },
        { title: "Reply Manager", url: "/managers/reply-manager" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-gray-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="cursor-pointer">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Diameter className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Leadshike</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="pt-2">
        <NavMain items={agencyNavData.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <div className="flex flex-col items-center gap-3 w-full px-3 pb-4 border-t border-gray-100 pt-3">
          {/* UPDATED: CRM View button now navigates */}
          <Button asChild className="w-full rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all">
            <Link href="/crm-view">CRM View</Link>
          </Button>

          <div className="w-full rounded-2xl bg-gradient-to-r from-pink-300 via-purple-400 to-blue-400 p-[1px] mt-1">
            <div className="rounded-2xl bg-white p-3 text-center">
              <p className="text-xs text-gray-700 mb-2 font-medium leading-snug">
                Upgrade to <span className="font-bold">PRO</span> to get access
                to all features!
              </p>
              <Button className="w-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition-all text-sm">
                Get Pro Now!
              </Button>
            </div>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}