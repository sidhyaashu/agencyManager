"use client";

import { useMockRole } from "@/hooks/use-mock-role";
import { ClientNavbar } from "@/components/nav/ClientNavbar";

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = useMockRole();

  return (
    <div className="min-h-screen bg-slate-50">
        <ClientNavbar userName={user.name} userAvatar={user.avatar}/>
        <main className="p-6 lg:p-8">
            {children}
        </main>
    </div>
  );
}