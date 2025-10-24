"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MapClientDialog from "@/components/dialogs/MapClientDialog";
import AISuggestionsDialog from "@/components/dialogs/AISuggestionsDialog";
import { useMockRole } from "@/hooks/use-mock-role";
import { Button } from "@/components/ui/button";

export default function AgencyShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useMockRole();
  const pathname = usePathname();
  const [isMapClientOpen, setMapClientOpen] = useState(false);
  const [isAISuggestionsOpen, setAISuggestionsOpen] = useState(false);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-background">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <h2 className="text-lg font-medium text-gray-800 flex items-center gap-2">
              Hello {user.name} <span className="animate-wave">👋</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {pathname.endsWith("/client-map") && (
              <Button onClick={() => setMapClientOpen(true)}>
                Map New Client
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setAISuggestionsOpen(true)} className="relative">
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
        <div className="flex flex-1 flex-col p-6 pt-4 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
      <MapClientDialog open={isMapClientOpen} onOpenChange={setMapClientOpen} />
      <AISuggestionsDialog
        open={isAISuggestionsOpen}
        onOpenChange={setAISuggestionsOpen}
      />
    </SidebarProvider>
  );
}