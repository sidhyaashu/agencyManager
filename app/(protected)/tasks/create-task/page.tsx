
// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Separator } from "@/components/ui/separator";
// import {
//   Zap,
//   Flame,
//   PlayCircle,
//   PauseCircle,
//   Users,
//   PlusCircle,
//   Mail,
//   Rocket,
//   UserCircle,
// } from "lucide-react";

// const dummyClients = ["Client A", "Client B", "Client C"];

// export default function ExecuteTasks() {
//   const [selectedClient, setSelectedClient] = useState("");

//   const renderClientSelect = () => (
//     <Select onValueChange={setSelectedClient}>
//       <SelectTrigger className="w-[220px] mx-auto">
//         <SelectValue placeholder="Choose client name" />
//       </SelectTrigger>
//       <SelectContent>
//         {dummyClients.map((client) => (
//           <SelectItem key={client} value={client}>
//             {client}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );

//   const renderTaskCard = (icon: any, title: string, buttonLabel: string, color: string) => (
//     <Card className="w-full text-center border border-border shadow-sm hover:shadow-md transition-all py-5">
//       <CardHeader>
//         <CardTitle className="flex items-center justify-center gap-2 text-lg font-semibold">
//           {icon}
//           {title}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {renderClientSelect()}
//         <Button
//           className={`w-full text-white ${
//             color === "red"
//               ? "bg-red-500 hover:bg-red-600"
//               : color === "blue"
//               ? "bg-blue-500 hover:bg-blue-600"
//               : color === "green"
//               ? "bg-green-500 hover:bg-green-600"
//               : color === "orange"
//               ? "bg-orange-500 hover:bg-orange-600"
//               : color === "yellow"
//               ? "bg-yellow-500 hover:bg-yellow-600"
//               : "bg-gray-500 hover:bg-gray-600"
//           }`}
//         >
//           {buttonLabel}
//         </Button>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="">

//       <Tabs defaultValue="instantly" className="space-y-6">
//         <TabsList className="flex justify-center">
//           <TabsTrigger value="instantly">Instantly</TabsTrigger>
//           <TabsTrigger value="smartleads">Smartleads</TabsTrigger>
//         </TabsList>

//         {/* ========== INSTANTLY TAB ========== */}
//         <TabsContent value="instantly" className="space-y-10">
//           <div className="flex flex-col gap-10">
//             <section className="space-y-6">
//               <div className="text-center space-y-1">
//                 <h2 className="text-xl font-semibold flex  items-center gap-2">
//                   <Rocket className="h-5 w-5 text-orange-500" /> 1-Click Execute Tasks
//                 </h2>
//                 <p className="text-muted-foreground text-sm">Execute your tasks instantly</p>
//               </div>

//               <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
//                 {renderTaskCard(<PauseCircle className="text-red-500 h-5 w-5" />, "Pause any Campaign", "Pause Campaigns", "red")}
//                 {renderTaskCard(<Flame className="text-green-500 h-5 w-5" />, "Enable Warmup", "Enable Warmup", "green")}
//                 {renderTaskCard(<Flame className="text-red-500 h-5 w-5" />, "Disable Warmup", "Disable Warmup", "red")}
//               </div>
//             </section>

//             <section className="space-y-6">
//               <div className="text-center space-y-1">
//                 <h2 className="text-xl font-semibold flex items-center gap-2 ">
//                   <PlusCircle className="h-5 w-5 text-blue-500" /> 1-Click Create Tasks (even for your VA)
//                 </h2>
//                 <p className="text-muted-foreground text-sm">Assign and automate instantly</p>
//               </div>

//               <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
//                 {renderTaskCard(<Users className="text-blue-500 h-5 w-5" />, "Add Sender Accounts", "Add Accounts", "blue")}
//                 {renderTaskCard(<Users className="text-red-500 h-5 w-5" />, "Remove Sender Accounts", "Remove Accounts", "red")}
//               </div>
//             </section>
//           </div>
//         </TabsContent>

//         {/* ========== SMARTLEADS TAB ========== */}
//         <TabsContent value="smartleads" className="space-y-10">
//           <div className="flex flex-col gap-10">
//             <section className="space-y-6">
//               <div className="text-center space-y-1">
//                 <h2 className="text-xl font-semibold flex items-center gap-2">
//                   <PlayCircle className="h-5 w-5 text-green-500" /> 1-Click Execute Tasks
//                 </h2>
//                 <p className="text-muted-foreground text-sm">Execute campaigns efficiently</p>
//               </div>

//               <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
//                 {renderTaskCard(<PlayCircle className="text-green-500 h-5 w-5" />, "Resume Campaigns", "Resume", "green")}
//                 {renderTaskCard(<PauseCircle className="text-red-500 h-5 w-5" />, "Pause Campaigns", "Pause", "red")}
//                 {renderTaskCard(<PlayCircle className="text-green-500 h-5 w-5" />, "Resume Campaigns", "Resume", "green")}
//                 {renderTaskCard(<PauseCircle className="text-red-500 h-5 w-5" />, "Pause Campaigns", "Pause", "red")}
//               </div>
//             </section>

//             <section className="space-y-6">
//               <div className="text-center space-y-1">
//                 <h2 className="text-xl font-semibold flex items-center gap-2">
//                   <PlusCircle className="h-5 w-5 text-blue-500" /> 1-Click Create Tasks (even for your VA)
//                 </h2>
//                 <p className="text-muted-foreground text-sm">Assign campaigns or accounts instantly</p>
//               </div>

//               <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
//                 {renderTaskCard(<Mail className="text-blue-500 h-5 w-5" />, "Add New Campaign", "Add Campaign", "blue")}
//                 {renderTaskCard(<UserCircle className="text-red-500 h-5 w-5" />, "Remove Email Account", "Remove Account", "red")}
//                 {renderTaskCard(<Mail className="text-orange-500 h-5 w-5" />, "Add Leads to Campaign", "Add Leads", "orange")}
//                 {renderTaskCard(<Zap className="text-yellow-500 h-5 w-5" />, "Buy New Leads", "Buy Leads", "yellow")}
//               </div>
//             </section>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }













"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, UserPlus, UserMinus, Trash2, MailWarning } from "lucide-react";

// NEW: Data representing the task bundles
const taskBundles = [
  {
    title: "Client Onboarding Bundle",
    description: "A full set of tasks to bring a new client online.",
    icon: UserPlus,
    action: "Start Onboarding",
  },
  {
    title: "Client Sunsetting Bundle",
    description: "Offboard a client and archive their assets.",
    icon: UserMinus,
    action: "Start Sunsetting",
  },
  {
    title: "Campaign Deletion Bundle",
    description: "Retire a failed campaign and launch a new one.",
    icon: Trash2,
    action: "Delete Campaign",
  },
  {
    title: "Email Account Deletion Bundle",
    description: "Replace a poorly performing or banned email account.",
    icon: MailWarning,
    action: "Replace Account",
  },
];

export default function CreateTaskBundlePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create Task Bundle</h1>
        <p className="text-muted-foreground mt-1">
          Streamline complex processes by creating pre-defined collections of tasks.
        </p>
      </div>

      {/* Task Bundles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {taskBundles.map((bundle) => {
          const Icon = bundle.icon;
          return (
            <Card key={bundle.title} className="hover:shadow-lg hover:border-primary transition-all">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">{bundle.title}</CardTitle>
                  <CardDescription>{bundle.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full mt-4">
                  {bundle.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}