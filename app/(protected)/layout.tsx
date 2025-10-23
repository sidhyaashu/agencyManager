"use client";
import { useMockRole } from "@/hooks/use-mock-role";
import AgencyLayout from "./(agency)/layout";
import VaLayout from "./(va)/layout";
import ClientLayout from "./(client)/layout";
import { useEffect, useState } from "react";
// This component acts as a router for the layouts.
export default function ProtectedRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = useMockRole();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  // Wait until the component is mounted on the client to avoid hydration errors
  if (!mounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-100">
        Loading Dashboard...
      </div>
    );
  }
  // Based on the role from our context, render the correct layout shell
  switch (role) {
    case "agency-owner":
      return <AgencyLayout>{children}</AgencyLayout>;
    case "va":
      return <VaLayout>{children}</VaLayout>;
    case "client":
      return <ClientLayout>{children}</ClientLayout>;
    default:
      // Fallback or loading state
      return (
        <div className="h-screen w-full flex items-center justify-center">
          Authenticating...
        </div>
      );
  }
}
