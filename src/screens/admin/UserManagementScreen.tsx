import {
  AdminLayout,
  ChartCard,
  DataTable,
} from '../../components/admin';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  status: 'active' | 'suspended' | 'banned' | 'pending';
  role: 'user' | 'moderator' | 'admin';
  registeredAt: string;
  lastActive: string;
  elo: number;
  matchesPlayed: number;
  reports: number;
}

const mockUsers: User[] = [
  {
    id: 'USR-001247',
    username: 'Valkyrie',
    email: 'valkyrie@proton.me',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgUvjWez7ggDUQt-3SiRQLFEwsiJxLBg8hFmoBZbEZ1V3FTQ6rd4gn7iKg0XSrzL6-oSONrnebxZMHr3ZADHItOLsy3TrvYpHiXTGeZyJk3LgiYuBrrIkaKv5BvmNGcP9ixTk0XqZI5Zumpd5GaAOrsGDyR6atStM6nyZuDwkv7cfAQTTFWeNknI-hJbv29V2OeTSbHLt4HThlgJPaMSJyYYQdugxUPMV_lu18zEAQ',
    status: 'active',
    role: 'user',
    registeredAt: '2024-01-15',
    lastActive: '2026-11-06 09:42',
    elo: 2410,
    matchesPlayed: 342,
    reports: 0,
  },
  {
    id: 'USR-000892',
    username: 'GrandMaster_K',
    email: 'grandmasterk@chess.pro',
    status: 'active',
    role: 'user',
    registeredAt: '2023-11-03',
    lastActive: '2026-11-06 09:38',
    elo: 2680,
    matchesPlayed: 521,
    reports: 0,
  },
  {
    id: 'USR-002104',
    username: 'HexNode_9',
    email: 'hexnode9@tempmail.io',
    status: 'suspended',
    role: 'user',
    registeredAt: '2026-10-12',
    lastActive: '2026-11-06 09:35',
    elo: 1850,
    matchesPlayed: 89,
    reports: 3,
  },
  {
    id: 'USR-001567',
    username: 'Astraea',
    email: 'astraea.gamer@gmail.com',
    status: 'active',
    role: 'user',
    registeredAt: '2024-03-22',
    lastActive: '2026-11-06 09:30',
    elo: 2290,
    matchesPlayed: 287,
    reports: 0,
  },
  {
    id: 'USR-003001',
    username: 'BotMatrix_X',
    email: 'botmatrix@fake.email',
    status: 'banned',
    role: 'user',
    registeredAt: '2026-09-01',
    lastActive: '2026-09-15 14:22',
    elo: 1200,
    matchesPlayed: 12,
    reports: 47,
  },
  {
    id: 'USR-000421',
    username: 'ShadowKnight_99',
    email: 'shadowknight99@outlook.com',
    status: 'active',
    role: 'user',
    registeredAt: '2023-08-14',
    lastActive: '2026-11-06 08:15',
    elo: 2150,
    matchesPlayed: 445,
    reports: 1,
  },
  {
    id: 'USR-001888',
    username: 'ZeroCool',
    email: 'zerocool@hacker.net',
    status: 'active',
    role: 'moderator',
    registeredAt: '2024-02-28',
    lastActive: '2026-11-06 09:45',
    elo: 2520,
    matchesPlayed: 398,
    reports: 0,
  },
  {
    id: 'USR-002334',
    username: 'Aegis_Tactics',
    email: 'aegis.tactics@protonmail.com',
    status: 'active',
    role: 'user',
    registeredAt: '2025-01-10',
    lastActive: '2026-11-06 07:20',
    elo: 2080,
    matchesPlayed: 156,
    reports: 0,
  },
  {
    id: 'USR-000999',
    username: 'NewPlayer_2026',
    email: 'newplayer@test.com',
    status: 'pending',
    role: 'user',
    registeredAt: '2026-11-06',
    lastActive: 'Never',
    elo: 1000,
    matchesPlayed: 0,
    reports: 0,
  },
  {
    id: 'USR-002777',
    username: 'TournamentAdmin',
    email: 'tournaments@boardarena.com',
    status: 'active',
    role: 'admin',
    registeredAt: '2023-06-01',
    lastActive: '2026-11-06 09:00',
    elo: 1800,
    matchesPlayed: 89,
    reports: 0,
  },
];

const statusConfig = {
  active: { label: 'Active', variant: 'tertiary' as const, dotColor: 'tertiary' as const },
  suspended: { label: 'Suspended', variant: 'error' as const, dotColor: 'error' as const },
  banned: { label: 'Banned', variant: 'error' as const, dotColor: 'error' as const },
  pending: { label: 'Pending Verification', variant: 'secondary' as const, dotColor: 'secondary' as const },
};

const roleConfig = {
  user: { label: 'Player', variant: 'secondary' as const },
  moderator: { label: 'Moderator', variant: 'primary' as const },
  admin: { label: 'Administrator', variant: 'error' as const },
};

