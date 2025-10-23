"use client";

import { useEffect, useState } from "react";
import { useMockRole } from "@/hooks/use-mock-role";
import { ClientNavbar } from "@/components/nav/ClientNavbar"; // Import the Client navbar

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { role, user } = useMockRole();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  
  if (mounted && role !== 'client') {
     if (typeof window !== 'undefined') {
      window.location.href = '/client-map'; // Redirect to trigger correct layout
    }
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
        <ClientNavbar userName={user.name} userAvatar={user.avatar}/>
        <main className="p-6 lg:p-8">
            {children}
        </main>
    </div>
  );
}