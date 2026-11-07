import { Outlet } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children?: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 flex flex-col ml-64 min-w-0 lg:ml-64">
        <header className="sticky top-0 z-30 h-16 bg-surface/85 backdrop-blur-xl border-b border-outline-variant px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-headline font-bold text-on-surface">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-mono text-on-surface-variant">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
              </span>
              <span>Live Feed</span>
            </div>
            <button className="w-10 h-10 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors" aria-label="Notifications">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[18px]">admin_panel_settings</span>
            </div>
          </div>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}