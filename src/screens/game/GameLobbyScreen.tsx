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
  isReady: boolean;
  isHost: boolean;
}

export default function GameLobbyScreen(): React.ReactElement | null {
  const { gameId, lobbyCode } = useParams<{ gameId: string; lobbyCode: string }>();
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const game = {
    chess: { name: 'Chess', tagline: 'Tactical Mastery', icon: 'sports_esports' },
    ludo: { name: 'LUDO', tagline: 'Classic Dice Race', icon: 'casino' },
    checkers: { name: 'Checkers', tagline: 'Diagonal Conquest', icon: 'check_circle' },
    'tic-tac-toe': { name: 'Tic-Tac-Toe', tagline: 'Speed Strategy', icon: 'close' },
    'connect-four': { name: 'Connect Four', tagline: 'Vertical Alignment', icon: 'grid_4x4' },
    'connect-six': { name: 'Connect Six', tagline: 'Infinite Hex Matrix', icon: 'hexagon' },
  }[gameId || ''] || { name: 'Game', tagline: '', icon: 'sports_esports' };

  const me: Player = {
    username: 'Valkyrie',
    level: 'Master',
    elo: 2410,
    isReady,
    isHost: true,
  };

  const opponent: Player = {
    username: 'GrandMaster_K',
    level: 'Grandmaster',
    elo: 2680,
    isReady: true,
    isHost: false,
  };

  useEffect(() => {
    if (isReady && opponent.isReady && countdown === 0) {
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown(c => {
          if (c <= 1) {
            clearInterval(timer);
            navigate(`/game/${gameId}`);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isReady, opponent.isReady, countdown, gameId, navigate]);

  if (!gameId) {
    navigate('/games');
    return null;
  }

  return (
    <ScreenLayout title={game.name} subtitle="Game Lobby" showBottomNav={false}>
      <div className="flex-1 flex flex-col px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">{game.icon}</span>
            </div>
            <div>
              <h2 className="text-lg font-headline font-bold text-on-surface">{game.name}</h2>
              <p className="text-xs font-mono text-on-surface-variant">
                Lobby: {lobbyCode || 'A1B2C3'}
              </p>
            </div>
          </div>
          <Badge variant="tertiary" size="sm" dot dotColor="tertiary" className="text-[10px]">
            Waiting for Players
          </Badge>
        </div>

        <div className="bg-surface-container p-4 rounded-xl mb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-xl bg-surface-container-low">
              <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Format</p>
              <p className="text-sm font-bold text-on-surface">1v1 Single Elim</p>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low">
              <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Best Of</p>
              <p className="text-sm font-bold text-on-surface">1 Game</p>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low">
              <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider">Max Time</p>
              <p className="text-sm font-bold text-on-surface">1 Hour</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center py-4">
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <Avatar size="2xl" online />
                {me.isHost && (
                  <Badge variant="primary" size="sm" className="absolute -top-1 -right-2">
                    Host
                  </Badge>
                )}
                {isReady && (
                  <div className="absolute inset-0 rounded-full border-4 border-tertiary animate-ping" />
                )}
              </div>
              <h3 className="text-lg font-headline font-bold text-on-surface">{me.username}</h3>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Badge variant="primary" size="sm" className="text-[10px]">{me.level}</Badge>
                <Badge variant="tertiary" size="sm" className="text-[10px] font-mono">{me.elo.toLocaleString()} ELO</Badge>
              </div>
              <Badge 
                variant={isReady ? 'tertiary' : 'secondary'} 
                size="sm" 
                dot 
                dotColor={isReady ? 'tertiary' : 'secondary'}
                className="mt-2"
              >
                {isReady ? 'Ready' : 'Not Ready'}
              </Badge>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-headline font-bold text-primary">VS</span>
              </div>
              <p className="text-[10px] font-mono text-on-surface-variant mt-2">
                {countdown > 0 ? `Starting in ${countdown}s` : 'Waiting...'}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <Avatar size="2xl" online />
                {opponent.isReady && (
                  <div className="absolute inset-0 rounded-full border-4 border-tertiary animate-ping" />
                )}
              </div>
              <h3 className="text-lg font-headline font-bold text-on-surface">{opponent.username}</h3>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Badge variant="primary" size="sm" className="text-[10px]">{opponent.level}</Badge>
                <Badge variant="tertiary" size="sm" className="text-[10px] font-mono">{opponent.elo.toLocaleString()} ELO</Badge>
              </div>
              <Badge 
                variant={opponent.isReady ? 'tertiary' : 'secondary'} 
                size="sm" 
                dot 
                dotColor={opponent.isReady ? 'tertiary' : 'secondary'}
                className="mt-2"
              >
                {opponent.isReady ? 'Ready' : 'Not Ready'}
              </Badge>
            </div>
          </div>

          {countdown > 0 && (
            <div className="mt-8 text-center">
              <div className="text-6xl font-headline font-bold text-primary font-mono tabular-nums animate-pulse">
                {countdown}
              </div>
              <p className="text-sm text-on-surface-variant mt-2">Match starting...</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 pb-4 px-4">
          {countdown === 0 && !isReady && (
            <button 
              className="w-full px-4 py-3 bg-primary text-on-primary rounded-xl font-bold gap-2"
              onClick={() => setIsReady(true)}
            >
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              I'm Ready
            </button>
          )}
          {countdown === 0 && isReady && opponent.isReady === false && (
            <button 
              className="w-full px-4 py-3 bg-surface-container-high text-on-surface rounded-xl font-bold gap-2"
              onClick={() => setIsReady(false)}
            >
              <span className="material-symbols-outlined text-[20px]">cancel</span>
              Not Ready
            </button>
          )}
          <button 
            className="w-full px-4 py-3 bg-surface-container-high text-on-surface rounded-xl font-bold gap-2"
            onClick={() => navigate('/games')}
          >
            <span className="material-symbols-outlined text-[18px]">exit_to_app</span>
            Leave Lobby
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
}
