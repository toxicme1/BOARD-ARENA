import {
  AdminLayout,
  ChartCard,
  DataTable,
} from '../../components/admin';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';

interface Report {
  id: string;
  category: 'cheating' | 'toxicity' | 'spam' | 'bug' | 'exploit' | 'other';
  status: 'pending' | 'in_review' | 'resolved' | 'dismissed';
  priority: 'critical' | 'high' | 'medium' | 'low';
  reportedBy: string;
  reportedUser: string;
  matchId?: string;
  game: string;
  description: string;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  resolution?: string;
}

const mockReports: Report[] = [
  {
    id: 'RPT-20261106-001',
    category: 'cheating',
    status: 'in_review',
    priority: 'critical',
    reportedBy: 'Astraea',
    reportedUser: 'HexNode_9',
    matchId: '#BA-8919',
    game: 'Connect Four',
    description: 'Consistently making moves with 1.8ms latency — inhuman reaction time. Suspected engine/bot usage.',
    submittedAt: '2026-11-06 09:38:12',
    reviewedBy: 'ZeroCool',
  },
  {
    id: 'RPT-20261106-002',
    category: 'toxicity',
    status: 'pending',
    priority: 'high',
    reportedBy: 'NewPlayer_2026',
    reportedUser: 'ToxicPlayer_99',
    game: 'Chess Blitz',
    description: 'Excessive harassment in chat, racial slurs, and targeted abuse after losing.',
    submittedAt: '2026-11-06 09:35:44',
  },
  {
    id: 'RPT-20261106-003',
    category: 'exploit',
    status: 'resolved',
    priority: 'critical',
    reportedBy: 'GrandMaster_K',
    reportedUser: 'GlitchUser_42',
    matchId: '#BA-8912',
    game: 'Chess',
    description: 'Player exploited castling bug to move king 3 squares. Match rolled back, exploit patched.',
    submittedAt: '2026-11-06 08:12:03',
    reviewedBy: 'TournamentAdmin',
    reviewedAt: '2026-11-06 08:45:00',
    resolution: 'Account suspended 7 days. Match voided. Bug fixed in v2.4.10.',
  },
  {
    id: 'RPT-20261106-004',
    category: 'spam',
    status: 'dismissed',
    priority: 'low',
    reportedBy: 'ShadowKnight_99',
    reportedUser: 'SpamBot_001',
    game: 'LUDO',
    description: 'Spamming emotes and chat messages every turn.',
    submittedAt: '2026-11-06 07:55:20',
    reviewedBy: 'ZeroCool',
    reviewedAt: '2026-11-06 08:00:00',
    resolution: 'False positive — player was using quick-chat macros, not spam.',
  },
  {
    id: 'RPT-20261105-012',
    category: 'cheating',
    status: 'resolved',
    priority: 'high',
    reportedBy: 'Aegis_Tactics',
    reportedUser: 'BotMatrix_X',
    matchId: '#BA-8801',
    game: 'Chess Blitz',
    description: 'Auto-quarantined by neural anti-cheat v4.9 for 3.2ms inhuman move latency.',
    submittedAt: '2026-11-05 14:22:18',
    reviewedBy: 'System (Auto)',
    reviewedAt: '2026-11-05 14:22:19',
    resolution: 'Auto-banned. Account permanently banned for engine usage.',
  },
  {
    id: 'RPT-20261105-008',
    category: 'bug',
    status: 'in_review',
    priority: 'medium',
    reportedBy: 'HyperNova',
    reportedUser: 'System',
    game: 'Connect Six',
    description: 'Win detection failing on diagonal 6-in-a-row on boards larger than 15x15.',
    submittedAt: '2026-11-05 11:30:45',
  },
  {
    id: 'RPT-20261105-005',
    category: 'toxicity',
    status: 'pending',
    priority: 'medium',
    reportedBy: 'Valkyrie',
    reportedUser: 'RageQuitter_88',
    matchId: '#BA-8799',
    game: 'Checkers',
    description: 'Threatening messages after loss, doxxing attempt in DMs.',
    submittedAt: '2026-11-05 09:15:33',
  },
  {
    id: 'RPT-20261104-021',
    category: 'other',
    status: 'resolved',
    priority: 'low',
    reportedBy: 'TournamentAdmin',
    reportedUser: 'System',
    game: 'Platform',
    description: 'Leaderboard not updating correctly for Season 4 — ELO calculation bug.',
    submittedAt: '2026-11-04 16:45:00',
    reviewedBy: 'TournamentAdmin',
    reviewedAt: '2026-11-04 18:20:00',
    resolution: 'Fixed ELO recalculation cron job. Leaderboard refreshed.',
  },
];

