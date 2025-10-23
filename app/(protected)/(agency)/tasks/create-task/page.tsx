// "use client";

// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Separator } from "@/components/ui/separator";
// import {
//   ListTree,
//   User,
//   FolderOpen,
//   PlayCircle,
//   Search,
// } from "lucide-react";

// type Task = {
//   id: number;
//   title: string;
//   actionLabel: string;
//   color: "blue" | "red" | "orange" | "green";
//   type: "campaign" | "account" | "lead" | "warmup";
// };

// const dummyClients = ["Client A", "Client B", "Client C"];
// const dummyCampaigns = ["Campaign 1", "Campaign 2"];
// const dummyAccounts = ["Email 1", "Email 2"];
// const dummyLeads = ["Lead 1", "Lead 2"];

// const smartleadsTasks: Task[] = [
//   {
//     id: 1,
//     title: "Create New Campaign",
//     actionLabel: "Add Campaign",
//     color: "blue",
//     type: "campaign",
//   },
//   {
//     id: 2,
//     title: "Pause Campaign",
//     actionLabel: "Pause Campaign",
//     color: "red",
//     type: "campaign",
//   },
//   {
//     id: 3,
//     title: "Add Email to Campaign",
//     actionLabel: "Add Accounts",
//     color: "blue",
//     type: "account",
//   },
//   {
//     id: 4,
//     title: "Remove Email from Campaign",
//     actionLabel: "Remove Accounts",
//     color: "red",
//     type: "account",
//   },
// ];

// const instantlyTasks: Task[] = [
//   {
//     id: 1,
//     title: "Upload Leads to Campaign",
//     actionLabel: "Upload Leads",
//     color: "orange",
//     type: "lead",
//   },
//   {
//     id: 2,
//     title: "Delete Leads from Campaign",
//     actionLabel: "Delete Leads",
//     color: "red",
//     type: "lead",
//   },
//   {
//     id: 3,
//     title: "Update Email Account",
//     actionLabel: "Update Account",
//     color: "orange",
//     type: "account",
//   },
//   {
//     id: 4,
//     title: "Reconnect Failed Email Accounts",
//     actionLabel: "Reconnect Accounts",
//     color: "green",
//     type: "account",
//   },
//   {
//     id: 5,
//     title: "Enable Warmup",
//     actionLabel: "Enable Warmup",
//     color: "blue",
//     type: "warmup",
//   },
//   {
//     id: 6,
//     title: "Disable Warmup",
//     actionLabel: "Disable Warmup",
//     color: "red",
//     type: "warmup",
//   },
// ];

// export default function ExecuteTasks() {
//   const [search, setSearch] = useState("");
//   const [sortClient, setSortClient] = useState("top");
//   const [sortStatus, setSortStatus] = useState("all");
//   const [filterType, setFilterType] = useState("all");

//   const renderSelect = (type: Task["type"]) => {
//     let options: string[] = [];
//     switch (type) {
//       case "campaign":
//         options = dummyCampaigns;
//         break;
//       case "account":
//         options = dummyAccounts;
//         break;
//       case "lead":
//         options = dummyLeads;
//         break;
//       default:
//         options = [];
//     }

//     return (
//       <Select>
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Select" />
//         </SelectTrigger>
//         <SelectContent>
//           {options.map((opt) => (
//             <SelectItem key={opt} value={opt}>
//               {opt}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     );
//   };

//   const renderTasks = (tasks: Task[]) => {
//     return tasks
//       .filter((task) =>
//         filterType === "all" ? true : task.type === filterType
//       )
//       .map((task) => (
//         <Card
//           key={task.id}
//           className="shadow-sm hover:shadow-md transition-shadow border border-border mb-2"
//         >
//           <CardContent className="grid grid-cols-4 items-center gap-6 px-4">
//             <div className="font-medium text-sm text-foreground/90">
//               {task.title}
//             </div>

