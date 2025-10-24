"use client";

import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Trash2, RefreshCw } from "lucide-react";
import { Toaster, toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleSave = (section: string) => {
    toast.success(`${section} updated successfully`);
  };

  const apiData = [
    {
      category: "Instantly",
      workspaces: [
        { id: 1, key: "12345678-1234-1234-1234-123456789abc" },
        { id: 2, key: "98765432-4321-4321-4321-cba987654321" },
      ],
    },
    {
      category: "Smartlead",
      workspaces: [{ id: 1, key: "abcdef12-3456-7890-abcd-ef1234567890" }],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">


        {/* Tabs Container */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Tabs Navigation */}
          <TabsList className="w-full justify-start border-b border-gray-200 bg-transparent rounded-none h-auto p-0 mb-8">
            <TabsTrigger 
              value="profile"
              className="data-[state=active]:border-b-2 data-[state=active]:border-gray-900 rounded-none px-4 py-3 data-[state=active]:bg-transparent"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="password"
              className="data-[state=active]:border-b-2 data-[state=active]:border-gray-900 rounded-none px-4 py-3 data-[state=active]:bg-transparent"
            >
              Password
            </TabsTrigger>
            <TabsTrigger 
              value="api"
              className="data-[state=active]:border-b-2 data-[state=active]:border-gray-900 rounded-none px-4 py-3 data-[state=active]:bg-transparent"
            >
              API Keys
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-0">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Profile Information
                </h2>
                <p className="text-sm text-gray-600">
                  Update your personal details and contact information
                </p>
              </div>

              {/* Avatar Section */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/avatar.png" alt="Profile" />
                  <AvatarFallback className="text-lg bg-gray-100 text-gray-700">AS</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Pencil size={14} />
                    Change Photo
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">First Name</Label>
                    <Input 
                      placeholder="Asutosh" 
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Last Name</Label>
                    <Input 
                      placeholder="Sidhya" 
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Username <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    placeholder="asutosh_sidhya" 
                    className="mt-1.5"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">This is your public display name</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-3 mt-1.5">
                    <Input 
                      type="email"
                      placeholder="example@email.com" 
                      className="flex-1"
                    />
                    <Button variant="outline" type="button">
                      Verify
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">We'll send a verification link to your email</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Country</Label>
                    <Input 
                      placeholder="India" 
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">City</Label>
                    <Input 
                      placeholder="Kolkata" 
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    onClick={() => handleSave("Profile")}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Password Tab */}
          <TabsContent value="password" className="mt-0">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Change Password
                </h2>
                <p className="text-sm text-gray-600">
                  Ensure your account is using a strong password
                </p>
              </div>

              <div className="space-y-6 max-w-xl">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Current Password</Label>
                  <Input 
                    type="password" 
                    placeholder="Enter current password" 
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">New Password</Label>
                  <Input 
                    type="password" 
                    placeholder="Enter new password" 
                    className="mt-1.5"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">Must be at least 8 characters</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Confirm New Password</Label>
                  <Input 
                    type="password" 
                    placeholder="Re-enter new password" 
                    className="mt-1.5"
                  />
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <Button
                    type="button"
                    onClick={() => handleSave("Password")}
                  >
                    Update Password
                  </Button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Note:</span> You will be logged out and asked to sign in again after updating your password.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* API Management Tab */}
          <TabsContent value="api" className="mt-0">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  API Key Management
                </h2>
                <p className="text-sm text-gray-600">
                  Manage your API keys for third-party integrations
                </p>
              </div>

              <div className="space-y-8">
                {apiData.map((section) => (
                  <div key={section.category}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                      {section.category}
                    </h3>

                    <div className="space-y-4">
                      {section.workspaces.map((ws) => (
                        <div
                          key={ws.id}
                          className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                Workspace {ws.id}
                              </Label>
                              <Input
                                value={ws.key}
                                readOnly
                                className="font-mono text-sm bg-gray-50"
                              />
                            </div>

                            <div className="flex gap-2 lg:flex-shrink-0">
                              {/* CHANGE KEY */}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  {/* <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2"
                                  >
                                    <RefreshCw size={14} />
                                    Regenerate
                                  </Button> */}
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Regenerate API Key?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will generate a new API key for {section.category} Workspace {ws.id}. The existing key will stop working immediately.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        toast.success(
                                          `${section.category} Workspace ${ws.id} key regenerated`
                                        )
                                      }
                                    >
                                      Regenerate Key
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>

                              {/* DELETE KEY */}
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                  >
                                    <Trash2 size={14} />
                                    Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete API Key?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. The API key for {section.category} Workspace {ws.id} will be permanently removed.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-600 hover:bg-red-700"
                                      onClick={() =>
                                        toast.info(
                                          `${section.category} Workspace ${ws.id} deleted`
                                        )
                                      }
                                    >
                                      Delete Key
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
}


