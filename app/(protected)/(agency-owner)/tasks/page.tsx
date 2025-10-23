// "use client"

// import { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
// import { Separator } from '@/components/ui/separator'
// import { cn } from '@/lib/utils'

// // Dummy Data
// const aiSuggestions = [
//   {
//     id: 1,
//     title: 'High Bounce Rate Detected',
//     description: 'Bounce rate is greater than [%]',
//     client: 'Client 1',
//     campaign: 'Campaign 1',
//     email: '',
//     priority: 'High Priority',
//     due: '16 Jul, 24',
//     status: 'Need Attention'
//   },
//   {
//     id: 2,
//     title: 'Bad Email Reputation Detected',
//     description: 'This email has bad reputation',
//     client: 'Client 2',
//     campaign: 'Campaign 2',
//     email: 'example@domain.com',
//     priority: 'Mid Priority',
//     due: '16 Jul, 24',
//     status: 'Task Started'
//   },
//   {
//     id: 3,
//     title: 'Add Leads',
//     description: 'To improve positive replies.',
//     client: 'Client 1',
//     campaign: 'Campaign 3',
//     email: '',
//     priority: 'Low Priority',
//     due: '16 Jul, 24',
//     status: 'Need Attention'
//   }
// ]

// const agencyTasks = [
//   {
//     id: 1,
//     title: 'Create a Subscription',
//     description: 'Create a Stripe Subscription',
//     client: 'Client 1',
//     campaign: 'Campaign 1',
//     priority: 'High Priority',
//     due: '16 Jul, 24',
//     status: 'Need Attention: VA response here'
//   },
//   {
//     id: 2,
//     title: 'Remove the email account',
//     description: 'This email has bad reputation',
//     client: 'Client 2',
//     campaign: 'Campaign 2',
//     email: 'example@domain.com',
//     priority: 'High Priority',
//     due: '16 Jul, 24',
//     status: 'Status: In Progress'
//   },
//   {
//     id: 3,
//     title: 'New Domain Purchase',
//     description: 'Buy [36] domains from []',
//     client: 'Client 1',
//     campaign: 'Campaign 1',
//     priority: 'High Priority',
//     due: '16 Jul, 24',
//     status: 'Need Attention: VA response here'
//   }
// ]

// const clientTasks = [
//   {
//     id: 1,
//     title: 'High Bounce Rate Detected',
//     description: 'Bounce rate is greater than [%]',
//     client: 'Client 1',
//     campaign: 'Campaign 1',
//     priority: 'High Priority',
//     due: '16 Jul, 24',
//     status: 'Status: In Progress'
//   },
//   {
//     id: 2,
//     title: 'Bad Email Reputation Detected',
//     description: 'This email has bad reputation',
//     client: 'Client 2',
//     email: 'example@domain.com',
//     campaign: 'Campaign 2',
//     priority: 'High Priority',
//     due: '16 Jul, 24',
//     status: 'Status: In Progress'
//   },
//   {
//     id: 3,
//     title: 'Add Leads',
//     description: 'To improve positive replies.',
//     client: 'Client 1',
//     campaign: 'Campaign 3',
//     priority: 'High Priority',
//     due: '16 Jul, 24',
//     status: 'Need Attention: VA response here'
//   }
// ]

// export default function TaskDashboard() {
//   const [priorityFilter, setPriorityFilter] = useState('All')