//             {/* Choose Client */}
//             <Select>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Choose Client" />
//               </SelectTrigger>
//               <SelectContent>
//                 {dummyClients.map((client) => (
//                   <SelectItem key={client} value={client}>
//                     {client}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {/* Select Campaign / Account / Lead */}
//             {renderSelect(task.type)}

//             {/* Execute Button */}
//             <Button
//               variant="default"
//               className={`w-full text-white ${
//                 task.color === "red"
//                   ? "bg-red-500 hover:bg-red-600"
//                   : task.color === "blue"
//                   ? "bg-blue-500 hover:bg-blue-600"
//                   : task.color === "orange"
//                   ? "bg-orange-500 hover:bg-orange-600"
//                   : "bg-green-500 hover:bg-green-600"
//               }`}
//             >
//               <PlayCircle className="w-4 h-4 mr-2" />
//               {task.actionLabel}
//             </Button>
//           </CardContent>
//         </Card>
//       ));
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <h1 className="text-2xl font-bold tracking-tight">
//           1-Click Execute Tasks
//         </h1>

//         <div className="flex flex-wrap gap-3 items-center">
//           <div className="relative">
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search clients..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-9 w-[220px]"
//             />
//           </div>

//           <Select value={sortClient} onValueChange={setSortClient}>
//             <SelectTrigger className="w-[160px]">
//               <SelectValue placeholder="Sort by: Top Clients" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="top">Top Clients</SelectItem>
//               <SelectItem value="new">New Clients</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={sortStatus} onValueChange={setSortStatus}>
//             <SelectTrigger className="w-[160px]">
//               <SelectValue placeholder="Sort by: Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="active">Active</SelectItem>
//               <SelectItem value="paused">Paused</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select value={filterType} onValueChange={setFilterType}>
//             <SelectTrigger className="w-[160px]">
//               <SelectValue placeholder="Task Type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Tasks</SelectItem>
//               <SelectItem value="campaign">Campaign</SelectItem>
//               <SelectItem value="account">Account</SelectItem>
//               <SelectItem value="lead">Lead</SelectItem>
//               <SelectItem value="warmup">Warmup</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <Separator />


//       {/* Tabs Section */}
//       <Tabs defaultValue="smartleads" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="smartleads">Smartleads</TabsTrigger>
//           <TabsTrigger value="instantly">Instantly</TabsTrigger>
//         </TabsList>

        
//       {/* Column Header */}
//       <div className="grid grid-cols-4 items-center text-sm font-semibold text-muted-foreground px-4 w-full">
//         <div className="flex items-center justify-center gap-2">
//           <ListTree className="w-4 h-4" />
//           Task Type
//         </div>
//         <div className="flex items-center justify-center gap-2">
//           <User className="w-4 h-4" />
//           Choose Client
//         </div>
//         <div className="flex items-center justify-center gap-2">
//           <FolderOpen className="w-4 h-4" />
//           Select
//         </div>
//         <div className="flex items-center justify-center gap-2">
//           <PlayCircle className="w-4 h-4" />
//           Execute
//         </div>
//       </div>

//         <TabsContent value="smartleads">{renderTasks(smartleadsTasks)}</TabsContent>
//         <TabsContent value="instantly">{renderTasks(instantlyTasks)}</TabsContent>
//       </Tabs>
//     </div>
//   );
// }





"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Zap,
  Flame,
  PlayCircle,
  PauseCircle,
  Users,
  PlusCircle,
  Mail,
  Rocket,
  UserCircle,
} from "lucide-react";

const dummyClients = ["Client A", "Client B", "Client C"];

