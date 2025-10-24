import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { MockRoleProvider } from "@/hooks/use-mock-role";
import { WhiteLabelProvider } from "@/hooks/use-white-label"; // 1. Import the new provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agency Manager",
  description: "Centralized management platform for marketing agencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* 2. Wrap the MockRoleProvider with the WhiteLabelProvider */}
        <WhiteLabelProvider>
          <MockRoleProvider>
            {children}
          </MockRoleProvider>
        </WhiteLabelProvider>
        <Toaster />
      </body>
    </html>
  );
}