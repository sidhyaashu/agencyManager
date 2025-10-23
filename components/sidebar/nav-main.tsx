"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
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

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3 px-3">
        Platform
      </SidebarGroupLabel>

      <SidebarMenu className="space-y-1">
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {/* Trigger */}
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 cursor-pointer ${
                    item.isActive ? "bg-blue-100 text-blue-700 font-medium" : ""
                  }`}
                >
                  {item.icon && (
                    <item.icon
                      className={`h-4 w-4 transition-colors ${
                        item.isActive ? "text-blue-600" : "text-gray-600"
                      }`}
                    />
                  )}
                  <span className="truncate">{item.title}</span>
                  <ChevronRight className="ml-auto h-4 w-4 text-gray-500 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              {/* Content */}
              <CollapsibleContent className="mt-1 pl-8 space-y-1 data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        className="relative flex items-center text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md px-3 py-1.5 transition-all duration-200 cursor-pointer"
                      >
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
