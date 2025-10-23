// "use client";

// import { ChevronRight, type LucideIcon } from "lucide-react";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string;
//     url: string;
//     icon?: LucideIcon;
//     isActive?: boolean;
//     items?: {
//       title: string;
//       url: string;
//     }[];
//   }[];
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3 px-3">
//         Platform
//       </SidebarGroupLabel>

//       <SidebarMenu className="space-y-1">
//         {items.map((item) => (
//           <Collapsible
//             key={item.title}
//             asChild
//             defaultOpen={item.isActive}
//             className="group/collapsible"
//           >
//             <SidebarMenuItem>
//               {/* Trigger */}
//               <CollapsibleTrigger asChild>
//                 <SidebarMenuButton
//                   tooltip={item.title}
//                   className={`flex items-center gap-2 rounded-md px-3 py-2 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 cursor-pointer ${
//                     item.isActive ? "bg-blue-100 text-blue-700 font-medium" : ""
//                   }`}
//                 >
//                   {item.icon && (
//                     <item.icon
//                       className={`h-4 w-4 transition-colors ${
//                         item.isActive ? "text-blue-600" : "text-gray-600"
//                       }`}
//                     />
//                   )}
//                   <span className="truncate">{item.title}</span>
//                   <ChevronRight className="ml-auto h-4 w-4 text-gray-500 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                 </SidebarMenuButton>
//               </CollapsibleTrigger>

//               {/* Content */}
//               <CollapsibleContent className="mt-1 pl-8 space-y-1 data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
//                 <SidebarMenuSub>
//                   {item.items?.map((subItem) => (
//                     <SidebarMenuSubItem key={subItem.title}>
//                       <SidebarMenuSubButton
//                         asChild
//                         className="relative flex items-center text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md px-3 py-1.5 transition-all duration-200 cursor-pointer"
//                       >
//                         <a href={subItem.url}>
//                           <span>{subItem.title}</span>
//                         </a>
//                       </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                   ))}
//                 </SidebarMenuSub>
//               </CollapsibleContent>
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }













"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, type LucideIcon, LayoutDashboard, Users, ClipboardList, BarChart3, Settings } from "lucide-react";
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

// NEW: Simplified and updated navigation data
const navItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      subItems: [],
    },
    {
      title: "Clients",
      url: "/clients",
      icon: Users,
      subItems: [
        { title: "All Clients", url: "/clients" },
        { title: "Add New Client", url: "/clients/new" },
      ],
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: ClipboardList,
      subItems: [
        { title: "Open Tasks", url: "/tasks" },
        { title: "Create Task Bundle", url: "/tasks/create" },
        { title: "Client Management", url: "/tasks/client-management" },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
      subItems: [
        { title: "Campaigns", url: "/analytics/campaigns" },
        { title: "Email Accounts", url: "/analytics/email-accounts" },
        { title: "Leads", url: "/analytics/leads" },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      subItems: [],
    },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3 px-3">
        Menu
      </SidebarGroupLabel>

      <SidebarMenu className="space-y-1">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.subItems && item.subItems.length > 0 ? (
              <Collapsible defaultOpen={pathname.startsWith(item.url)}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname.startsWith(item.url)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 transition-all duration-200 cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="truncate flex-1">{item.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4 text-gray-500 transition-transform duration-200 data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1 pl-8 space-y-1">
                  <SidebarMenuSub>
                    {item.subItems.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                          <a href={subItem.url}>{subItem.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={pathname === item.url}
                className="flex items-center gap-2 rounded-md px-3 py-2 transition-all duration-200 cursor-pointer"
              >
                <a href={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span className="truncate">{item.title}</span>
                </a>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}