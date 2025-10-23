"use client";

import * as React from "react";
import {
  Settings2,
  Axe,
  SquareDashedKanban,
  Diameter,
  SquareKanban,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";

// UPDATED: URLs are now correct for a VA
const vaNavData = {
  navMain: [
     {
      title: "Dashboard",
      url: "/va-dashboard",
      icon: SquareKanban,
      items: [
        { title: "VA Home", url: "/va-dashboard" },
      ],
    },
    {
      title: "Tasks",
      url: "/tasks/va-open-task",
      icon: Axe,
      items: [
        { title: "My Open Tasks", url: "/tasks/va-open-task" },
      ],
    },
    {
      title: "Client Analytics",
      url: "/client-wise-analytics/campaigns-analytics",
      icon: SquareDashedKanban,
      items: [
        { title: "Campaigns", url: "/client-wise-analytics/campaigns-analytics" },
        { title: "Email Accounts", url: "/client-wise-analytics/email-accounts-analytics" },
      ],
    },
    {
      title: "Managers",
      url: "/managers/reply-manager",
      icon: Settings2,
      items: [
        { title: "Reply Manager", url: "/managers/reply-manager" },
      ],
    },
  ],
};

export function VaSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="cursor-pointer">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-lg">
                <Diameter className="size-4" />
              </div>
              <div className="grid flex-1 text-left">
                <span className="truncate font-medium">VA Portal</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="pt-2">
        <NavMain items={vaNavData.navMain} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}