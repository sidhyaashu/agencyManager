"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RoleSwitcher } from "./RoleSwitcher";

export const ClientNavbar = ({ userName, userAvatar }: { userName: string; userAvatar?: string }) => (
  <header className="flex items-center justify-between py-3 px-6 border-b bg-white shadow-sm sticky top-0 z-30">
    <div className="flex items-center gap-2">
       <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Logo" className="h-8 w-8"/>
      <h1 className="font-bold text-xl text-gray-800">Client Portal</h1>
    </div>
    <div className="flex items-center gap-4">
       <RoleSwitcher />
      <span className="text-sm font-medium text-gray-700">Welcome, {userName}</span>
      <Avatar className="h-9 w-9">
        <AvatarImage src={userAvatar} alt={userName} />
        <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <Button variant="outline" size="sm">Logout</Button>
    </div>
  </header>
);