import { ScreenLayout } from '../../components/layout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Card } from '../../components/ui/Card';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function MatchReadyScreen(): React.ReactElement | null {
  const { gameId } = useParams<{ gameId: string }>();
  const [searchParams] = useSearchParams();
  const mode = 'single-elimination';
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  const game = {
    chess: { name: 'Chess', tagline: 'Tactical Mastery', icon: 'sports_esports' },
    ludo: { name: 'LUDO', tagline: 'Classic Dice Race', icon: 'casino' },
    checkers: { name: 'Checkers', tagline: 'Diagonal Conquest', icon: 'check_circle' },
    'tic-tac-toe': { name: 'Tic-Tac-Toe', tagline: 'Speed Strategy', icon: 'close' },
    'connect-four': { name: 'Connect Four', tagline: 'Vertical Alignment', icon: 'grid_4x4' },
    'connect-six': { name: 'Connect Six', tagline: 'Infinite Hex Matrix', icon: 'hexagon' },
  }[gameId || ''] || { name: 'Game', tagline: '', icon: 'sports_esports' };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timer);
          window.location.href = `/game/${gameId}?mode=${mode}`;
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameId, mode]);

  if (!gameId) {
    window.history.back();
    return null;
  }

  return (
    <ScreenLayout title="Match Ready" subtitle={game.name} showBottomNav={false}>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center mb-8">
          <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[11px] font-semibold uppercase tracking-wider mb-4 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            Match Starting Soon
          </span>
          <h1 className="text-2xl font-headline font-bold text-on-surface mb-2">
            {game.name}
          </h1>
          <p className="text-on-surface-variant">1v1 • Best of 1 • 1 Hour Max</p>
        </div>

        <div className="relative w-full max-w-md mb-8">
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-[48px]">person</span>
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-tertiary/30 animate-ping" />
              </div>
              <h3 className="text-lg font-headline font-bold text-on-surface mt-3">You</h3>
              <p className="text-sm text-on-surface-variant">Valkyrie • 2,410 ELO</p>
            </div>

            <div className="relative flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-3xl font-headline font-bold text-primary animate-pulse">VS</span>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-primary/30 animate-ping" />
            </div>

            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-[48px]">person</span>
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-tertiary/30 animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
              <h3 className="text-lg font-headline font-bold text-on-surface mt-3">GrandMaster_K</h3>
              <p className="text-sm text-on-surface-variant">2,680 ELO</p>
            </div>
          </div>
        </div>

        <div className="mb-8 text-center">
          <div className="text-7xl font-headline font-extrabold text-primary font-mono tabular-nums animate-pulse">
            {countdown}
          </div>
          <p className="text-lg text-on-surface-variant mt-3">
            {countdown > 0 ? 'Match starting in...' : 'Go!'}
          </p>
        </div>

        <div className="bg-surface-container p-4 rounded-xl max-w-md mx-auto mb-8">
          <h3 className="font-headline font-bold text-on-surface mb-4 text-center">Board Preview</h3>
          <div className="aspect-square bg-surface-container-high rounded-xl relative overflow-hidden flex items-center justify-center">
            <div className="text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] mb-2 block">grid_on</span>
              <p>{game.name} Board</p>
              <p className="text-xs mt-1">Standard starting position</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md text-center space-y-2 text-sm">
          <div className="flex items-center justify-center gap-2 text-on-surface-variant">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-tertiary-container text-tertiary font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
              Anti-Stall Active
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-tertiary-container text-tertiary font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
              Anti-Cheat v4.9
            </span>
          </div>
          <p className="text-on-surface-variant">Good luck! Play fair.</p>
        </div>
      </div>
    </ScreenLayout>
  );
}
