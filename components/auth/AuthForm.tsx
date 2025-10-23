"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // fake delay
    await new Promise((res) => setTimeout(res, 1200));
    toast.success(
      isSignUp ? "Account created successfully!" : "Signed in successfully!"
    );

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <h1 className="mb-4">Lideshike</h1>
      <div className="flex mb-6 border border-gray-100 rounded-md overflow-hidden">
        <Button
          variant={isSignUp ? "default" : "ghost"}
          className="flex-1 rounded-none"
          onClick={() => setIsSignUp(true)}
        >
          Sign Up
        </Button>
        <Button
          variant={!isSignUp ? "default" : "ghost"}
          className="flex-1 rounded-none"
          onClick={() => setIsSignUp(false)}
        >
          Sign In
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="email">Email Id</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            {!isSignUp && (
              <a href="#" className="text-xs text-primary font-medium">
                Forgot Password?
              </a>
            )}
          </div>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPass ? "text" : "password"}
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {isSignUp && (
            <ul className="text-xs text-gray-500 mt-2 space-y-1 pl-1">
              <li>✓ Password Strength: Weak</li>
              <li>✓ Cannot contain your name or email address</li>
              <li>✓ At least 8 characters</li>
              <li>✓ Contains a number or symbol</li>
            </ul>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white hover:bg-blue-600"
        >
          {loading ? (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          ) : null}
          {isSignUp ? "Create Account" : "Sign In"}
        </Button>

        <Separator className="my-6" />

        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center space-x-2"
          onClick={() => toast("Google Sign-In coming soon 🚀")}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Sign up with Google</span>
        </Button>

        <p className="text-[10px] text-center text-gray-400 mt-4">
          By signing up you accept the company’s{" "}
          <a href="#" className="underline">
            Terms of Use
          </a>{" "}
          &{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>.
        </p>
      </form>
    </motion.div>
  );
}
