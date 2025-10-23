"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [loadingIndex, setLoadingIndex] = useState(0);
  const managers = [
    "Reply manager",
    "Inbox manager",
    "Campaign manager",
    "Lead manager",
    "Client manager",
  ];

  // simulate custom loading animation sequence
  useEffect(() => {
    if (step === 2 && loadingIndex < managers.length) {
      const timer = setTimeout(() => {
        setLoadingIndex((i) => i + 1);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [step, loadingIndex]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#eef2ff]">
      <div className="bg-white w-[90%] md:w-[550px] rounded-3xl shadow-md p-10 text-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                  alt="Leadshike"
                  className="w-8 h-8"
                />
                <h1 className="font-semibold text-lg ml-2">Leadshike</h1>
              </div>

              <h2 className="text-2xl font-semibold mb-1">
                Add your profile details
              </h2>
              <p className="text-gray-500 mb-6">Setup your profile</p>

              <div className="flex justify-center mb-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                  alt="avatar"
                  className="w-20 h-20 rounded-full"
                />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
                className="space-y-5"
              >
                <div className="text-left">
                  <Label htmlFor="fname">First Name *</Label>
                  <Input
                    id="fname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="text-left">
                  <Label htmlFor="lname">Last Name *</Label>
                  <Input
                    id="lname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Continue
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                  alt="Leadshike"
                  className="w-8 h-8"
                />
                <h1 className="font-semibold text-lg ml-2">Leadshike</h1>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="flex justify-center mb-4"
              >
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-100 border-8 border-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </motion.div>

              <h2 className="text-xl font-semibold mb-1">
                You just hired AI workforces.
              </h2>
              <p className="text-gray-600 mb-4">Connect</p>

              <div className="flex flex-col items-center mb-6">
                {managers.slice(0, loadingIndex).map((m, i) => (
                  <motion.div
                    key={m}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-sm text-gray-800 font-medium"
                  >
                    {m}
                  </motion.div>
                ))}
              </div>

              {loadingIndex < managers.length ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 font-medium mb-4"
                >
                  All managers connected successfully!
                </motion.div>
              )}

              <Button
                disabled={loadingIndex < managers.length}
                onClick={() => toast("Redirect to Dashboard")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Let’s Start!
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
