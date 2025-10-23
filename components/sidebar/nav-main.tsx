"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, type LucideIcon, LayoutDashboard, Users, ClipboardList, BarChart3, Settings, Bot } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const navItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, subItems: [] },
    { title: "Clients", url: "/clients", icon: Users, subItems: [
        { title: "All Clients", url: "/clients" },
        { title: "Add New Client", url: "/clients/new" },
      ]
    },
    { title: "Tasks", url: "/tasks", icon: ClipboardList, subItems: [
        { title: "Agency To-Do", url: "/tasks" },
        { title: "Create Bundle", url: "/tasks/create" },
      ]
    },
    { title: "Managers", url: "/managers", icon: Bot, subItems: [
        { title: "Onboarding", url: "/managers/onboarding-manager" },
        { title: "Replies", url: "/managers/reply-manager" },
      ]
    },
    { title: "Analytics", url: "/analytics", icon: BarChart3, subItems: [
        { title: "Campaigns", url: "/analytics/campaigns" },
        { title: "Email Accounts", url: "/analytics/email-accounts" },
        { title: "Leads", url: "/analytics/leads" },
      ]
    },
    { title: "Settings", url: "/settings", icon: Settings, subItems: [] },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.subItems && item.subItems.length > 0 ? (
              <Collapsible defaultOpen={pathname.startsWith(item.url)}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} isActive={pathname.startsWith(item.url)}>
                    <item.icon />
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.subItems.map((sub) => (
                      <SidebarMenuSubItem key={sub.url}>
                        <SidebarMenuSubButton asChild isActive={pathname === sub.url}>
                          <a href={sub.url}>{sub.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}