"use client";

import AuthForm from "@/components/auth/AuthForm";
import AuthLayout from "@/components/auth/AuthLayout";
import { Toaster } from "sonner";


export default function AuthPage() {
  return (
    <div className="flex min-h-screen bg-white p-8">
      {/* Left Side */}
      <AuthLayout />

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8">
        <AuthForm />
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
