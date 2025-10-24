"use client";

import { useSession } from "next-auth/react";
import AgencyShell from "./(agency)/AgencyShell";
import VaShell from "./(va)/VaShell";
import ClientShell from "./(client)/ClientShell";
import { useEffect, useState } from "react";

export default function ProtectedRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || status === "loading") {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-100">
        Loading Dashboard...
      </div>
    );
  }

  // Get the role from the real session
  const role = session?.user?.role;

  switch (role) {
    case 'AGENCY_OWNER':
      return <AgencyShell>{children}</AgencyShell>;
    case 'VA':
      return <VaShell>{children}</VaShell>;
    case 'CLIENT':
      return <ClientShell>{children}</ClientShell>;
    default:
      // Fallback for when role isn't defined or authenticated
      return (
        <div className="h-screen w-full flex items-center justify-center">
          Authenticating...
        </div>
      );
  }
}