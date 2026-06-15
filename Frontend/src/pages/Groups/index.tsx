import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChevronRight, Plus, UserCheck, Users, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '../../services/api/api.client';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import { Dialog } from '../../components/ui/Dialog';
import { Input } from '../../components/ui/Input';
import { Skeleton } from '../../components/ui/Skeleton';

interface GroupItem {
  id: string;
  name: string;
  inviteCode: string;
  memberCount: number;
  stats: {
    currentStreak: number;
    totalSolved: number;
  };
}

const createGroupSchema = z.object({
  name: z.string().min(3, 'Group name must be at least 3 characters'),
});

const joinGroupSchema = z.object({
  inviteCode: z.string().length(6, 'Invite code must be exactly 6 characters'),
});

export default function Groups() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  const { data: groups, isLoading } = useQuery<GroupItem[]>({
    queryKey: ['userGroups'],
    queryFn: () => apiClient.get<GroupItem[]>('/api/groups'),
  });

  const createForm = useForm<{ name: string }>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: { name: '' },
  });
  const joinForm = useForm<{ inviteCode: string }>({
    resolver: zodResolver(joinGroupSchema),
    defaultValues: { inviteCode: '' },
  });

  const createMutation = useMutation({
    mutationFn: (name: string) =>
      apiClient.post<GroupItem>('/api/groups', { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGroups'] });
      createForm.reset();
      setIsCreateOpen(false);
      toast.success('Accountability group created!');
    },
    onError: (error: Error) =>
      toast.error(error.message || 'Failed to create group'),
  });

  const joinMutation = useMutation({
    mutationFn: (inviteCode: string) =>
      apiClient.post('/api/groups/join', {
        inviteCode: inviteCode.toUpperCase(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGroups'] });
      joinForm.reset();
      setIsJoinOpen(false);
      toast.success('Successfully joined the group!');
    },
    onError: (error: Error) =>
      toast.error(error.message || 'Failed to join group'),
  });

  return (
    <div className="space-y-8 text-left">
      <div className="profile-hero p-6 md:p-8">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <p className="workspace-eyebrow flex items-center gap-1.5 mb-2">
              <Zap className="w-3 h-3 text-indigo-400" /> Squad Management
            </p>
            <h1 className="font-display font-extrabold text-2xl md:text-3xl page-title-gradient">
              Your Groups
            </h1>
            <p className="text-sm text-text-secondary mt-2">
              Create a new accountability squad or join one with an invite code.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setIsJoinOpen(true)}>
              <UserCheck className="w-4 h-4 mr-2" /> Join Group
            </Button>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Create Group
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
      ) : groups?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {groups.map((group) => (
            <Card key={group.id} className="premium-card">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>{group.name}</CardTitle>
                  <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono text-indigo-400">
                    {group.inviteCode}
                  </span>
                </div>
                <CardDescription>
                  {group.memberCount} {group.memberCount === 1 ? 'member' : 'members'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-surface-subtle border border-faint">
                    <span className="workspace-eyebrow block mb-1">Current streak</span>
                    <strong>{group.stats.currentStreak} days</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-subtle border border-faint">
                    <span className="workspace-eyebrow block mb-1">Total solved</span>
                    <strong>{group.stats.totalSolved}</strong>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end pt-4">
                <Link to={`/groups/${group.id}`}>
                  <Button variant="ghost" size="sm">
                    Open Group <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center border-dashed">
          <Users className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
          <h2 className="font-display font-bold text-lg">No groups yet</h2>
          <p className="text-sm text-text-secondary mt-2">
            Create your first group or join a friend's squad.
          </p>
        </Card>
      )}

      <Dialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Accountability Group"
        description="Launch a private squad room and invite friends."
      >
        <form
          onSubmit={createForm.handleSubmit((values) =>
            createMutation.mutate(values.name)
          )}
          className="space-y-4"
        >
          <Input
            placeholder="e.g. DSA Consistency Squad"
            error={!!createForm.formState.errors.name}
            {...createForm.register('name')}
          />
          {createForm.formState.errors.name && (
            <p className="text-xs text-accent-rose">
              {createForm.formState.errors.name.message}
            </p>
          )}
          <Button type="submit" className="w-full" isLoading={createMutation.isPending}>
            Create Group
          </Button>
        </form>
      </Dialog>

      <Dialog
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        title="Join Accountability Group"
        description="Enter the 6-character invite code shared by your squad."
      >
        <form
          onSubmit={joinForm.handleSubmit((values) =>
            joinMutation.mutate(values.inviteCode)
          )}
          className="space-y-4"
        >
          <Input
            placeholder="e.g. AX94QP"
            maxLength={6}
            className="uppercase font-mono tracking-widest text-center"
            error={!!joinForm.formState.errors.inviteCode}
            {...joinForm.register('inviteCode')}
          />
          {joinForm.formState.errors.inviteCode && (
            <p className="text-xs text-accent-rose">
              {joinForm.formState.errors.inviteCode.message}
            </p>
          )}
          <Button type="submit" className="w-full" isLoading={joinMutation.isPending}>
            Join Group
          </Button>
        </form>
      </Dialog>
    </div>
  );
}
