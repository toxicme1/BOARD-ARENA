import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { Avatar } from '../ui/Avatar';
import { IconButton } from '../ui/Button';

interface TopAppBarProps {
  subtitle?: string;
  leftAction?: ReactNode;
  rightActions?: ReactNode[];
  showBack?: boolean;
  onBack?: () => void;
  className?: string;
}

export function TopAppBar({
  subtitle,
  leftAction,
  rightActions = [],
  showBack = false,
  onBack,
  className = '',
}: TopAppBarProps) {
  return (
    <header className={`top-app-bar ${className}`}>
      <div className="h-16 px-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {showBack ? (
            <IconButton
              icon={<span className="material-symbols-outlined text-[22px]">arrow_back</span>}
              aria-label="Back"
              onClick={onBack}
            />
          ) : leftAction ? (
            leftAction
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[22px]">sports_esports</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-headline font-bold uppercase tracking-wider text-on-surface truncate">
                  BOARD ARENA
                </span>
                {subtitle && (
                  <span className="text-[11px] font-label font-medium tracking-tight text-on-surface-variant truncate max-w-[120px]">
                    {subtitle}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {rightActions.map((action, index) => (
            <Fragment key={index}>{action}</Fragment>
          ))}
          <Avatar
            size="md"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgUvjWez7ggDUQt-3SiRQLFEwsiJxLBg8hFmoBZbEZ1V3FTQ6rd4gn7iKg0XSrzL6-oSONrnebxZMHr3ZADHItOLsy3TrvYpHiXTGeZyJk3LgiYuBrrIkaKv5BvmNGcP9ixTk0XqZI5Zumpd5GaAOrsGDyR6atStM6nyZuDwkv7cfAQTTFWeNknI-hJbv29V2OeTSbHLt4HThlgJPaMSJyYYQdugxUPMV_lu18zEAQ"
            alt="User avatar"
            online
          />
        </div>
      </div>
    </header>
  );
}