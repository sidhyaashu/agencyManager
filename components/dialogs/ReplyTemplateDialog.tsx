'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const formSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  templateName: z.string().min(1, 'Template name is required'),
  subject: z.string().optional(),
  body: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const dummyCategories = [
  { value: 'introduction', label: 'Introduction / First Contact' },
  { value: 'followup', label: 'Follow-up' },
  { value: 'meeting', label: 'Meeting / Call Requests' },
  { value: 'misc', label: 'Miscellaneous' },
];

interface ReplyTemplateDialogProps {
  trigger?: React.ReactNode;
  onCreate?: (values: FormValues) => void;
}

export function ReplyTemplateDialog({
  trigger,
  onCreate,
}: ReplyTemplateDialogProps) {
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      templateName: '',
      subject: '',
      body: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    toast.success('Template created successfully!');
    onCreate?.(values);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Create Reply Template</Button>}
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-2xl p-6 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Reply Template
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Category */}
          <div className="space-y-1.5">
            <Label>
              Select Category <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(v) => form.setValue('category', v)}
              value={form.watch('category')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select template category" />
              </SelectTrigger>
              <SelectContent>
                {dummyCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.category && (
              <p className="text-xs text-red-500">
                {form.formState.errors.category.message}
              </p>
            )}
          </div>

          {/* Template Name */}
          <div className="space-y-1.5">
            <Label>
              Template Name <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Write template name here"
              {...form.register('templateName')}
            />
            {form.formState.errors.templateName && (
              <p className="text-xs text-red-500">
                {form.formState.errors.templateName.message}
              </p>
            )}
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <Label>Subject</Label>
            <Input
              placeholder="Write subject here [dynamic_value]"
              {...form.register('subject')}
            />
          </div>

          {/* Body */}
          <div className="space-y-1.5">
            <Label>Body</Label>
            <Textarea
              placeholder={`Write body here\n\nDynamic Values:\n[client_name]\n[company_name]\netc.`}
              rows={5}
              {...form.register('body')}
            />
          </div>

          <DialogFooter className="flex justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
