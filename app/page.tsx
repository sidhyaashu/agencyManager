"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-8">
      <main className="flex flex-col gap-8 items-center bg-white p-12 rounded-2xl shadow-lg border">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Agency Manager</h1>
          <p className="text-muted-foreground mt-2">
            {session
              ? `Welcome back, ${session.user?.name}`
              : "Please sign in to continue"}
          </p>
        </div>

        <div className="flex gap-4 items-center">
          {session ? (
            <>
              <Button asChild>
                <Link href="/client-map">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button onClick={() => signIn("google")}>Sign in with Google</Button>
          )}
        </div>
      </main>
    </div>
  );
}