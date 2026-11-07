import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface GameCardProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: ReactNode;
  iconColor?: 'primary' | 'tertiary' | 'secondary';
  playersOnline: string;
  onClick?: () => void;
  to?: string;
}

export function GameCard({
  id: _id,
  name,
  tagline,
  description,
  icon,
  iconColor = 'primary',
  playersOnline,
  onClick,
  to,
}: GameCardProps) {
  const iconColorClasses = {
    primary: 'text-primary',
    tertiary: 'text-tertiary',
    secondary: 'text-secondary',
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const content = (
    <Card variant="interactive" padding="sm" className="flex flex-col justify-between space-y-3">
      <div>
        <div className="flex items-start justify-between">
          <div className={`game-card-icon ${iconColorClasses[iconColor]}`}>
            {icon}
          </div>
          <Badge variant="tertiary" size="sm" dot dotColor="tertiary" className="text-[10px]">
            {playersOnline}
          </Badge>
        </div>
        <div className="mt-3">
          <h4 className="text-sm font-headline font-bold text-on-surface">{name}</h4>
          <span className="text-[11px] font-medium text-primary">{tagline}</span>
          <p className="text-[10px] text-on-surface-variant mt-0.5">{description}</p>
        </div>
      </div>
      <button
        className="w-full py-1.5 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-xs font-headline font-semibold text-on-surface transition-colors flex items-center justify-center gap-1"
        onClick={handleClick}
      >
        <span>Play</span>
        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
      </button>
    </Card>
  );

  if (to) {
    return <NavLink to={to} onClick={handleClick}>{content}</NavLink>;
  }

  return <div onClick={handleClick}>{content}</div>;
}

export const GAME_ICONS = {
  chess: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M19 21v-4a2 2 0 0 0-2-2h-1l-2-2 1-3a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2l2 2-2 3a2 2 0 0 0 1 2h1v2" />
      <circle cx="10" cy="8" r="1" />
    </svg>
  ),
  ludo: <span className="material-symbols-outlined text-[20px]">casino</span>,
  checkers: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
    </svg>
  ),
  'tic-tac-toe': <span className="material-symbols-outlined text-[20px]">close</span>,
  'connect-four': <span className="material-symbols-outlined text-[20px]">grid_4x4</span>,
  'connect-six': <span className="material-symbols-outlined text-[20px]">hexagon</span>,
};

export const GAMES_DATA = [
  { id: 'chess', name: 'Chess', tagline: 'Tactical Mastery', description: '8×8 Classic • Blitz/Rapid', icon: GAME_ICONS.chess, iconColor: 'primary' as const, playersOnline: '4.2k' },
  { id: 'ludo', name: 'LUDO', tagline: 'Classic Dice Race', description: '2–4 Players • Tokens', icon: GAME_ICONS.ludo, iconColor: 'tertiary' as const, playersOnline: '5.1k' },
  { id: 'checkers', name: 'Checkers', tagline: 'Diagonal Conquest', description: '8×8 Standard Draughts', icon: GAME_ICONS.checkers, iconColor: 'primary' as const, playersOnline: '2.8k' },
  { id: 'tic-tac-toe', name: 'Tic-Tac-Toe', tagline: 'Speed Strategy', description: '3×3 Instant Blitz Duel', icon: GAME_ICONS['tic-tac-toe'], iconColor: 'primary' as const, playersOnline: '1.9k' },
  { id: 'connect-four', name: 'Connect Four', tagline: 'Vertical Alignment', description: '7×6 Tactical Drop Grid', icon: GAME_ICONS['connect-four'], iconColor: 'primary' as const, playersOnline: '3.4k' },
  { id: 'connect-six', name: 'Connect Six', tagline: 'Infinite Hex Matrix', description: 'Gomoku 6-in-a-row Duel', icon: GAME_ICONS['connect-six'], iconColor: 'primary' as const, playersOnline: '1.1k' },
];