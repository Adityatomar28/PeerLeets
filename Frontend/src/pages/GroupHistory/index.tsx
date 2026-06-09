import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, ExternalLink, FileText } from 'lucide-react';
import { apiClient } from '../../services/api/api.client';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';

interface HistorySubmission {
  id: string;
  userId: string;
  solvedAt: string;
  timeTaken: number | null;
  user: {
    name: string;
  };
}

interface HistoryItem {
  id: string;
  date: string;
  problemLink: string | null;
  status: 'WAITING' | 'ACTIVE' | 'CLOSED';
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    name: string;
    email: string;
  } | null;
  submissions: HistorySubmission[];
}

interface GroupDetails {
  id: string;
  name: string;
  inviteCode: string;
  members: any[];
}

// Helper to parse problemLink which might be serialized JSON
function parseProblemLink(link: string | null) {
  if (!link) return { url: '', difficulty: 'Medium', notes: '' };
  try {
    if (link.startsWith('{')) {
      const parsed = JSON.parse(link);
      return {
        url: parsed.url || '',
        difficulty: parsed.difficulty || 'Medium',
        notes: parsed.notes || ''
      };
    }
  } catch (e) {
    // Ignore and fallback
  }
  return {
    url: link,
    difficulty: 'Medium',
    notes: ''
  };
}

export default function GroupHistoryPage() {
  const { groupId } = useParams<{ groupId: string }>();

  // Fetch group details to get total member count
  const { data: group } = useQuery<GroupDetails>({
    queryKey: ['groupDetails', groupId],
    queryFn: () => apiClient.get<GroupDetails>(`/api/groups/${groupId}`),
    enabled: !!groupId,
  });

  // Fetch full challenge history
  const { data: history, isLoading } = useQuery<HistoryItem[]>({
    queryKey: ['groupHistoryFull', groupId],
    queryFn: () => apiClient.get<HistoryItem[]>(`/api/groups/${groupId}/challenges/history`),
    enabled: !!groupId,
  });

  const totalMembers = group?.members.length || 1;

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <div className="flex items-center gap-3">
          <Skeleton className="w-24 h-8" />
        </div>
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto">
      {/* Back to Room Button */}
      <div>
        <Link to={`/groups/${groupId}`}>
          <Button variant="ghost" size="sm" className="gap-2 text-text-secondary hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Group Room
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-border-subtle pb-6">
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white">Challenge Registry Registry</h1>
        <p className="font-sans text-xs md:text-sm text-text-secondary mt-1">
          Historical record of daily tasks and squad completions for <strong className="text-white">{group?.name || 'your group'}</strong>
        </p>
      </div>

      {/* Empty State */}
      {!history || history.length === 0 ? (
        <Card className="bg-background-surface border-border-subtle p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-text-muted" />
          </div>
          <h3 className="font-display font-extrabold text-base text-white mb-2">No Past Challenges</h3>
          <p className="font-sans text-xs text-text-secondary mb-6 leading-relaxed">
            There are no past challenges recorded in this group yet. Daily challenges will appear here once they are closed.
          </p>
          <Link to={`/groups/${groupId}`}>
            <Button size="sm">Go to Room</Button>
          </Link>
        </Card>
      ) : (
        /* History Registry Table */
        <Card className="bg-background-surface border-border-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#121620]/60 border-b border-border-subtle font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">DSA Problem Task</th>
                  <th className="px-6 py-4">Difficulty</th>
                  <th className="px-6 py-4">First Solver</th>
                  <th className="px-6 py-4 text-center">Solvers</th>
                  <th className="px-6 py-4 text-right">Completion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/40 text-xs">
                {history.map((item) => {
                  const { url, difficulty, notes } = parseProblemLink(item.problemLink);
                  const totalSolvers = item.submissions.length;
                  const firstSub = item.submissions[0];
                  const completionPercentage = Math.round((totalSolvers / totalMembers) * 100);

                  return (
                    <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                      {/* Date */}
                      <td className="px-6 py-4.5 whitespace-nowrap font-mono text-text-secondary">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-text-muted" />
                          <span>{new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </td>

                      {/* Problem Title & URL */}
                      <td className="px-6 py-4.5 max-w-[240px]">
                        {url ? (
                          <div className="space-y-1">
                            <a
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-accent-indigo hover:text-white flex items-center gap-1 hover:underline truncate"
                            >
                              <span>LeetCode Coding Task</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                            {notes && (
                              <p className="text-[10px] text-text-secondary truncate italic">
                                Note: {notes}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-text-muted italic">Slot Not Activated</span>
                        )}
                      </td>

                      {/* Difficulty */}
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          difficulty.toLowerCase() === 'easy'
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-accent-emerald'
                            : difficulty.toLowerCase() === 'hard'
                            ? 'bg-accent-rose/10 border border-accent-rose/20 text-accent-rose'
                            : 'bg-amber-500/10 border border-amber-500/20 text-accent-amber'
                        }`}>
                          {difficulty}
                        </span>
                      </td>

                      {/* First Solver */}
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        {firstSub ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-[9px] text-accent-amber uppercase shrink-0">
                              {firstSub.user.name[0]}
                            </div>
                            <span className="text-white font-medium truncate max-w-[120px]">{firstSub.user.name}</span>
                            <span className="text-[10px] text-text-secondary font-mono shrink-0">
                              ({firstSub.timeTaken ? `${Math.round(firstSub.timeTaken / 60)}m` : 'solved'})
                            </span>
                          </div>
                        ) : (
                          <span className="text-text-muted italic font-mono">-</span>
                        )}
                      </td>

                      {/* Solvers count */}
                      <td className="px-6 py-4.5 whitespace-nowrap text-center font-mono font-bold text-white">
                        {totalSolvers} / {totalMembers}
                      </td>

                      {/* Completion Bar */}
                      <td className="px-6 py-4.5 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-3">
                          <span className="font-mono font-bold text-white shrink-0">{completionPercentage}%</span>
                          <div className="w-16 h-1.5 rounded-full bg-white/[0.04] overflow-hidden shrink-0 hidden sm:block">
                            <div
                              className={`h-full rounded-full ${
                                completionPercentage >= 80
                                  ? 'bg-accent-emerald'
                                  : completionPercentage >= 40
                                  ? 'bg-accent-indigo'
                                  : 'bg-accent-rose'
                              }`}
                              style={{ width: `${completionPercentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
