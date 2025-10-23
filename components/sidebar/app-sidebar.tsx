"use client";

import * as React from "react";
import {
  Bot,
  BookOpen,
  Settings2,
  SquareTerminal,
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
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { Button } from "../ui/button";

// Sample Data
const data = {
  navMain: [
    {
      title: "Agency Analytics",
      url: "#",
      icon: SquareKanban,
      isActive: false,
      items: [
        { title: "History", url: "#" },
        { title: "Starred", url: "#" },
        { title: "Settings", url: "#" },
      ],
    },
    {
      title: "Client Map",
      url: "#",
      icon: UserCog,
      items: [
        { title: "Genesis", url: "#" },
        { title: "Explorer", url: "#" },
        { title: "Quantum", url: "#" },
      ],
    },
    {
      title: "Tasks",
      url: "#",
      icon: Axe,
      items: [
        { title: "Create Tasks", url: "#" },
        { title: "Open Tasks", url: "#" },
        { title: "Client Setting Map", url: "#" },
      ],
    },
    {
      title: "Client Wise Analytics",
      url: "#",
      icon: SquareDashedKanban,
      items: [
        { title: "Campaings Analytics", url: "#" },
        { title: "Email Accounts Analytics", url: "#" },
        { title: "Leads Analytics", url: "#" },
      ],
    },
    {
      title: "Client Wise Automation",
      url: "#",
      icon: Workflow,
      items: [
        { title: "Integrations ", url: "#" },
        { title: "Manage Client Automation", url: "#" },
        { title: "Account Vitals", url: "#" },
      ],
    },
    {
      title: "Managers",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Onboarding Manager", url: "#" },
        { title: "Reply Manager", url: "#" },
        { title: "Client Information Manager", url: "#" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Sidebar Header */}
      <SidebarHeader className="border-b border-gray-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
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

      {/* Main Navigation */}
      <SidebarContent className="pt-2">
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <div className="flex flex-col items-center gap-3 w-full px-3 pb-4 border-t border-gray-100 pt-3">
          <Button
            variant="outline"
            className="w-full rounded-full border-2 border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition-all"
          >
            Manage VA/Clients Access
          </Button>

          <Button className="w-full rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all">
            CRM View
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
