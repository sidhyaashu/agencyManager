"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell, Sparkles, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MapClientDialog from "@/components/dialogs/MapClientDialog";
import AISuggestionsDialog from "@/components/dialogs/AISuggestionsDialog";
import { useMockRole } from "@/hooks/use-mock-role";
import { RoleSwitcher } from "@/components/nav/RoleSwitcher";
import { Button } from "@/components/ui/button";

export default function AgencyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { role, user } = useMockRole();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAISuggestionsOpen, setIsAISuggestionsOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  
  // This is a UI-only redirect logic for demo purposes.
  // In a real app, this would be handled by middleware.
  if (mounted && role !== 'agency-owner') {
    if (typeof window !== 'undefined') {
      window.location.href = '/client-map'; // Redirect to trigger correct layout
    }
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header Section */}
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-background">
          {/* Left side: Sidebar trigger + text */}
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="h-4"
            />
            <h2 className="text-lg font-medium text-gray-800 flex items-center gap-2">
              Hello {user.name} <span className="animate-wave">👋</span>
            </h2>
          </div>

          {/* Right side: icons + avatar dropdown */}
          <div className="flex items-center gap-4">
            <RoleSwitcher />
            {pathname.endsWith("/client-map") && (
              <Button onClick={() => setIsDialogOpen(true)}>
                Map New Client
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsAISuggestionsOpen(true)} className="relative">
              <Sparkles className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
            </Button>
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
              <DropdownMenuContent align="end" className="w-50">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Body */}
        <div className="flex flex-1 flex-col gap-4 p-6 pt-4 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
      <MapClientDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <AISuggestionsDialog
        open={isAISuggestionsOpen}
        onOpenChange={setIsAISuggestionsOpen}
      />
    </SidebarProvider>
  );
}