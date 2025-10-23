"use client";

import { useMockRole } from "@/hooks/use-mock-role";
import AgencyShell from "./(agency)/AgencyShell";
import VaShell from "./(va)/VaShell";
import ClientShell from "./(client)/ClientShell";
import { useEffect, useState } from "react";

// This component is the ONLY layout in this segment.
// It acts as a router for the UI shells.
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
    return <div className="h-screen w-full flex items-center justify-center bg-gray-100">Loading Dashboard...</div>;
  }

  // Based on the role, render the correct UI shell and pass the page into it.
  // Next.js will NOT render a layout twice this way.
  switch (role) {
    case 'agency-owner':
      return <AgencyShell>{children}</AgencyShell>;
    case 'va':
      return <VaShell>{children}</VaShell>;
    case 'client':
      return <ClientShell>{children}</ClientShell>;
    default:
      // Fallback or loading state
      return <div className="h-screen w-full flex items-center justify-center">Authenticating...</div>;
  }
}