export default function ExecuteTasks() {
  const [selectedClient, setSelectedClient] = useState("");

  const renderClientSelect = () => (
    <Select onValueChange={setSelectedClient}>
      <SelectTrigger className="w-[220px] mx-auto">
        <SelectValue placeholder="Choose client name" />
      </SelectTrigger>
      <SelectContent>
        {dummyClients.map((client) => (
          <SelectItem key={client} value={client}>
            {client}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const renderTaskCard = (icon: any, title: string, buttonLabel: string, color: string) => (
    <Card className="w-full text-center border border-border shadow-sm hover:shadow-md transition-all py-5">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-lg font-semibold">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderClientSelect()}
        <Button
          className={`w-full text-white ${
            color === "red"
              ? "bg-red-500 hover:bg-red-600"
              : color === "blue"
              ? "bg-blue-500 hover:bg-blue-600"
              : color === "green"
              ? "bg-green-500 hover:bg-green-600"
              : color === "orange"
              ? "bg-orange-500 hover:bg-orange-600"
              : color === "yellow"
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="">

      <Tabs defaultValue="instantly" className="space-y-6">
        <TabsList className="flex justify-center">
          <TabsTrigger value="instantly">Instantly</TabsTrigger>
          <TabsTrigger value="smartleads">Smartleads</TabsTrigger>
        </TabsList>

        {/* ========== INSTANTLY TAB ========== */}
        <TabsContent value="instantly" className="space-y-10">
          <div className="flex flex-col gap-10">
            <section className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-semibold flex  items-center gap-2">
                  <Rocket className="h-5 w-5 text-orange-500" /> 1-Click Execute Tasks
                </h2>
                <p className="text-muted-foreground text-sm">Execute your tasks instantly</p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {renderTaskCard(<PauseCircle className="text-red-500 h-5 w-5" />, "Pause any Campaign", "Pause Campaigns", "red")}
                {renderTaskCard(<Flame className="text-green-500 h-5 w-5" />, "Enable Warmup", "Enable Warmup", "green")}
                {renderTaskCard(<Flame className="text-red-500 h-5 w-5" />, "Disable Warmup", "Disable Warmup", "red")}
              </div>
            </section>

            <section className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-semibold flex items-center gap-2 ">
                  <PlusCircle className="h-5 w-5 text-blue-500" /> 1-Click Create Tasks (even for your VA)
                </h2>
                <p className="text-muted-foreground text-sm">Assign and automate instantly</p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {renderTaskCard(<Users className="text-blue-500 h-5 w-5" />, "Add Sender Accounts", "Add Accounts", "blue")}
                {renderTaskCard(<Users className="text-red-500 h-5 w-5" />, "Remove Sender Accounts", "Remove Accounts", "red")}
              </div>
            </section>
          </div>
        </TabsContent>

        {/* ========== SMARTLEADS TAB ========== */}
        <TabsContent value="smartleads" className="space-y-10">
          <div className="flex flex-col gap-10">
            <section className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-green-500" /> 1-Click Execute Tasks
                </h2>
                <p className="text-muted-foreground text-sm">Execute campaigns efficiently</p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {renderTaskCard(<PlayCircle className="text-green-500 h-5 w-5" />, "Resume Campaigns", "Resume", "green")}
                {renderTaskCard(<PauseCircle className="text-red-500 h-5 w-5" />, "Pause Campaigns", "Pause", "red")}
                {renderTaskCard(<PlayCircle className="text-green-500 h-5 w-5" />, "Resume Campaigns", "Resume", "green")}
                {renderTaskCard(<PauseCircle className="text-red-500 h-5 w-5" />, "Pause Campaigns", "Pause", "red")}
              </div>
            </section>

            <section className="space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-blue-500" /> 1-Click Create Tasks (even for your VA)
                </h2>
                <p className="text-muted-foreground text-sm">Assign campaigns or accounts instantly</p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {renderTaskCard(<Mail className="text-blue-500 h-5 w-5" />, "Add New Campaign", "Add Campaign", "blue")}
                {renderTaskCard(<UserCircle className="text-red-500 h-5 w-5" />, "Remove Email Account", "Remove Account", "red")}
                {renderTaskCard(<Mail className="text-orange-500 h-5 w-5" />, "Add Leads to Campaign", "Add Leads", "orange")}
                {renderTaskCard(<Zap className="text-yellow-500 h-5 w-5" />, "Buy New Leads", "Buy Leads", "yellow")}
              </div>
            </section>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
