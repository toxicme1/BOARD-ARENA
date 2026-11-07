import { ScreenLayout } from '../../components/layout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function FindingOpponentScreen(): React.ReactElement | null {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [searchTime, setSearchTime] = useState(0);
  const [playersFound, setPlayersFound] = useState(0);
  const [status, setStatus] = useState<'searching' | 'expanding' | 'matching'>('searching');

  const game = {
    chess: { name: 'Chess', icon: 'sports_esports' },
    ludo: { name: 'LUDO', icon: 'casino' },
    checkers: { name: 'Checkers', icon: 'check_circle' },
    'tic-tac-toe': { name: 'Tic-Tac-Toe', icon: 'close' },
    'connect-four': { name: 'Connect Four', icon: 'grid_4x4' },
    'connect-six': { name: 'Connect Six', icon: 'hexagon' },
  }[gameId || ''] || { name: 'Game', icon: 'sports_esports' };

  useEffect(() => {
    const timer = setInterval(() => setSearchTime(t => t + 1), 1000);
    const statusTimer = setTimeout(() => setStatus('expanding'), 10000);
    const matchTimer = setTimeout(() => {
      setStatus('matching');
      setPlayersFound(Math.floor(Math.random() * 3) + 1);
    }, 15000);
    return () => { clearInterval(timer); clearTimeout(statusTimer); clearTimeout(matchTimer); };
  }, []);

  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

  if (!gameId) {
    navigate('/games');
    return null;
  }

  return (
    <ScreenLayout title="Finding Opponent" subtitle="Matchmaking" showBottomNav={false}>
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="relative w-48 h-48 mb-8">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-primary rounded-full animate-ping opacity-75" />
          <div className="absolute inset-4 border-4 border-tertiary/30 rounded-full" />
          <div className="absolute inset-4 border-4 border-tertiary rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-primary text-[48px]">{game.icon}</span>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-headline font-bold text-on-surface mb-2">
          Finding {game.name} Match
        </h2>
        <p className="text-on-surface-variant mb-6">
          Searching for players near your skill level
        </p>

        <div className="bg-surface-container p-4 rounded-xl max-w-md w-full mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-headline font-bold text-primary font-mono tabular-nums">
                {formatTime(searchTime)}
              </div>
              <div className="text-[10px] text-on-surface-variant uppercase tracking-wider">Search Time</div>
            </div>
            <div className="border-l border-r border-outline-variant">
              <div className="text-2xl font-headline font-bold text-tertiary font-mono tabular-nums">
                {playersFound > 0 ? playersFound : '—'}
              </div>
              <div className="text-[10px] text-on-surface-variant uppercase tracking-wider">Players Nearby</div>
            </div>
            <div>
              <div className="text-2xl font-headline font-bold text-on-surface font-mono tabular-nums">
                {status === 'searching' ? '—' : status === 'expanding' ? '3' : '1'}
              </div>
              <div className="text-[10px] text-on-surface-variant uppercase tracking-wider">In Queue</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8 px-4">
          <Badge 
            variant={status === 'matching' ? 'tertiary' : 'primary'} 
            size="sm" 
            dot 
            dotColor={status === 'matching' ? 'tertiary' : 'primary'}
            className="text-[11px]"
          >
            {status === 'searching' ? 'Searching...' : status === 'expanding' ? 'Expanding Search' : 'Matching...'}
          </Badge>
        </div>

        <Button 
          variant="secondary" 
          size="lg" 
          className="w-full max-w-xs gap-2"
          onClick={() => navigate('/games')}
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
          Cancel Search
        </Button>

        <div className="mt-8 w-full max-w-md px-4">
          <div className="p-4 rounded-xl bg-surface-container-low text-left">
            <h4 className="text-sm font-headline font-bold text-on-surface mb-3">Tips for Faster Matches</h4>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                Enable "Quick Match" for broader search
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                Play during peak hours (7-10 PM UTC)
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                Ensure stable connection for priority matching
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
}

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
}