//   const renderTaskCard = (task: any) => (
//     <Card key={task.id} className="shadow-sm rounded-2xl border border-gray-200 hover:shadow-md transition-all">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-base font-semibold flex justify-between items-center">
//           {task.title}
//           <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">✕</Button>
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-3 text-sm">
//         <p className="text-gray-600">{task.description}</p>
//         {task.email && <p className="text-gray-600">{task.email}</p>}
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="font-medium">{task.client}</p>
//             {task.campaign && <p className="text-gray-500">{task.campaign}</p>}
//           </div>
//           <div className="text-right">
//             <Badge className={cn('text-white', {
//               'bg-red-500': task.priority === 'High Priority',
//               'bg-yellow-500': task.priority === 'Mid Priority',
//               'bg-green-500': task.priority === 'Low Priority'
//             })}>{task.priority}</Badge>
//             {task.due && <p className="text-xs text-gray-400 mt-1">Due: {task.due}</p>}
//           </div>
//         </div>
//         <Separator />
//         <div className="flex justify-between flex-wrap gap-2">
//           <Button variant="outline" size="sm" className="text-xs">Assign: Myself</Button>
//           <Button variant="secondary" size="sm" className="text-xs">{task.status}</Button>
//         </div>
//       </CardContent>
//     </Card>
//   )

//   const filteredAISuggestions = priorityFilter === 'All' ? aiSuggestions : aiSuggestions.filter(t => t.priority === priorityFilter)

//   return (
//     <div className="p-6 space-y-8">
//       {/* Filters */}
//       <div className="flex flex-wrap gap-3 justify-start">
//         <Select>
//           <SelectTrigger className="w-[180px]"><SelectValue placeholder="Due Date Filter" /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="today">Today</SelectItem>
//             <SelectItem value="week">This Week</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select>
//           <SelectTrigger className="w-[180px]"><SelectValue placeholder="Choose Clients" /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="Client 1">Client 1</SelectItem>
//             <SelectItem value="Client 2">Client 2</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select onValueChange={setPriorityFilter}>
//           <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by: Priority" /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="All">All</SelectItem>
//             <SelectItem value="Low Priority">Low Priority</SelectItem>
//             <SelectItem value="Mid Priority">Mid Priority</SelectItem>
//             <SelectItem value="High Priority">High Priority</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select>
//           <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by: Status" /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="Completed">Completed</SelectItem>
//             <SelectItem value="Need Attention">Need Attention</SelectItem>
//             <SelectItem value="Task Started">Task Started</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* AI Suggestions */}
//       <section className="space-y-4">
//         <div>
//           <h2 className="text-xl font-semibold">AI Suggestions ({aiSuggestions.length})</h2>
//           <p className="text-sm text-gray-500">Suggestions based on the campaign performance</p>
//         </div>
//         <div className="grid md:grid-cols-3 gap-4">
//           {filteredAISuggestions.map(renderTaskCard)}
//         </div>
//       </section>

//       {/* Agency Tasks */}
//       <section className="space-y-4">
//         <div className="flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-semibold">Agency Tasks ({agencyTasks.length})</h2>
//             <p className="text-sm text-gray-500">Tasks created by the agency</p>
//           </div>
//           <Select>
//             <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by: Task Type" /></SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="active">Active</SelectItem>
//               <SelectItem value="completed">Completed</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="grid md:grid-cols-3 gap-4">
//           {agencyTasks.map(renderTaskCard)}
//         </div>
//       </section>

//       {/* Client Tasks */}
//       <section className="space-y-4">
//         <div>
//           <h2 className="text-xl font-semibold">Client Tasks ({clientTasks.length})</h2>
//           <p className="text-sm text-gray-500">Tasks created by the clients</p>
//         </div>
//         <div className="grid md:grid-cols-3 gap-4">
//           {clientTasks.map(renderTaskCard)}
//         </div>
//       </section>
//     </div>
//   )
// }



















"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Zap, User, ExternalLink } from 'lucide-react' // NEW: Icons for clarity

// Task type now includes 'party'
type Task = {
    id: number;
    title: string;
    description: string;
    client: string;
    priority: 'High' | 'Mid' | 'Low';
    due: string;
    status: string;
    party: '1st' | '2nd' | '3rd';
};