const categoryConfig = {
  cheating: { label: 'Cheating', color: 'error' as const, icon: 'shield_off' },
  toxicity: { label: 'Toxicity', color: 'primary' as const, icon: 'report' },
  spam: { label: 'Spam', color: 'secondary' as const, icon: 'block' },
  bug: { label: 'Bug Report', color: 'tertiary' as const, icon: 'bug_report' },
  exploit: { label: 'Exploit', color: 'error' as const, icon: 'warning' },
  other: { label: 'Other', color: 'secondary' as const, icon: 'help' },
};

const statusConfig = {
  pending: { label: 'Pending', variant: 'secondary' as const, dotColor: 'secondary' as const },
  in_review: { label: 'In Review', variant: 'primary' as const, dotColor: 'primary' as const },
  resolved: { label: 'Resolved', variant: 'tertiary' as const, dotColor: 'tertiary' as const },
  dismissed: { label: 'Dismissed', variant: 'outline' as const, dotColor: 'secondary' as const },
};

const priorityConfig = {
  critical: { label: 'Critical', variant: 'error' as const },
  high: { label: 'High', variant: 'primary' as const },
  medium: { label: 'Medium', variant: 'tertiary' as const },
  low: { label: 'Low', variant: 'secondary' as const },
};

export default function ReportsScreen() {
  const columns = [
    {
      key: 'report',
      header: 'REPORT',
      width: '320px',
      render: (row: Report) => (
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={priorityConfig[row.priority].variant} size="sm" className="text-[10px]">
              {priorityConfig[row.priority].label}
            </Badge>
            <Badge
              variant="outline"
              size="sm"
              className="text-[10px]"
              style={{ borderColor: `var(--color-${categoryConfig[row.category].color})`, color: `var(--color-${categoryConfig[row.category].color})` }}
            >
              <span className="material-symbols-outlined text-[10px] mr-1">{categoryConfig[row.category].icon}</span>
              {categoryConfig[row.category].label}
            </Badge>
            <Badge
              variant={statusConfig[row.status].variant}
              dot
              dotColor={statusConfig[row.status].dotColor}
              size="sm"
              className="text-[10px]"
            >
              {statusConfig[row.status].label}
            </Badge>
          </div>
          <div className="text-xs text-on-surface-variant font-mono">{row.id}</div>
          <p className="text-xs text-on-surface-variant line-clamp-2 max-w-xs">{row.description}</p>
          <div className="flex items-center gap-2 text-[10px] font-mono text-on-surface-variant/70">
            <span>Game: <span className="text-on-surface">{row.game}</span></span>
            {row.matchId && <span>Match: <span className="text-primary">{row.matchId}</span></span>}
          </div>
        </div>
      ),
    },
    {
      key: 'reporter',
      header: 'REPORTER',
      width: '160px',
      render: (row: Report) => (
        <div className="flex flex-col min-w-0">
          <span className="font-mono text-xs font-bold text-on-surface truncate">{row.reportedBy}</span>
          <span className="text-[10px] text-on-surface-variant">reported</span>
          <span className="font-mono text-xs font-bold text-error truncate">{row.reportedUser}</span>
        </div>
      ),
    },
    {
      key: 'submitted',
      header: 'SUBMITTED',
      width: '160px',
      className: 'font-mono',
      render: (row: Report) => (
        <span className="text-on-surface-variant">{row.submittedAt}</span>
      ),
    },
    {
      key: 'review',
      header: 'REVIEWED',
      width: '180px',
      className: 'font-mono',
      render: (row: Report) => (
        <div className="flex flex-col min-w-0">
          {row.reviewedBy ? (
            <>
              <span className="text-on-surface-variant">{row.reviewedAt}</span>
              <span className="text-[10px] text-on-surface-variant/70">by {row.reviewedBy}</span>
            </>
          ) : (
            <span className="text-on-surface-variant/50">—</span>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'ACTIONS',
      width: '160px',
      className: 'text-right',
      render: (row: Report) => (
        <div className="flex items-center justify-end gap-2 shrink-0">
          {row.status === 'pending' ? (
            <>
              <Button variant="secondary" size="sm" className="px-3 py-1.5" aria-label={`Review ${row.id}`}>
                Review
              </Button>
              <Button variant="ghost" size="sm" className="text-error" aria-label={`Dismiss ${row.id}`}>
                Dismiss
              </Button>
            </>
          ) : row.status === 'in_review' ? (
            <>
              <Button variant="primary" size="sm" className="px-3 py-1.5" aria-label={`Resolve ${row.id}`}>
                Resolve
              </Button>
              <Button variant="ghost" size="sm" className="text-error" aria-label={`Dismiss ${row.id}`}>
                Dismiss
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" aria-label={`View ${row.id} details`}>
              <span className="material-symbols-outlined text-[16px]">visibility</span>
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
              <span>Console</span>
              <span className="text-outline">/</span>
              <span className="text-primary font-medium">Reports & Complaints</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface font-headline mt-1">Player Reports & Complaints</h1>
            <p className="text-xs text-on-surface-variant max-w-2xl mt-1">Review and resolve player-submitted reports. Categories: cheating, toxicity, spam, bugs, exploits.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-64 hidden sm:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 material-symbols-outlined text-[18px]">search</span>
              <Input
                placeholder="Search reports..."
                className="pl-10"
                aria-label="Search reports"
              />
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              Filters
            </Button>
            <Button variant="primary" size="sm" className="gap-1">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ChartCard title="Pending Review" subtitle="Awaiting moderator action" className="p-4">
            <div className="text-3xl font-extrabold text-on-surface font-headline text-primary">3</div>
            <div className="flex items-center gap-1 text-xs font-mono text-primary mt-1">
              <span className="material-symbols-outlined text-[15px]">schedule</span>
              Avg response: 2.4h
            </div>
          </ChartCard>
          <ChartCard title="In Review" subtitle="Currently investigating" className="p-4">
            <div className="text-3xl font-extrabold text-on-surface font-headline text-primary">2</div>
            <div className="flex items-center gap-1 text-xs font-mono text-primary mt-1">
              <span className="material-symbols-outlined text-[15px]">visibility</span>
              1 critical, 1 medium
            </div>
          </ChartCard>
          <ChartCard title="Resolved (24h)" subtitle="Actions taken today" className="p-4">
            <div className="text-3xl font-extrabold text-on-surface font-headline text-tertiary">14</div>
            <div className="flex items-center gap-1 text-xs font-mono text-tertiary mt-1">
              <span className="material-symbols-outlined text-[15px]">check_circle</span>
              3 bans, 2 warnings
            </div>
          </ChartCard>
          <ChartCard title="Dismissed (24h)" subtitle="False positives" className="p-4">
            <div className="text-3xl font-extrabold text-on-surface font-headline text-on-surface-variant">2</div>
            <div className="flex items-center gap-1 text-xs font-mono text-on-surface-variant mt-1">
              <span className="material-symbols-outlined text-[15px]">cancel</span>
              1 spam, 1 toxicity
            </div>
          </ChartCard>
        </div>

        {/* Reports Table */}
        <ChartCard
          title="All Reports"
          subtitle={`${mockReports.length} reports displayed`}
          className="flex flex-col"
        >
          <DataTable
            columns={columns}
            data={mockReports}
            keyExtractor={(row) => row.id}
            striped={true}
            hoverable={true}
          />
          <div className="pt-4 mt-2 flex justify-between items-center">
            <span className="text-xs text-on-surface-variant font-mono">Showing 8 of 247 reports (last 7 days)</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" disabled>
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </Button>
              <Button variant="ghost" size="sm" disabled>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Button>
            </div>
          </div>
        </ChartCard>
      </div>
    </AdminLayout>
  );
}