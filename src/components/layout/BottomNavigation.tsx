import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';

interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
  badge?: string | number;
}

const defaultNavItems: NavItem[] = [
  { path: '/', label: 'Home', icon: <span className="material-symbols-outlined text-[20px]">home</span> },
  { path: '/games', label: 'Games', icon: <span className="material-symbols-outlined text-[20px]">grid_view</span> },
  { path: '/friends', label: 'Friends', icon: <span className="material-symbols-outlined text-[20px]">group</span> },
  { path: '/leaderboard', label: 'Leaderboard', icon: <span className="material-symbols-outlined text-[20px]">trophy</span> },
  { path: '/profile', label: 'Profile', icon: <span className="material-symbols-outlined text-[20px]">person</span> },
];

interface BottomNavigationProps {
  items?: NavItem[];
  hideOnPaths?: string[];
  className?: string;
}

export function BottomNavigation({
  items = defaultNavItems,
  hideOnPaths = ['/auth/*', '/game/*', '/admin/*'],
  className = '',
}: BottomNavigationProps) {
  const location = useLocation();

  const shouldHide = hideOnPaths.some((pattern) => {
    const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
    return regex.test(location.pathname);
  });

  if (shouldHide) return null;

  return (
    <nav className={`bottom-nav ${className}`} data-active-classes="text-primary font-semibold [&>div]:bg-primary/15 [&>div]:ring-1 [&>div]:ring-primary/40">
      <div className="flex justify-around items-center h-16 px-2">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }: { isActive: boolean }) =>
              `flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] transition-colors group ${
                isActive
                  ? 'text-primary font-semibold [&>div]:bg-primary/15 [&>div]:ring-1 [&>div]:ring-primary/40'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
            aria-current={item.path === '/' ? 'page' : undefined}
          >
            <div className="px-3 py-1 rounded-full transition-all duration-200 flex items-center justify-center relative">
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 min-w-[16px] rounded-full bg-primary text-[9px] font-bold font-mono flex items-center justify-center text-on-primary">
                  {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight font-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}