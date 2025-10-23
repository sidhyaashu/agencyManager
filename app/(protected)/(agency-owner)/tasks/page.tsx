"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Zap, User, ExternalLink } from 'lucide-react'

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
  { id: 1, title: 'High Bounce Rate Detected', description: 'Auto-detected bounce rate > 5%', client: 'Client 1', priority: 'High', due: '16 Jul, 24', status: 'Need Attention', party: '1st' },
  { id: 4, title: 'Pause Campaign "Alpha"', description: 'Client requested a temporary pause.', client: 'Client 2', priority: 'Mid', due: 'Today', status: 'Pending', party: '1st' },
  { id: 2, title: 'Create New Campaign', description: 'Onboarding task for new client.', client: 'Client 3', priority: 'High', due: '18 Jul, 24', status: 'Not Started', party: '2nd' },
  { id: 5, title: 'Upload New Lead List', description: 'Client provided a new CSV.', client: 'Client 1', priority: 'Mid', due: 'Tomorrow', status: 'In Progress', party: '2nd' },
  { id: 3, title: 'Purchase 5 New Domains', description: 'Domains needed for warmup.', client: 'Client 2', priority: 'High', due: '+3 Days', status: 'Not Started', party: '3rd' },
  { id: 6, title: 'Create Stripe Subscription', description: 'Set up recurring billing.', client: 'Client 3', priority: 'High', due: 'Today', status: 'Pending', party: '3rd' },
];

const partyConfig = {
    '1st': { icon: Zap, color: 'border-purple-500', label: '1-Click Task' },
    '2nd': { icon: ExternalLink, color: 'border-blue-500', label: 'Smartlead Task' },
    '3rd': { icon: User, color: 'border-orange-500', label: 'Manual Task' },
};

export default function AgencyTasksDashboard() {
  const [priorityFilter, setPriorityFilter] = useState('All');

  const TaskCard = ({ task }: { task: Task }) => {
    const { icon: Icon, color, label } = partyConfig[task.party];

    return (
        <Card className={cn('shadow-sm hover:shadow-md transition-all border-l-4', color)}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                    <CardTitle className="text-base font-semibold">{task.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">{task.description}</p>
                </div>
                <Badge className={cn('text-white whitespace-nowrap', {
                  'bg-red-500': task.priority === 'High', 'bg-yellow-500': task.priority === 'Mid', 'bg-green-500': task.priority === 'Low'
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
    );
  };

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
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Agency To-Do List</h1>
        <p className="text-muted-foreground mt-1">All outstanding tasks across the agency, grouped by action type.</p>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-start">
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

      <div className="space-y-12">
        {renderTaskSection("1-Click Tasks (1st Party)", '1st')}
        {renderTaskSection("Smartlead/Instantly Tasks (2nd Party)", '2nd')}
        {renderTaskSection("Manual & 3rd Party Tasks", '3rd')}
      </div>
    </div>
  );
}