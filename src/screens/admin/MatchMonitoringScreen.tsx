import {
  AdminLayout,
  ChartCard,
  DataTable,
} from '../../components/admin';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';

interface Match {
  id: string;
  game: string;
  gameIcon: string;
  gameColor: string;
  status: 'matchmaking' | 'lobby' | 'live' | 'finished' | 'flagged';
  players: string;
  playerDetails: string;
  turn?: number;
  latency: string;
  anomalies: number;
  duration: string;
  server: string;
}

const mockMatches: Match[] = [
  {
    id: '#BA-8921',
    game: 'Chess Ranked 1v1',
    gameIcon: 'chess',
    gameColor: 'primary',
    status: 'live',
    players: 'GM Kael vs Astraea',
    playerDetails: 'GM Kael (2,680) vs Astraea (2,290)',
    turn: 34,
    latency: '12ms',
    anomalies: 0,
    duration: '18m 32s',
    server: 'EU-Central',
  },
  {
    id: '#BA-8920',
    game: 'LUDO 4-Way Free-For-All',
    gameIcon: 'casino',
    gameColor: 'tertiary',
    status: 'live',
    players: '4 Players',
    playerDetails: 'Valkyrie, HyperNova, ShadowHex, NovaPrime',
    latency: 'Synced',
    anomalies: 0,
    duration: '12m 08s',
    server: 'EU-Central',
  },
  {
    id: '#BA-8919',
    game: 'Connect Four',
    gameIcon: 'grid_4x4',
    gameColor: 'primary',
    status: 'flagged',
    players: 'HexNode_9 vs QuickDrop',
    playerDetails: 'HexNode_9 (1,850) vs QuickDrop (1,920)',
    turn: 18,
    latency: '1.8ms delta',
    anomalies: 1,
    duration: '6m 45s',
    server: 'US-East',
  },
  {
    id: '#BA-8918',
    game: 'Checkers 1v1',
    gameIcon: 'check_circle',
    gameColor: 'secondary',
    status: 'finished',
    players: 'ShadowKnight_99 vs CheckMate',
    playerDetails: 'ShadowKnight_99 (2,150) vs CheckMate (2,010)',
    latency: 'Archived',
    anomalies: 0,
    duration: '24m 11s',
    server: 'US-East',
  },
  {
    id: '#BA-8917',
    game: 'Chess Blitz 3+2',
    gameIcon: 'chess',
    gameColor: 'primary',
    status: 'lobby',
    players: 'Aegis_Tactics vs ZeroCool',
    playerDetails: 'Aegis_Tactics (2,080) vs ZeroCool (2,520)',
    latency: 'Ready',
    anomalies: 0,
    duration: '—',
    server: 'EU-Central',
  },
  {
    id: '#BA-8916',
    game: 'Tic-Tac-Toe Blitz',
    gameIcon: 'close',
    gameColor: 'primary',
    status: 'live',
    players: 'NewPlayer_2026 vs BotTest_01',
    playerDetails: 'NewPlayer_2026 (1,000) vs BotTest_01 (1,100)',
    turn: 3,
    latency: '45ms',
    anomalies: 0,
    duration: '1m 12s',
    server: 'US-East',
  },
  {
    id: '#BA-8915',
    game: 'Connect Six Gomoku',
    gameIcon: 'hexagon',
    gameColor: 'primary',
    status: 'matchmaking',
    players: 'Waiting for opponent...',
    playerDetails: 'GrandMaster_K searching...',
    latency: 'Searching',
    anomalies: 0,
    duration: '—',
    server: 'EU-Central',
  },
  {
    id: '#BA-8914',
    game: 'LUDO 2v2 Teams',
    gameIcon: 'casino',
    gameColor: 'tertiary',
    status: 'live',
    players: 'Team Alpha vs Team Beta',
    playerDetails: '4 players, 2 per team',
    latency: '8ms',
    anomalies: 0,
    duration: '31m 22s',
    server: 'EU-Central',
  },
];

const statusConfig = {
  matchmaking: { label: 'Matchmaking', variant: 'secondary' as const, dotColor: 'secondary' as const },
  lobby: { label: 'Lobby', variant: 'primary' as const, dotColor: 'primary' as const },
  live: { label: 'Live', variant: 'tertiary' as const, dotColor: 'tertiary' as const },
  finished: { label: 'Finished', variant: 'secondary' as const, dotColor: 'secondary' as const },
  flagged: { label: 'Flagged', variant: 'error' as const, dotColor: 'error' as const },
};