export default function UserManagementScreen() {
  const columns = [
    {
      key: 'user',
      header: 'USER',
      width: '280px',
      render: (row: User) => (
        <div className="flex items-center gap-3">
          <Avatar size="md" src={row.avatar} alt={row.username} online={row.status === 'active'} />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-on-surface truncate">{row.username}</span>
              <Badge variant={roleConfig[row.role].variant} size="sm" className="text-[10px]">
                {roleConfig[row.role].label}
              </Badge>
              {row.reports > 0 && (
                <Badge variant="error" size="sm" dot dotColor="error" className="text-[10px]">
                  {row.reports} reports
                </Badge>
              )}
            </div>
            <span className="text-[11px] text-on-surface-variant font-mono">{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'STATUS',
      width: '140px',
      render: (row: User) => (
        <Badge
          variant={statusConfig[row.status].variant}
          dot
          dotColor={statusConfig[row.status].dotColor}
          size="sm"
        >
          {statusConfig[row.status].label}
        </Badge>
      ),
    },
    {
      key: 'elo',
      header: 'ELO',
      width: '90px',
      className: 'font-mono tabular-nums',
      render: (row: User) => (
        <span className={`font-bold ${row.elo >= 2400 ? 'text-tertiary' : row.elo >= 2000 ? 'text-primary' : 'text-on-surface'}`}>
          {row.elo.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'matches',
      header: 'MATCHES',
      width: '90px',
      className: 'font-mono tabular-nums',
      render: (row: User) => (
        <span className="text-on-surface-variant">{row.matchesPlayed.toLocaleString()}</span>
      ),
    },
    {
      key: 'registered',
      header: 'REGISTERED',
      width: '130px',
      className: 'font-mono',
      render: (row: User) => (
        <span className="text-on-surface-variant">{row.registeredAt}</span>
      ),
    },
    {
      key: 'lastActive',
      header: 'LAST ACTIVE',
      width: '160px',
      className: 'font-mono',
      render: (row: User) => (
        <span className={row.lastActive === 'Never' ? 'text-on-surface-variant/50' : 'text-on-surface-variant'}>
          {row.lastActive}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'ACTIONS',
      width: '180px',
      className: 'text-right',
      render: (row: User) => (
        <div className="flex items-center justify-end gap-2 shrink-0">
          <Button variant="ghost" size="sm" aria-label={`View ${row.username} profile`}>
            <span className="material-symbols-outlined text-[16px]">visibility</span>
          </Button>
          {row.status === 'active' ? (
            <Button variant="secondary" size="sm" className="text-error hover:bg-error hover:text-on-error" aria-label={`Suspend ${row.username}`}>
              Suspend
            </Button>
          ) : row.status === 'suspended' ? (
            <Button variant="secondary" size="sm" className="text-tertiary hover:bg-tertiary hover:text-on-tertiary" aria-label={`Restore ${row.username}`}>
              Restore
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="text-on-surface-variant/50" disabled aria-label="Account banned">
              Banned
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
              <span className="text-primary font-medium">User Management</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-on-surface font-headline mt-1">User Management</h1>
            <p className="text-xs text-on-surface-variant max-w-2xl mt-1">Search, filter, and manage player accounts. Suspend or restore accounts as needed.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-64 hidden sm:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 material-symbols-outlined text-[18px]">search</span>
              <Input
                placeholder="Search users..."
                className="pl-10"
                aria-label="Search users"
              />
            </div>
            <Button variant="secondary" size="sm" className="gap-1">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
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
          <ChartCard title="Total Users" subtitle="All registered accounts" className="p-4">
            <div className="text-3xl font-extrabold text-on-surface font-headline">482,910</div>
            <div className="flex items-center gap-1 text-xs font-mono text-tertiary mt-1">
              <span className="material-symbols-outlined text-[15px]">trending_up</span>
              +12.4% this month
            </div>
          </ChartCard>
          <ChartCard title="Active (24h)" subtitle="Logged in recently" className="p-4">
            <div className="text-3xl font-extrabold text-on-surface font-headline text-tertiary">21,910</div>
            <div className="flex items-center gap-1 text-xs font-mono text-tertiary mt-1">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              94.2% Verified
            </div>
          </ChartCard>
          <ChartCard title="Suspended" subtitle="Temporarily restricted" className="p-4">
            <div className="text-3xl font-extrabold text-on-surface font-headline text-error">1,247</div>
            <div className="flex items-center gap-1 text-xs font-mono text-error mt-1">
              <span className="material-symbols-outlined text-[15px]">warning</span>
              23 pending review
            </div>
          </ChartCard>
          <ChartCard title="Banned" subtitle="Permanently removed" className="p-4">
            <div className="text-3xl font-extrabold text-on-surface font-headline text-error">89</div>
            <div className="flex items-center gap-1 text-xs font-mono text-on-surface-variant mt-1">
              <span className="material-symbols-outlined text-[15px]">block</span>
              47 for cheating
            </div>
          </ChartCard>
        </div>

        {/* User Table */}
        <ChartCard
          title="User Accounts"
          subtitle={`${mockUsers.length} accounts displayed`}
          className="flex flex-col"
        >
          <DataTable
            columns={columns}
            data={mockUsers}
            keyExtractor={(row) => row.id}
            striped={true}
            hoverable={true}
          />
          <div className="pt-4 mt-2 flex justify-between items-center">
            <span className="text-xs text-on-surface-variant font-mono">Showing 10 of 482,910 users</span>
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