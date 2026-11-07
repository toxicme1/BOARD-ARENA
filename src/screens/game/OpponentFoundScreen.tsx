import { ScreenLayout } from '../../components/layout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Card } from '../../components/ui/Card';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Player {
  username: string;
  level: string;
  elo: number;
}

export default function OpponentFoundScreen(): React.ReactElement | null {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [confirmed, setConfirmed] = useState(false);

  const game = {
    chess: { name: 'Chess', tagline: 'Tactical Mastery', icon: 'sports_esports' },
    ludo: { name: 'LUDO', tagline: 'Classic Dice Race', icon: 'casino' },
    checkers: { name: 'Checkers', tagline: 'Diagonal Conquest', icon: 'check_circle' },
    'tic-tac-toe': { name: 'Tic-Tac-Toe', tagline: 'Speed Strategy', icon: 'close' },
    'connect-four': { name: 'Connect Four', tagline: 'Vertical Alignment', icon: 'grid_4x4' },
    'connect-six': { name: 'Connect Six', tagline: 'Infinite Hex Matrix', icon: 'hexagon' },
  }[gameId || ''] || { name: 'Game', tagline: '', icon: 'sports_esports' };

  const opponent: Player = {
    username: 'GrandMaster_K',
    level: 'Grandmaster',
    elo: 2680,
  };

  const me: Player = {
    username: 'Valkyrie',
    level: 'Master',
    elo: 2410,
  };

  useEffect(() => {
    if (confirmed) return;
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timer);
          setConfirmed(true);
          setTimeout(() => navigate(`/game/${gameId}`), 1000);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [confirmed, gameId, navigate]);

  if (!gameId) navigate("/games"); return null;

  return (
    <ScreenLayout title="Opponent Found" subtitle="Match Ready" showBottomNav={false}>
      <div className="flex-1 flex flex-col px-4">
        <div className="flex items-center justify-between py-4">
          <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
          <span className="text-xs font-mono text-on-surface-variant">
            {game.name} • {game.tagline}
          </span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-8">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <Avatar size="2xl" online />
                <Badge variant="tertiary" size="sm" className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  You
                </Badge>
              </div>
              <h3 className="text-lg font-headline font-bold text-on-surface">{me.username}</h3>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Badge variant="primary" size="sm" className="text-[10px]">{me.level}</Badge>
                <Badge variant="tertiary" size="sm" className="text-[10px] font-mono">{me.elo.toLocaleString()} ELO</Badge>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-headline font-bold text-primary">VS</span>
                <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping" />
              </div>
              <div className="mt-2 text-[10px] font-mono text-on-surface-variant">
                Best of 1 • {countdown}s
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <Avatar size="2xl" online />
                <Badge variant="tertiary" size="sm" className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  Opponent
                </Badge>
              </div>
              <h3 className="text-lg font-headline font-bold text-on-surface">{opponent.username}</h3>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Badge variant="primary" size="sm" className="text-[10px]">{opponent.level}</Badge>
                <Badge variant="tertiary" size="sm" className="text-[10px] font-mono">{opponent.elo.toLocaleString()} ELO</Badge>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="w-48 h-4 mx-auto bg-surface-container-high rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(countdown / 10) * 100}%` }}
              />
            </div>
            <p className="text-sm font-headline font-bold text-on-surface mt-2">
              Match starts in <span className="text-primary font-mono">{countdown}</span>s
            </p>
          </div>

          <div className="bg-surface-container p-4 rounded-xl max-w-md mx-auto mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">sports_esports</span>
              </div>
              <div>
                <h4 className="text-sm font-headline font-bold text-on-surface">{game.name}</h4>
                <p className="text-[11px] text-on-surface-variant">{game.tagline || '1v1 • Best of 1 • 1hr max'}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-surface-container-low">
                <p className="text-[10px] font-mono text-on-surface-variant">Format</p>
                <p className="text-sm font-bold text-on-surface">Best of 1</p>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-low">
                <p className="text-[10px] font-mono text-on-surface-variant">Time Ctrl</p>
                <p className="text-sm font-bold text-on-surface">1hr Max</p>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-low">
                <p className="text-[10px] font-mono text-on-surface-variant">Anti-Stall</p>
                <p className="text-sm font-bold text-tertiary">Enabled</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pb-4 px-4">
          <Button 
            variant="primary" 
            size="lg" 
            className="gap-2"
            onClick={() => { setConfirmed(true); navigate(`/game/${gameId}`); }}
            disabled={confirmed}
          >
            {confirmed ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                Starting Match...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                Ready - Start Match
              </>
            )}
          </Button>
          <Button 
            variant="secondary" 
            size="md" 
            className="gap-2"
            onClick={() => navigate('/games')}
            disabled={confirmed}
          >
            <span className="material-symbols-outlined text-[20px]">cancel</span>
            Decline Match
          </Button>
        </div>
      </div>
    </ScreenLayout>
  );
}
