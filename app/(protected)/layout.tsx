// "use client";

// import { useMockRole } from "@/hooks/use-mock-role";
// import AgencyShell from "./(agency)/AgencyShell";
// import VaShell from "./(va)/VaShell";
// import ClientShell from "./(client)/ClientShell";
// import { useEffect, useState } from "react";

// // This component is the ONLY layout in this segment.
// // It acts as a router for the UI shells.
// export default function ProtectedRootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { role } = useMockRole();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Wait until the component is mounted on the client to avoid hydration errors
//   if (!mounted) {
//     return <div className="h-screen w-full flex items-center justify-center bg-gray-100">Loading Dashboard...</div>;
//   }

//   // Based on the role, render the correct UI shell and pass the page into it.
//   // Next.js will NOT render a layout twice this way.
//   switch (role) {
//     case 'agency-owner':
//       return <AgencyShell>{children}</AgencyShell>;
//     case 'va':
//       return <VaShell>{children}</VaShell>;
//     case 'client':
//       return <ClientShell>{children}</ClientShell>;
//     default:
//       // Fallback or loading state
//       return <div className="h-screen w-full flex items-center justify-center">Authenticating...</div>;
//   }
// }







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