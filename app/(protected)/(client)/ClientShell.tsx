"use client";

import { useSession } from "next-auth/react";
import { ClientNavbar } from "@/components/nav/ClientNavbar";

export default function ClientShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="min-h-screen bg-slate-50">
        <ClientNavbar userName={user?.name ?? "Client"} userAvatar={user?.image ?? undefined} />
        <main className="p-6 lg:p-8">
            {children}
        </main>
    </div>
  );
}