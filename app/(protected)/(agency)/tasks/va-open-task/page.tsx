"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

// Dummy Data
const thirdPartyTasks = [
  {
    id: 1,
    title: 'Purchase New Domain',
    client: 'Client 1',
    priority: 'High Priority',
    due: '+3 Days',
    status: 'Not Started'
  },
  {
    id: 2,
    title: 'Create Stripe Subscription',
    client: 'Client 1',
    priority: 'Mid Priority',
    due: 'Tomorrow',
    status: 'Started'
  },
  {
    id: 3,
    title: 'Purchase Email Accounts',
    client: 'Client 1',
    priority: 'Low Priority',
    due: 'Overdue: -2 Days',
    status: 'Need Attention'
  }
]

const secondPartyTasks = [
  {
    id: 1,
    title: 'Create Client 1st Campaign',
    client: 'Client 1',
    priority: 'High Priority',
    due: '16/8/24',
    status: 'Not Started'
  },
  {
    id: 2,
    title: 'Setup Client Email Account',
    client: 'Client 1',
    priority: 'Mid Priority',
    due: 'Tomorrow',
    status: 'Started'
  },
  {
    id: 3,
    title: 'Del Campaigns',
    client: 'Client 1',
    priority: 'Low Priority',
    due: 'Today',
    status: 'Need Attention'
  }
]

const firstPartyTasks = [
  {
    id: 1,
    title: 'Remove Email Accounts',
    client: 'Client 1',
    priority: 'High Priority',
    due: '16/8/24',
    status: 'Not Started',
    action:"Remove"
  },
  {
    id: 2,
    title: 'Pause the campaign',
    client: 'Client 1',
    priority: 'Mid Priority',
    due: 'Tomorrow',
    status: 'Started',
    action:"Pause"
  },
  {
    id: 3,
    title: 'Resume the campaign',
    client: 'Client 1',
    priority: 'Low Priority',
    due: 'Today',
    status: 'Need Attention',
    action:"Resume"
  }
]

export default function TaskDashboard() {
  const [priorityFilter, setPriorityFilter] = useState('All')

  const renderTaskCard = (task: any) => (
    <Card key={task.id} className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all">
      <CardHeader className="pb-1 flex justify-between items-center">
        <CardTitle className="text-base font-semibold flex justify-between items-center w-full">
          {task.title}
          <Eye className="w-4 h-4 text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-gray-700 font-medium">{task.client}</p>
        <div className="flex justify-between items-center">
          <Badge
            className={cn('text-white', {
              'bg-red-500': task.priority === 'High Priority',
              'bg-yellow-500': task.priority === 'Mid Priority',
              'bg-green-500': task.priority === 'Low Priority'
            })}
          >
            {task.priority}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Due: {task.due}
          </Badge>
        </div>
        <Separator />
        <div className="flex justify-between flex-wrap gap-2">
          {task.status === 'Not Started' && (
            <Button variant="outline" size="sm" className="text-xs">Not Started</Button>
          )}
          {task.status === 'Started' && (
            <Button variant="secondary" size="sm" className="text-xs bg-yellow-200 text-gray-900">Started</Button>
          )}
          {task.status === 'Need Attention' && (
            <Button variant="secondary" size="sm" className="text-xs bg-pink-500 text-white">Need Attention</Button>
          )}

          {
            task?.action && (
                <Button variant="secondary" size="sm" className="text-xs bg-pink-500 text-white">{task?.action}</Button>
            )
          }
        </div>
      </CardContent>
    </Card>
  )

  const renderTaskSection = (title: string, count: number, tasks: any[]) => (
    <section className="space-y-4 border border-green-200 rounded-xl p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title} <span className="text-red-500 text-sm">{count}</span></h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {tasks.map(renderTaskCard)}
      </div>
    </section>
  )

  return (
    <div className="p-6 space-y-10">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-start">
        <Select>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Due Date Filter" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Choose Clients" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Client 1">Client 1</SelectItem>
            <SelectItem value="Client 2">Client 2</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by: Priority" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Low Priority">Low Priority</SelectItem>
            <SelectItem value="Mid Priority">Mid Priority</SelectItem>
            <SelectItem value="High Priority">High Priority</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by: Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Need Attention">Need Attention</SelectItem>
            <SelectItem value="Task Started">Task Started</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {renderTaskSection('3rd Party Task', thirdPartyTasks.length, thirdPartyTasks)}
      {renderTaskSection('2nd Party Task', secondPartyTasks.length, secondPartyTasks)}
      {renderTaskSection('1st Party Tasks', firstPartyTasks.length, firstPartyTasks)}
    </div>
  )
}