import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, Swords, Users, Zap } from 'lucide-react';
import { apiClient } from '../../services/api/api.client';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import { Skeleton } from '../../components/ui/Skeleton';

interface GroupItem {
  id: string;
  name: string;
  memberCount: number;
}

export default function Challenges() {
  const { data: groups, isLoading } = useQuery<GroupItem[]>({
    queryKey: ['userGroups'],
    queryFn: () => apiClient.get<GroupItem[]>('/api/groups'),
  });

  return (
    <div className="space-y-8 text-left">
      <div className="profile-hero p-6 md:p-8">
        <div className="relative z-10">
          <p className="workspace-eyebrow flex items-center gap-1.5 mb-2">
            <Zap className="w-3 h-3 text-indigo-400" /> Daily Practice
          </p>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl page-title-gradient">
            Group Challenges
          </h1>
          <p className="text-sm text-text-secondary mt-2">
            Choose a group to post, solve, or review its daily challenge.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
        </div>
      ) : groups?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {groups.map((group) => (
            <Card key={group.id} className="premium-card">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Swords className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle>{group.name}</CardTitle>
                    <CardDescription className="mt-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {group.memberCount} members
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="justify-end pt-4">
                <Link to={`/groups/${group.id}`}>
                  <Button size="sm">
                    Manage Challenge <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center border-dashed">
          <Swords className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
          <h2 className="font-display font-bold text-lg">Join a group first</h2>
          <p className="text-sm text-text-secondary mt-2 mb-5">
            Challenges belong to groups, so create or join a squad to continue.
          </p>
          <Link to="/groups">
            <Button>Go to Groups</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