export default function MatchMonitoringScreen() {
  const columns = [
    {
      key: 'match',
      header: 'MATCH',
      width: '200px',
      render: (row: Match) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className={`p-2 rounded bg-surface-container-highest text-${row.gameColor} shrink-0`}>
            <span className="material-symbols-outlined text-[18px]">{row.gameIcon}</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-on-surface">{row.id}</span>
              <span className="text-xs text-on-surface-variant">{row.game}</span>
              <Badge
                variant={statusConfig[row.status].variant}
                dot
                dotColor={statusConfig[row.status].dotColor}
                size="sm"
              >
                {statusConfig[row.status].label}
              </Badge>
            </div>
            <div className="text-xs text-on-surface-variant truncate mt-0.5">{row.playerDetails}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'turn',
      header: 'TURN',
      width: '80px',
      className: 'font-mono tabular-nums',
      render: (row: Match) => (
        <span className={row.turn ? 'text-on-surface' : 'text-on-surface-variant/50'}>
          {row.turn ? `Turn ${row.turn}` : '—'}
        </span>
      ),
    },
    {
      key: 'latency',
      header: 'LATENCY',
      width: '110px',
      className: 'font-mono',
      render: (row: Match) => (
        <span className={row.latency.includes('ms') && !row.latency.includes('delta') ? 'text-tertiary' : 'text-on-surface-variant'}>
          {row.latency}
        </span>
      ),
    },
    {
      key: 'anomalies',
      header: 'ANOMALIES',
      width: '100px',
      render: (row: Match) => (
        <Badge
          variant={row.anomalies > 0 ? 'error' : 'tertiary'}
          dot
          dotColor={row.anomalies > 0 ? 'error' : 'tertiary'}
          size="sm"
        >
          {row.anomalies}
        </Badge>
      ),
    },
    {
      key: 'duration',
      header: 'DURATION',
      width: '100px',
      className: 'font-mono',
      render: (row: Match) => (
        <span className="text-on-surface-variant">{row.duration}</span>
      ),
    },
    {
      key: 'server',
      header: 'SERVER',
      width: '110px',
      render: (row: Match) => (
        <span className="text-xs font-mono text-on-surface-variant">{row.server}</span>
      ),
    },
    {
      key: 'actions',
      header: 'ACTIONS',
      width: '200px',
      className: 'text-right',
      render: (row: Match) => (
        <div className="flex items-center justify-end gap-2 shrink-0">
          {row.status === 'live' || row.status === 'lobby' ? (
            <>
              <Button variant="secondary" size="sm" className="px-3 py-1.5" aria-label={`Inspect ${row.id}`}>
                <span className="material-symbols-outlined text-[14px] mr-1">visibility</span>
                Inspect
              </Button>
              <Button variant="secondary" size="sm" className="px-3 py-1.5" aria-label={`Spectate ${row.id}`}>
                <span className="material-symbols-outlined text-[14px] mr-1">play_circle</span>
                Spectate
              </Button>
            </>
          ) : row.status === 'flagged' ? (
            <>
              <Button variant="secondary" size="sm" className="px-2.5 py-1.5 text-error bg-error hover:bg-error/90 text-on-error" aria-label={`Pause & Review ${row.id}`}>
                Pause & Review
              </Button>
              <Button variant="secondary" size="sm" className="px-2.5 py-1.5" aria-label={`Auto-Audit ${row.id}`}>
                Auto-Audit
              </Button>
            </>
          ) : (
            <span className="text-[11px] font-mono text-on-surface-variant">Archived</span>
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
              <span className="text-primary font-medium">Match Monitoring</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface font-headline mt-1">Live Match Monitoring & Flags</h1>
            <p className="text-xs text-on-surface-variant max-w-2xl mt-1">Active turn arbitration and packet integrity monitor across all game clusters.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-64 hidden sm:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 material-symbols-outlined text-[18px]">search</span>
              <Input
                placeholder="Search matches..."
                className="pl-10"
                aria-label="Search matches"
              />
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              Filter
            </Button>
            <Button variant="primary" size="sm" className="gap-1">
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              Open Full Monitor
            </Button>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ChartCard title="Active Matches" subtitle="Currently running" className="p-4">
            <div className="text-3xl font-extrabold text-on-surface font-headline">4,120</div>
            <div className="flex items-center gap-1 text-xs font-mono text-tertiary mt-1">
              <span className="material-symbols-outlined text-[15px]">sensors</span>
              18ms AVG
            </div>
          </ChartCard>
          <ChartCard title="Concurrent Duels" subtitle="Players in matches" className="p-4">
            <div className="text-3xl font-extrabold text-on-surface font-headline text-tertiary">8,240</div>
            <div className="flex items-center gap-1 text-xs font-mono text-tertiary mt-1">
              <span className="material-symbols-outlined text-[15px]">sports_esports</span>
              Peak 28,450
            </div>
          </ChartCard>
          <ChartCard title="Flagged" subtitle="Requires review" className="p-4">
            <div className="text-3xl font-extrabold text-on-surface font-headline text-error">1</div>
            <div className="flex items-center gap-1 text-xs font-mono text-error mt-1">
              <span className="material-symbols-outlined text-[15px]">warning</span>
              Suspected bot activity
            </div>
          </ChartCard>
          <ChartCard title="Dropped Packets" subtitle="Network integrity" className="p-4">
            <div className="text-3xl font-extrabold text-on-surface font-headline text-tertiary">0</div>
            <div className="flex items-center gap-1 text-xs font-mono text-tertiary mt-1">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              P99: 24.1ms
            </div>
          </ChartCard>
        </div>

        {/* Match Table */}
        <ChartCard
          title="Active Matches"
          subtitle={`${mockMatches.length} matches displayed — showing all states`}
          className="flex flex-col"
        >
          <DataTable
            columns={columns}
            data={mockMatches}
            keyExtractor={(row) => row.id}
            striped={true}
            hoverable={true}
          />
          <div className="pt-4 mt-2 flex justify-between items-center">
            <span className="text-xs text-on-surface-variant font-mono">Showing 8 of 4,120 matches</span>
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