const tasks: Task[] = [
  // 1st Party Tasks (Automated / 1-Click)
  { id: 1, title: 'High Bounce Rate Detected', description: 'Auto-detected bounce rate > 5%', client: 'Client 1', priority: 'High', due: '16 Jul, 24', status: 'Need Attention', party: '1st' },
  { id: 4, title: 'Pause Campaign "Alpha"', description: 'Client requested a temporary pause.', client: 'Client 2', priority: 'Mid', due: 'Today', status: 'Pending', party: '1st' },
  
  // 2nd Party Tasks (Requires action in Smartlead/Instantly)
  { id: 2, title: 'Create New Campaign', description: 'Onboarding task for new client.', client: 'Client 3', priority: 'High', due: '18 Jul, 24', status: 'Not Started', party: '2nd' },
  { id: 5, title: 'Upload New Lead List', description: 'Client provided a new CSV.', client: 'Client 1', priority: 'Mid', due: 'Tomorrow', status: 'In Progress', party: '2nd' },
  
  // 3rd Party Tasks (Requires manual external action)
  { id: 3, title: 'Purchase 5 New Domains', description: 'Domains needed for warmup.', client: 'Client 2', priority: 'High', due: '+3 Days', status: 'Not Started', party: '3rd' },
  { id: 6, title: 'Create Stripe Subscription', description: 'Set up recurring billing.', client: 'Client 3', priority: 'High', due: 'Today', status: 'Pending', party: '3rd' },
]

// NEW: Party configuration for icons and colors
const partyConfig = {
    '1st': { icon: Zap, color: 'border-purple-500', label: '1-Click Task' },
    '2nd': { icon: ExternalLink, color: 'border-blue-500', label: 'Smartlead Task' },
    '3rd': { icon: User, color: 'border-orange-500', label: 'Manual Task' },
}

export default function AgencyTasksDashboard() {
  const [priorityFilter, setPriorityFilter] = useState('All')

  // NEW: Refactored Task Card with improved UI and party indicators
  const TaskCard = ({ task }: { task: Task }) => {
    const { icon: Icon, color, label } = partyConfig[task.party];

    return (
        <Card className={cn('shadow-sm hover:shadow-md transition-all border-l-4', color)}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                    <CardTitle className="text-base font-semibold">{task.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">{task.description}</p>
                </div>
                <Badge className={cn('text-white', {
                  'bg-red-500': task.priority === 'High',
                  'bg-yellow-500': task.priority === 'Mid',
                  'bg-green-500': task.priority === 'Low'
                })}>{task.priority} Priority</Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <Separator/>
                <div className="flex justify-between items-center">
                    <div className='font-medium'>{task.client}</div>
                    <div className="text-xs text-muted-foreground">Due: {task.due}</div>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <Badge variant="secondary" className="flex items-center gap-1.5">
                        <Icon className="h-3 w-3" />
                        {label}
                    </Badge>
                    <Button variant="outline" size="sm">{task.status}</Button>
                </div>
            </CardContent>
        </Card>
    )
  }

  const renderTaskSection = (title: string, party: '1st' | '2nd' | '3rd') => {
    const filteredTasks = tasks.filter(t => t.party === party && (priorityFilter === 'All' || t.priority === priorityFilter));
    if (filteredTasks.length === 0) return null;

    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">{title} ({filteredTasks.length})</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTasks.map(task => <TaskCard key={task.id} task={task} />)}
            </div>
        </section>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Agency To-Do List</h1>
        <p className="text-muted-foreground mt-1">All outstanding tasks across the agency, grouped by action type.</p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-start">
        {/* ... keep your existing Select filters for Due Date, Clients, etc. ... */}
        <Select onValueChange={(val) => setPriorityFilter(val)} defaultValue="All">
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by: Priority" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Priorities</SelectItem>
            <SelectItem value="Low">Low Priority</SelectItem>
            <SelectItem value="Mid">Mid Priority</SelectItem>
            <SelectItem value="High">High Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Task Sections based on Party */}
      <div className="space-y-12">
        {renderTaskSection("1-Click Tasks (1st Party)", '1st')}
        {renderTaskSection("Smartlead/Instantly Tasks (2nd Party)", '2nd')}
        {renderTaskSection("Manual & 3rd Party Tasks", '3rd')}
      </div>
    </div>
  )
}