import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';

interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
  badge?: string | number;
}

const adminNavItems: NavItem[] = [
  { path: '/admin', label: 'Dashboard', icon: <span className="material-symbols-outlined text-[20px]">dashboard</span> },
  { path: '/admin/users', label: 'User Management', icon: <span className="material-symbols-outlined text-[20px]">group</span> },
  { path: '/admin/games', label: 'Game Management', icon: <span className="material-symbols-outlined text-[20px]">sports_esports</span> },
  { path: '/admin/matches', label: 'Match Monitoring', icon: <span className="material-symbols-outlined text-[20px]">visibility</span> },
  { path: '/admin/reports', label: 'Reports', icon: <span className="material-symbols-outlined text-[20px]">flag</span> },
  { path: '/admin/tournaments/builder', label: 'Tournament Builder', icon: <span className="material-symbols-outlined text-[20px]">tournament</span> },
  { path: '/admin/settings', label: 'Settings', icon: <span className="material-symbols-outlined text-[20px]">settings</span> },
];

interface AdminSidebarProps {
  className?: string;
  children?: ReactNode;
}

export function AdminSidebar({ className = '', children }: AdminSidebarProps) {
  return (
    <aside className={`fixed top-0 left-0 z-40 h-full w-64 bg-surface/95 backdrop-blur-xl border-r border-outline-variant flex flex-col ${className}`}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-outline-variant">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[22px]">admin_panel_settings</span>
          </div>
          <span className="text-xs font-headline font-bold uppercase tracking-wider text-on-surface">BOARD ARENA</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-container-highest text-primary-fixed-dim uppercase font-bold tracking-wider">Admin</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {adminNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }: { isActive: boolean }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary/15 text-primary ring-1 ring-primary/40'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`
            }
            aria-current={item.path === '/admin' ? 'page' : undefined}
          >
            <span className="shrink-0">{item.icon}</span>
            <span className="truncate">{item.label}</span>
            {item.badge && (
              <span className="ml-auto px-2 py-0.5 rounded-full bg-primary text-[10px] font-bold font-mono text-on-primary">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-outline-variant">
        {children || (
          <div className="p-3 rounded-lg bg-surface-container-low flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-on-surface truncate">System Healthy</p>
              <p className="text-[10px] text-on-surface-variant">All nodes operational</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          </div>
        )}
      </div>
    </aside>
  );
}