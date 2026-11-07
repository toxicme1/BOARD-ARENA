import { ScreenLayout } from '../../components/layout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Card } from '../../components/ui/Card';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Player {
  username: string;
  level: string;
  elo: number;
  isReady: boolean;
  isHost: boolean;
}

export default function PlayerConfirmationScreen(): React.ReactElement | null {
  const { gameId } = useParams<{ gameId: string }>();
  const [searchParams] = useSearchParams();
  const mode = 'single-elimination';
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [opponentConfirmed, setOpponentConfirmed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpponentConfirmed(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const game = {
    chess: { name: 'Chess', tagline: 'Tactical Mastery', icon: 'sports_esports' },
    ludo: { name: 'LUDO', tagline: 'Classic Dice Race', icon: 'casino' },
    checkers: { name: 'Checkers', tagline: 'Diagonal Conquest', icon: 'check_circle' },
    'tic-tac-toe': { name: 'Tic-Tac-Toe', tagline: 'Speed Strategy', icon: 'close' },
    'connect-four': { name: 'Connect Four', tagline: 'Vertical Alignment', icon: 'grid_4x4' },
    'connect-six': { name: 'Connect Six', tagline: 'Infinite Hex Matrix', icon: 'hexagon' },
  }[gameId || ''] || { name: 'Game', tagline: '', icon: 'sports_esports' };

  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => window.location.href = `/game/${gameId}/ready?mode=single-elimination`, 1500);
  };

  if (!gameId) {
    window.history.back();
    return null;
  }

  return (
    <ScreenLayout title="Confirm Match" subtitle={game.name} showBottomNav={false}>
      <div className="flex-1 flex flex-col px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">sports_esports</span>
            </div>
            <div>
              <h2 className="text-lg font-headline font-bold text-on-surface">{game.name}</h2>
              <p className="text-xs font-mono text-on-surface-variant">Match Confirmation</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-container p-4 rounded-xl mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-headline font-bold text-on-surface">Player Readiness</h3>
            <Badge 
              variant={isConfirmed && opponentConfirmed ? 'tertiary' : 'primary'} 
              size="sm" 
              dot 
              dotColor={isConfirmed && opponentConfirmed ? 'tertiary' : 'primary'}
            >
              {isConfirmed && opponentConfirmed ? 'All Ready' : 'Waiting...'}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${isConfirmed ? 'bg-tertiary/10 ring-2 ring-tertiary' : 'bg-surface-container-low'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">person</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-on-surface">You</h4>
                  <p className="text-xs text-on-surface-variant">Valkyrie • 2,410 ELO</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge 
                  variant={isConfirmed ? 'tertiary' : 'secondary'} 
                  size="sm" 
                  dot 
                  dotColor={isConfirmed ? 'tertiary' : 'secondary'}
                >
                  {isConfirmed ? 'Confirmed' : 'Pending'}
                </Badge>
                {!isConfirmed && (
                  <button className="px-3 py-1.5 bg-primary text-on-primary rounded-xl font-bold gap-1" onClick={() => setIsConfirmed(true)}>
                    Confirm
                  </button>
                )}
              </div>
            </div>

            <div className={`p-4 rounded-xl ${opponentConfirmed ? 'bg-tertiary/10 ring-2 ring-tertiary' : 'bg-surface-container-low'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-[24px]">person</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-on-surface">GrandMaster_K</h4>
                  <p className="text-xs text-on-surface-variant">Grandmaster • 2,680 ELO</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge 
                  variant={opponentConfirmed ? 'tertiary' : 'secondary'} 
                  size="sm" 
                  dot 
                  dotColor={opponentConfirmed ? 'tertiary' : 'secondary'}
                >
                  {opponentConfirmed ? 'Confirmed' : 'Waiting...'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container p-4 rounded-xl mb-4">
          <h3 className="font-headline font-bold text-on-surface mb-3">Match Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Game</span>
              <span className="font-medium text-on-surface">{game.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Mode</span>
              <span className="font-medium text-on-surface">Single Elimination</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Format</span>
              <span className="font-medium text-on-surface">Best of 1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Time Control</span>
              <span className="font-medium text-on-surface">1 Hour Max</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Anti-Stall</span>
              <Badge variant="tertiary" size="sm" dot dotColor="tertiary">Enabled</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Anti-Cheat</span>
              <Badge variant="tertiary" size="sm" dot dotColor="tertiary">Neural v4.9</Badge>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 p-4 rounded-xl mb-4 border border-primary/20">
          <h3 className="font-headline font-bold text-on-surface mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-[18px]">shield</span>
            Fair Play Reminder
          </h3>
          <ul className="space-y-1 text-sm text-on-surface-variant">
            <li>• No engine assistance or external help</li>
            <li>• Neural anti-cheat monitors all moves</li>
            <li>• Disconnection: 2 min grace, then forfeit</li>
            <li>• All matches recorded for replay review</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button 
            className="w-full px-4 py-3 bg-primary text-on-primary rounded-xl font-bold gap-2"
            onClick={() => { window.location.href = `/game/chess/ready?mode=single-elimination`; }}
            disabled={isConfirmed}
          >
            <span className="material-symbols-outlined text-[20px]">{isConfirmed ? 'hourglass_empty' : 'check_circle'}</span>
            {isConfirmed ? 'Waiting for Opponent...' : 'Confirm & Ready'}
          </button>
          <button 
            className="w-full px-4 py-3 bg-surface-container-high text-on-surface rounded-xl font-bold gap-2"
            onClick={() => window.history.back()}
            disabled={isConfirmed}
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Rules
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
}
