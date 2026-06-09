import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, ExternalLink, FileText, Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { apiClient } from '../../services/api/api.client';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
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

// Helper to parse problemLink
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
  } catch (e) {}
  return {
    url: link,
    difficulty: 'Medium',
    notes: ''
  };
}

function getProblemTitleFromUrl(url: string) {
  try {
    const match = url.match(/\/problems\/([a-zA-Z0-9-]+)/);
    if (match && match[1]) {
      return match[1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  } catch (e) {}
  return 'Algorithmic DSA Challenge';
}

export default function GroupHistoryPage() {
  const { groupId } = useParams<{ groupId: string }>();

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch group details
  const { data: group } = useQuery<GroupDetails>({
    queryKey: ['groupDetails', groupId],
    queryFn: () => apiClient.get<GroupDetails>(`/api/groups/${groupId}`),
    enabled: !!groupId,
  });

  // Fetch challenge history
  const { data: history, isLoading } = useQuery<HistoryItem[]>({
    queryKey: ['groupHistoryFull', groupId],
    queryFn: () => apiClient.get<HistoryItem[]>(`/api/groups/${groupId}/challenges/history`),
    enabled: !!groupId,
  });

  const totalMembers = group?.members.length || 1;

  // Process filters
  const filteredHistory = useMemo(() => {
    if (!history) return [];

    return history.filter((item) => {
      const { url, difficulty } = parseProblemLink(item.problemLink);
      const title = url ? getProblemTitleFromUrl(url).toLowerCase() : 'slot not activated';

      // 1. Search term match
      const matchesSearch = title.includes(searchTerm.toLowerCase()) || 
        (item.creator?.name || '').toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Difficulty match
      const matchesDifficulty = difficultyFilter === 'All' || 
        difficulty.toLowerCase() === difficultyFilter.toLowerCase();

      return matchesSearch && matchesDifficulty;
    });
  }, [history, searchTerm, difficultyFilter]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredHistory.length / itemsPerPage));
  const paginatedHistory = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredHistory.slice(start, start + itemsPerPage);
  }, [filteredHistory, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <div>
          <Skeleton className="w-24 h-8" />
        </div>
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left max-w-6xl mx-auto">
      {/* Back to Room */}
      <div>
        <Link to={`/groups/${groupId}`}>
          <Button variant="ghost" size="sm" className="gap-2 text-text-secondary hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Group Room
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-border-subtle pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white">Challenge Registry</h1>
          <p className="font-sans text-xs md:text-sm text-text-secondary mt-1">
            Historical records and completions for <strong className="text-white">{group?.name || 'your group'}</strong>
          </p>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input
            type="text"
            placeholder="Search problems or creators..."
            className="pl-10 text-xs"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset to page 1
            }}
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
          <SlidersHorizontal className="w-4 h-4 text-text-muted hidden sm:block" />
          <select
            className="h-11 bg-background-surface border border-border-subtle rounded-xl px-4 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors w-full sm:w-40"
            value={difficultyFilter}
            onChange={(e) => {
              setDifficultyFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 ? (
        <Card className="bg-background-surface border-border-subtle p-16 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-text-muted" />
          </div>
          <h3 className="font-display font-extrabold text-base text-white mb-2">No Challenges Found</h3>
          <p className="font-sans text-xs text-text-secondary mb-4 leading-relaxed">
            We couldn't find any historical records matching your filters.
          </p>
        </Card>
      ) : (
        /* Registry Table */
        <Card className="bg-background-surface border-border-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#121620]/60 border-b border-border-subtle font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">DSA Problem</th>
                  <th className="px-6 py-4">Difficulty</th>
                  <th className="px-6 py-4">First Solver</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Solvers</th>
                  <th className="px-6 py-4 text-right">Completion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/40 text-xs">
                {paginatedHistory.map((item) => {
                  const { url, difficulty, notes } = parseProblemLink(item.problemLink);
                  const title = url ? getProblemTitleFromUrl(url) : 'Slot Not Activated';
                  const totalSolvers = item.submissions.length;
                  const firstSub = item.submissions[0];
                  const completionPercentage = Math.round((totalSolvers / totalMembers) * 100);

                  return (
                    <tr key={item.id} className="hover:bg-white/[0.005] transition-colors">
                      {/* Date */}
                      <td className="px-6 py-4.5 whitespace-nowrap font-mono text-text-secondary">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-text-muted" />
                          <span>{new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </td>

                      {/* Problem Link */}
                      <td className="px-6 py-4.5 max-w-[200px] truncate">
                        {url ? (
                          <div className="space-y-0.5">
                            <a
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="font-bold text-accent-indigo hover:text-white flex items-center gap-1 hover:underline truncate"
                            >
                              <span>{title}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </a>
                            {notes && <p className="text-[10px] text-text-secondary italic truncate">"{notes}"</p>}
                          </div>
                        ) : (
                          <span className="text-text-muted italic">Slot Not Activated</span>
                        )}
                      </td>

                      {/* Difficulty */}
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        {url ? (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            difficulty.toLowerCase() === 'easy'
                              ? 'bg-emerald-500/10 border border-emerald-500/20 text-accent-emerald'
                              : difficulty.toLowerCase() === 'hard'
                              ? 'bg-accent-rose/10 border border-accent-rose/20 text-accent-rose'
                              : 'bg-amber-500/10 border border-amber-500/20 text-accent-amber'
                          }`}>
                            {difficulty}
                          </span>
                        ) : (
                          <span className="text-text-muted">-</span>
                        )}
                      </td>

                      {/* First Solver */}
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        {firstSub ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-[9px] text-accent-amber uppercase shrink-0">
                              {firstSub.user.name[0]}
                            </div>
                            <span className="text-white font-medium truncate max-w-[100px]">{firstSub.user.name}</span>
                          </div>
                        ) : (
                          <span className="text-text-muted italic font-mono">-</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4.5 whitespace-nowrap text-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          item.status === 'ACTIVE'
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-accent-emerald'
                            : item.status === 'CLOSED'
                            ? 'bg-accent-rose/10 border border-accent-rose/20 text-accent-rose'
                            : 'bg-amber-500/10 border border-amber-500/20 text-accent-amber'
                        }`}>
                          {item.status}
                        </span>
                      </td>

                      {/* Solvers count */}
                      <td className="px-6 py-4.5 whitespace-nowrap text-center font-mono font-bold text-white">
                        {totalSolvers} / {totalMembers}
                      </td>

                      {/* Completion bar */}
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-[#121620]/30 border-t border-border-subtle flex items-center justify-between">
              <span className="text-xs text-text-secondary font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
