import {
  AdminLayout,
  MetricCard,
  ChartCard,
  DataTable,
  ProgressBars,
  Sparkline,
} from '../../components/admin';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function AdminDashboardScreen() {
  // KPI Data
  const kpiData = [
    {
      title: 'Total Registered Users',
      value: '482,910',
      icon: <span className="material-symbols-outlined text-[20px]">group_add</span>,
      iconColor: 'primary' as const,
      trend: { value: '+12.4%', label: '+3,420 new today', positive: true },
      sparkline: (
        <Sparkline
          data={[22, 18, 20, 10, 12, 2]}
          color="tertiary"
          height={25}
          width={100}
        />
      ),
    },
    {
      title: 'Active Online Players',
      value: '21,910',
      icon: <span className="material-symbols-outlined text-[20px]">sports_esports</span>,
      iconColor: 'tertiary' as const,
      trend: { value: '94.2% Verified', label: 'Peak 28,450 (+8.1%)', positive: true },
      sparkline: (
        <Sparkline
          data={[20, 15, 18, 6, 9, 3]}
          color="primary"
          height={25}
          width={100}
        />
      ),
    },
    {
      title: 'Total Matches Played',
      value: '3,842,109',
      icon: <span className="material-symbols-outlined text-[20px]">military_tech</span>,
      iconColor: 'purple' as const,
      trend: { value: '+142,800', label: 'Across 6 game modes', positive: true },
      sparkline: (
        <Sparkline
          data={[24, 20, 15, 10, 5, 4]}
          color="purple"
          height={25}
          width={100}
        />
      ),
    },
    {
      title: 'Live Running Matches',
      value: '4,120',
      icon: <span className="material-symbols-outlined text-[20px]">sensors</span>,
      iconColor: 'tertiary' as const,
      trend: { value: '8,240', label: 'Concurrent duels', positive: false },
      subLabel: '18ms AVG',
      sparkline: (
        <Sparkline
          data={[18, 22, 14, 8, 11, 3]}
          color="tertiary"
          height={25}
          width={100}
        />
      ),
    },
  ];

  // Game Discipline Popularity
  const gamePopularity = [
    { label: 'Chess (8x8 FIDE)', value: 38, max: 100, subLabel: '8,420 pl. / 1,640 matches', color: 'primary' as const },
    { label: 'LUDO (4-Player)', value: 24, max: 100, subLabel: '5,110 pl. / 780 matches', color: 'tertiary' as const },
    { label: 'Connect Four', value: 15, max: 100, subLabel: '3,210 pl. / 910 matches', color: 'purple' as const },
    { label: 'Checkers', value: 11, max: 100, subLabel: '2,340 pl. / 420 matches', color: 'secondary' as const },
    { label: 'Tic-Tac-Toe Blitz', value: 8, max: 100, subLabel: '1,890 pl. / 240 matches', color: 'secondary' as const },
    { label: 'Connect Six Gomoku', value: 4, max: 100, subLabel: '940 pl. / 130 matches', color: 'secondary' as const },
  ];

  // Live Match Monitoring Data
  const liveMatches = [
    {
      id: '#BA-8921',
      game: 'Chess Ranked 1v1',
      status: 'Turn 34',
      players: 'GM Kael vs Astraea',
      latency: '12ms',
      anomalies: 0,
      gameIcon: 'chess',
      gameColor: 'primary',
      flagged: false,
    },
    {
      id: '#BA-8920',
      game: 'LUDO 4-Way Free-For-All',
      status: 'Active',
      players: '3/4 Players active • Round 8',
      latency: 'Synced',
      anomalies: 0,
      gameIcon: 'casino',
      gameColor: 'tertiary',
      flagged: false,
    },
    {
      id: '#BA-8919',
      game: 'Connect Four',
      status: 'SUSPECTED BOT',
      players: 'HexNode_9',
      latency: '1.8ms delta',
      anomalies: 1,
      gameIcon: 'grid_4x4',
      gameColor: 'primary',
      flagged: true,
    },
    {
      id: '#BA-8918',
      game: 'Checkers 1v1',
      status: 'Finished',
      players: 'ShadowKnight_99 (42 moves)',
      latency: 'Archived',
      anomalies: 0,
      gameIcon: 'check_circle',
      gameColor: 'secondary',
      flagged: false,
    },
  ];

  const matchStatusConfig = {
    'Turn 34': { label: 'Turn 34', variant: 'tertiary' as const, dotColor: 'tertiary' as const },
    'Active': { label: 'Active', variant: 'tertiary' as const, dotColor: 'tertiary' as const },
    'SUSPECTED BOT': { label: 'SUSPECTED BOT', variant: 'error' as const, dotColor: 'error' as const },
    'Finished': { label: 'Finished', variant: 'secondary' as const, dotColor: 'secondary' as const },
  };

  // System Nodes
  const systemNodes = [
    { name: 'Node US-East', role: 'Primary Auth & MMR', status: '100% OP', latency: '14ms latency', icon: 'dns', color: 'tertiary' },
    { name: 'Node EU-Central', role: 'Game Socket Cluster', status: '99.9% OP', latency: '22ms latency', icon: 'dns', color: 'tertiary' },
    { name: 'Neural Anti-Cheat v4.9', role: '0 FP in 6h', status: 'ACTIVE', latency: '14 Quarantined', icon: 'shield', color: 'primary' },
    { name: 'Arbitrator Sync', role: 'Deterministic Tick', status: '64Hz LOCK', latency: '0.002s jitter', icon: 'sync', color: 'tertiary' },
  ];

  // Audit Log
  const auditLogs = [
    { time: '[09:38:12]', type: 'SEC_AUTO_BAN', message: "Auto-quarantined user <strong>'BotMatrix_X'</strong> for 3.2ms inhuman move latency in Blitz.", color: 'error' },
    { time: '[09:32:44]', type: 'SYS_ADMIN', message: 'Admin Vance promoted Season IV Ranked leaderboard prize pool.', color: 'primary' },
    { time: '[09:15:00]', type: 'CRON_JOB', message: 'US-East server cluster completed automated snapshot backup #19802.', color: 'tertiary' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
              <span>Console</span>
              <span className="text-outline">/</span>
              <span className="text-primary font-medium">Dashboard</span>
              <span className="px-2 py-0.5 ml-2 rounded bg-surface-container-highest text-primary-fixed-dim text-[10px] uppercase font-bold tracking-wider">Live Telemetry</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface font-headline flex items-center gap-3">
              Platform Overview & Telemetry
            </h1>
            <p className="text-xs text-on-surface-variant max-w-2xl">
              Real-time competitive engine status, user acquisition curves, and live multiplayer throughput across global game clusters.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container shadow-sm text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
              </span>
              <span className="text-on-surface font-medium">Live Feed</span>
              <span className="text-tertiary font-semibold text-[11px]">(Auto 5s)</span>
            </div>
            <Button variant="secondary" size="sm" className="hidden sm:flex">
              <span className="material-symbols-outlined text-[18px] mr-2">download</span>
              Export Telemetry CSV
            </Button>
            <Button variant="primary" size="sm" className="gap-2">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              Sync All Shards
            </Button>
          </div>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {kpiData.map((kpi, index) => (
            <MetricCard key={index} {...kpi} />
          ))}
        </div>

        {/* Middle Analytics Row */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: Concurrency & Match Activity */}
          <ChartCard
            title="Player Concurrency & Match Activity"
            subtitle="Real-time throughput metrics across matchmaking pools"
            icon={<span className="material-symbols-outlined text-[18px]">pie_chart</span>}
            className="xl:col-span-8"
            badge={
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-on-surface-variant">Ranked Queue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                  <span className="text-on-surface-variant">Casual Sparring</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                  <span className="text-on-surface-variant">Private Lobbies</span>
                </div>
              </div>
            }
          >
            <div className="relative w-full h-72 flex flex-col justify-between py-2">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="w-full h-px bg-outline" />
                <div className="w-full h-px bg-outline" />
                <div className="w-full h-px bg-outline" />
                <div className="w-full h-px bg-outline" />
                <div className="w-full h-px bg-outline" />
              </div>
              <svg className="w-full h-56 overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 200">
                <defs>
                  <linearGradient id="primaryGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="tertiaryGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <polygon fill="url(#primaryGradient)" points="0,170 80,150 160,160 240,130 320,110 400,120 480,85 560,70 640,30 720,55 800,45 800,200 0,200" />
                <polygon fill="url(#tertiaryGradient)" points="0,185 80,175 160,180 240,165 320,150 400,155 480,130 560,115 640,95 720,110 800,105 800,200 0,200" />
                <path d="M0,195 Q80,190 160,192 T320,180 T480,170 T640,155 T800,160" fill="none" stroke="#71717a" strokeDasharray="4,4" strokeWidth="1.5" />
                <path d="M0,185 L80,175 L160,180 L240,165 L320,150 L400,155 L480,130 L560,115 L640,95 L720,110 L800,105" fill="none" stroke="#34d399" strokeLinecap="round" strokeWidth="2.5" />
                <path d="M0,170 L80,150 L160,160 L240,130 L320,110 L400,120 L480,85 L560,70 L640,30 L720,55 L800,45" fill="none" stroke="#a78bfa" strokeLinecap="round" strokeWidth="3" />
                <circle cx="640" cy="30" fill="#a78bfa" r="5" stroke="#09090b" strokeWidth="2" />
                <line opacity="0.6" stroke="#a78bfa" strokeDasharray="2,2" strokeWidth="1" x1="640" x2="640" y1="30" y2="200" />
              </svg>
              <div className="flex justify-between items-center text-[10px] font-mono text-on-surface-variant pt-2">
                <span>00:00</span>
                <span>04:00</span>
                <span>08:00</span>
                <span>12:00</span>
                <span>16:00</span>
                <span className="text-primary font-bold">20:00 [PEAK]</span>
                <span>23:59</span>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                <span className="text-on-surface">Peak Concurrency recorded at <strong className="text-primary font-mono font-semibold">20:00 UTC</strong> with <strong className="text-on-surface font-mono">28,450 players</strong>.</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-tertiary">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                  0 Dropped Match Packets
                </span>
                <span className="text-on-surface-variant">P99: 24.1ms</span>
              </div>
            </div>
          </ChartCard>

          {/* Right Card: Game Discipline Popularity */}
          <ChartCard
            title="Discipline Popularity"
            subtitle="Live quota split across 6 active games"
            icon={<span className="material-symbols-outlined text-[18px]">pie_chart</span>}
            className="xl:col-span-4"
          >
            <ProgressBars items={gamePopularity} />
            <div className="pt-6 mt-4">
              <div className="p-3.5 rounded-lg bg-surface-container-low flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono uppercase text-on-surface-variant">Aggregate Server Utilization</span>
                  <span className="text-sm font-bold text-on-surface font-mono">42.8% of Shard Capacity</span>
                </div>
                <Badge variant="tertiary" size="sm" className="text-[11px] font-mono font-bold">HEALTHY</Badge>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Bottom Operational Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left Card: Live Match Monitoring */}
          <ChartCard
            title="Live Match Monitoring & Flags"
            subtitle="Active turn arbitration and packet integrity monitor"
            badge={<Badge variant="error" size="sm" className="font-semibold">1 FLAGGED</Badge>}
            className="flex flex-col"
          >
            <DataTable
              columns={[
                { key: 'game', header: 'GAME', width: '120px', render: (row) => (
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded bg-surface-container-highest text-${row.gameColor} shrink-0`}>
                      <span className="material-symbols-outlined text-[18px]">{row.gameIcon}</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-on-surface">{row.id}</span>
                        <span className="text-xs text-on-surface-variant">{row.game}</span>
                        <Badge variant={matchStatusConfig[row.status as keyof typeof matchStatusConfig]?.variant || 'tertiary'} size="sm" className="text-[10px] font-mono">
                          {row.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-on-surface-variant truncate mt-0.5">{row.players}</div>
                    </div>
                  </div>
                ) },
                { key: 'latency', header: 'LATENCY', width: '100px', render: (row) => (
                  <span className="text-xs font-mono text-on-surface-variant">{row.latency}</span>
                ) },
                { key: 'anomalies', header: 'ANOMALIES', width: '100px', render: (row) => (
                  <Badge variant={row.anomalies > 0 ? 'error' : 'tertiary'} size="sm" dot dotColor={row.anomalies > 0 ? 'error' : 'tertiary'}>
                    {row.anomalies}
                  </Badge>
                ) },
                { key: 'actions', header: '', width: '160px', className: 'text-right', render: (row) => (
                  <div className="flex items-center justify-end gap-2 shrink-0">
                    {row.flagged ? (
                      <>
                        <Button variant="secondary" size="sm" className="px-3 py-1.5">
                          <span className="material-symbols-outlined text-[14px] mr-1">visibility</span>
                          Inspect Board
                        </Button>
                        <Button variant="primary" size="sm" className="px-2.5 py-1.5 text-error bg-error text-on-error">
                          Pause & Review
                        </Button>
                        <Button variant="secondary" size="sm" className="px-2.5 py-1.5">
                          Auto-Audit
                        </Button>
                      </>
                    ) : (
                      <Button variant="secondary" size="sm" className="px-3 py-1.5">
                        <span className="material-symbols-outlined text-[14px] mr-1">{row.game === 'LUDO 4-Way Free-For-All' ? 'play_circle' : 'visibility'}</span>
                        {row.game === 'LUDO 4-Way Free-For-All' ? 'Spectate' : 'Inspect Board'}
                      </Button>
                    )}
                  </div>
                ) },
              ]}
              data={liveMatches}
              keyExtractor={(row) => row.id}
              striped={true}
              hoverable={true}
            />
            <div className="pt-5 mt-2 flex justify-between items-center">
              <span className="text-xs text-on-surface-variant font-mono">Showing 4 of 4,120 matches</span>
              <Button variant="ghost" size="sm" className="gap-1">
                Open Full Match Monitor
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Button>
            </div>
          </ChartCard>

          {/* Right Card: System Infrastructure */}
          <ChartCard
            title="Infrastructure & Anti-Cheat"
            subtitle="Global low-latency cluster health and neural engine"
            badge={
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-container-highest text-tertiary font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                ALL NODES GREEN
              </span>
            }
            className="flex flex-col"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {systemNodes.map((node, index) => (
                <div key={index} className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-on-surface flex items-center gap-1">
                      {node.icon === 'shield' && <span className="material-symbols-outlined text-primary text-[14px]">shield</span>}
                      {node.name}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${node.color === 'primary' ? 'bg-surface-container-highest text-primary' : 'bg-tertiary-container text-tertiary'}`}>
                      {node.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-mono">
                    <span>{node.role}</span>
                    <span className="text-on-surface font-semibold">{node.latency}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">Recent Admin & Security Audits</span>
              <div className="rounded-lg bg-surface-container-lowest p-3 flex flex-col gap-2 font-mono text-xs">
                {auditLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-2 text-[11px] leading-relaxed">
                    <span className="text-on-surface-variant shrink-0">{log.time}</span>
                    <span className={`font-medium shrink-0 ${log.color === 'error' ? 'text-error' : log.color === 'primary' ? 'text-primary' : 'text-tertiary'}`}>
                      [{log.type}]
                    </span>
                    <span className="text-on-surface-variant truncate" dangerouslySetInnerHTML={{ __html: log.message }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-5 mt-2 flex justify-between items-center">
              <span className="text-xs text-on-surface-variant font-mono">Real-time syslog socket connected</span>
              <Button variant="ghost" size="sm" className="gap-1">
                Security Audit Trail
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </Button>
            </div>
          </ChartCard>
        </div>
      </div>
    </AdminLayout>
  );
}