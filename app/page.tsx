import { RoleSwitcher } from "@/components/nav/RoleSwitcher";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-8">
      <main className="flex flex-col gap-8 items-center bg-white p-12 rounded-2xl shadow-lg border">
        <div className="text-center">
            <h1 className="text-3xl font-bold">Agency Manager</h1>
            <p className="text-muted-foreground mt-2">Select your role to view the dashboard.</p>
        </div>
        
        <div className="p-6 border rounded-xl bg-gray-50">
            <RoleSwitcher />
        </div>
        
        <div className="flex gap-4 items-center">
          <Button asChild>
            <Link href="/client-map">
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}