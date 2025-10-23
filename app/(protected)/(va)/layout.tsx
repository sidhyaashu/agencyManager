"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useMockRole } from "@/hooks/use-mock-role";
import { RoleSwitcher } from "@/components/nav/RoleSwitcher";
import { VaSidebar } from "@/components/sidebar/va-sidebar"; // Import the VA sidebar
import { Button } from "@/components/ui/button";

export default function VaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { role, user } = useMockRole();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  
  if (mounted && role !== 'va') {
    if (typeof window !== 'undefined') {
      window.location.href = '/client-map'; // Redirect to trigger correct layout
    }
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <SidebarProvider>
      <VaSidebar /> {/* Use the restricted VA sidebar */}
      <SidebarInset>
        {/* Header Section */}
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-background">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <h2 className="text-lg font-medium text-gray-800">VA Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <RoleSwitcher />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-9 w-9">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>My Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6 pt-4 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}