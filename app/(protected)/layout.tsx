// "use client";

// import { AppSidebar } from "@/components/sidebar/app-sidebar";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";

// import { Bell, Sparkles, Plus } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import MapClientDialog from "@/components/dialogs/MapClientDialog";
// import AISuggestionsDialog from "@/components/dialogs/AISuggestionsDialog";



// export default function Page({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {


//   const [mounted, setMounted] = useState(false);
//   const pathname = usePathname();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isAISuggestionsOpen, setIsAISuggestionsOpen] = useState(false);

//   useEffect(() => setMounted(true), []);


//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <SidebarInset>
//         {/* Header Section */}
//         <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-background">
//           {/* Left side: Sidebar trigger + text */}
//           <div className="flex items-center gap-3">
//             <SidebarTrigger className="-ml-1" />
//             <Separator
//               orientation="vertical"
//               className="h-4 data-[orientation=vertical]:h-4"
//             />

//             <h2 className="text-lg font-medium text-gray-800 flex items-center gap-2">
//               Hello Shekhar <span className="animate-wave">👋</span>, you have{" "}
//               <span className="font-semibold text-black">105 Interested Leads</span>
//             </h2>
//           </div>

//           {/* Right side: icons + avatar dropdown */}
//           <div className="flex items-center gap-4">

//             {pathname === "/client-map" && (
//               <button
//                 onClick={() => setIsDialogOpen(true)}
//                 className="rounded-full py-2 px-4 bg-blue-500 hover:bg-blue-600 transition-colors cursor-pointer"
//               >
//                 Map New Client
//               </button>
//             )}

//             <button className="rounded-full p-2 hover:bg-muted transition-colors cursor-pointer">
//               <Plus className="h-5 w-5 text-gray-700" />
//             </button>

//             <button
//               onClick={() => setIsAISuggestionsOpen(true)}
//               className="relative rounded-full p-2 hover:bg-muted transition-colors cursor-pointer"
//             >
//               <Sparkles className="h-5 w-5 text-gray-700" />
//               <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
//             </button>

//             <button className="relative rounded-full p-2 hover:bg-muted transition-colors cursor-pointer">
//               <Bell className="h-5 w-5 text-gray-700" />
//               <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
//             </button>

//             {/* Avatar dropdown */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Avatar className="cursor-pointer h-9 w-9">
//                   <AvatarImage src="/avatars/user.jpg" alt="@shekhar" />
//                   <AvatarFallback>SH</AvatarFallback>
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-50">
//                 {/* <DropdownMenuLabel>Profile</DropdownMenuLabel>
//                 <DropdownMenuSeparator /> */}
//                 <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
//                 <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
//                 <DropdownMenuItem className="cursor-pointer">API Management</DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem className="text-red-600 cursor-pointer">Logout</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </header>

//         {/* Page Body */}
//         <div className="flex flex-1 flex-col gap-4 p-6 pt-4">
//           {children}
//         </div>
//       </SidebarInset>
//       <MapClientDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
//       <AISuggestionsDialog
//         open={isAISuggestionsOpen}
//         onOpenChange={setIsAISuggestionsOpen}
//       />
//     </SidebarProvider>
//   );
// }






























"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Sparkles, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This layout is now shared by ALL protected roles (Agency Owner, VA, Client)
export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      {/* The children here will be the role-specific layouts (e.g., AgencyOwnerLayout) */}
      {children}
    </SidebarProvider>
  );
}

// We create a reusable header component to be used by role-specific layouts
export function ProtectedHeader() {
  // In a real app, you'd get the user from a session hook
  const user = { name: "Shekhar", initials: "SH" };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-background">
      {/* Left side: Sidebar trigger + dynamic text */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="h-4 data-[orientation=vertical]:h-4"
        />
        <h2 className="text-lg font-medium text-gray-800 flex items-center gap-2">
          Hello {user.name} <span className="animate-wave">👋</span>
        </h2>
      </div>

      {/* Right side: icons + avatar dropdown */}
      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 hover:bg-muted transition-colors cursor-pointer">
          <Plus className="h-5 w-5 text-gray-700" />
        </button>

        <button className="relative rounded-full p-2 hover:bg-muted transition-colors cursor-pointer">
          <Sparkles className="h-5 w-5 text-gray-700" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button className="relative rounded-full p-2 hover:bg-muted transition-colors cursor-pointer">
          <Bell className="h-5 w-5 text-gray-700" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer h-9 w-9">
              <AvatarImage src="/avatars/user.jpg" alt={`@${user.name}`} />
              <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-50">
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">API Management</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}