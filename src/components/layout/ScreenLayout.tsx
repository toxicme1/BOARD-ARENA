import type { ReactNode } from 'react';
import { TopAppBar } from '../layout/TopAppBar';
import { BottomNavigation } from '../layout/BottomNavigation';

interface ScreenLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showTopBar?: boolean;
  showBottomNav?: boolean;
  topBarLeftAction?: ReactNode;
  topBarRightActions?: ReactNode[];
  className?: string;
}

export function ScreenLayout({
  children,
  subtitle,
  showTopBar = true,
  showBottomNav = true,
  topBarLeftAction,
  topBarRightActions,
  className = '',
}: ScreenLayoutProps) {
  return (
    <div className={`flex flex-col min-h-screen bg-background ${className}`}>
      {showTopBar && <TopAppBar subtitle={subtitle} leftAction={topBarLeftAction} rightActions={topBarRightActions} />}
      <main className={`screen-container ${showTopBar ? 'pt-16' : 'pt-0'} ${showBottomNav ? 'pb-20' : 'pb-0'}`}>
        {children}
      </main>
      {showBottomNav && <BottomNavigation />}
    </div>
  );
}

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AuthLayout({ children, className = '' }: AuthLayoutProps) {
  return (
    <div className={`flex flex-col min-h-screen bg-background ${className}`}>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  );
}

interface GameLayoutProps {
  children: ReactNode;
  opponent?: {
    name: string;
    avatar?: string;
    online?: boolean;
  };
  player?: {
    name: string;
    avatar?: string;
  };
  gameName: string;
  turn?: 'player' | 'opponent';
  onLeave?: () => void;
  onMenu?: () => void;
  className?: string;
}

export function GameLayout({
  children,
  opponent,
  player,
  gameName,
  turn,
  onLeave,
  onMenu,
  className = '',
}: GameLayoutProps) {
  return (
    <div className={`flex flex-col min-h-screen bg-background ${className}`}>
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.4)] h-16">
        <div className="h-full px-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="w-10 h-10 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors shadow-sm"
              onClick={onLeave}
              aria-label="Leave Match"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">sports_esports</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-headline font-bold text-on-surface truncate">{gameName}</span>
                <span className="text-[10px] font-mono text-on-surface-variant">Live Match</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-[11px] font-semibold uppercase tracking-wider">
              <span className={`w-1.5 h-1.5 rounded-full ${turn === 'player' ? 'bg-tertiary animate-pulse' : 'bg-secondary'}`}></span>
              {turn === 'player' ? 'Your Turn' : "Opponent's Turn"}
            </div>
            <button
              className="w-10 h-10 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors"
              onClick={onMenu}
              aria-label="Game Menu"
            >
              <span className="material-symbols-outlined text-[20px]">more_vert</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col pt-16 pb-4">
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {children}
        </div>

        <div className="px-4 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high overflow-hidden flex items-center justify-center">
                {opponent?.avatar ? (
                  <img src={opponent.avatar} alt={opponent.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-on-surface-variant text-[22px]">person</span>
                )}
              </div>
              {opponent?.online && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-tertiary shadow-sm" />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-headline font-bold text-on-surface truncate">{opponent?.name}</span>
              <span className="text-[10px] font-mono text-on-surface-variant">Opponent</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[20px]">volume_up</span>
            </button>
            <button className="w-10 h-10 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high overflow-hidden flex items-center justify-center">
                {player?.avatar ? (
                  <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-on-surface-variant text-[22px]">person</span>
                )}
              </div>
              <div className="flex flex-col min-w-0 text-right">
                <span className="text-xs font-headline font-bold text-on-surface truncate">{player?.name}</span>
                <span className="text-[10px] font-mono text-tertiary">You</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}