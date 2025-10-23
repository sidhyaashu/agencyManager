"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { ProtectedHeader } from "../layout";

// This is the Agency Owner's specific layout
export default function AgencyOwnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <ProtectedHeader />
        {/* Page Body */}
        <main className="flex flex-1 flex-col gap-4 p-6 pt-4 bg-gray-50/50 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}