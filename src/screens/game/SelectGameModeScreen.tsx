import { ScreenLayout } from '../../components/layout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const gameModes = [
  {
    id: 'single-elimination',
    name: 'Single Elimination',
    description: 'Classic bracket - lose once and you\'re out. Winner takes all.',
    icon: 'account_tree',
    players: '2+',
    duration: '5-30 min',
    recommended: true,
  },
  {
    id: 'best-of-3',
    name: 'Best of 3',
    description: 'Play up to 3 games. First to 2 wins. More skill, less luck.',
    icon: 'confirmation_number',
    players: '2',
    duration: '15-45 min',
    recommended: false,
  },
  {
    id: 'swiss',
    name: 'Swiss System',
    description: 'Play multiple rounds vs similar scores. No elimination. Fair for groups.',
    icon: 'swap_horiz',
    players: '4-64',
    duration: '30-60 min',
    recommended: false,
  },
  {
    id: 'round-robin',
    name: 'Round Robin',
    description: 'Everyone plays everyone. Most wins takes the crown.',
    icon: 'sync',
    players: '3-8',
    duration: '20-40 min',
    recommended: false,
  },
];

export default function SelectGameModeScreen(): React.ReactElement | null {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState('single-elimination');

  const game = {
    chess: { name: 'Chess', tagline: 'Tactical Mastery', icon: 'sports_esports' },
    ludo: { name: 'LUDO', tagline: 'Classic Dice Race', icon: 'casino' },
    checkers: { name: 'Checkers', tagline: 'Diagonal Conquest', icon: 'check_circle' },
    'tic-tac-toe': { name: 'Tic-Tac-Toe', tagline: 'Speed Strategy', icon: 'close' },
    'connect-four': { name: 'Connect Four', tagline: 'Vertical Alignment', icon: 'grid_4x4' },
    'connect-six': { name: 'Connect Six', tagline: 'Infinite Hex Matrix', icon: 'hexagon' },
  }[gameId || ''] || { name: 'Game', tagline: '', icon: 'sports_esports' };

  const handleContinue = () => {
    window.location.href = `/game/${gameId}/rules?mode=${selectedMode}`;
  };

  if (!gameId) {
    window.history.back();
    return null;
  }

  return (
    <ScreenLayout title="Select Mode" subtitle={game.name} showBottomNav={false}>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-6">
          <h2 className="text-lg font-headline font-bold text-on-surface mb-1">Choose Game Mode</h2>
          <p className="text-sm text-on-surface-variant">Select how you want to compete</p>
        </div>

        <div className="space-y-3">
          {[
            { id: 'single-elimination', name: 'Single Elimination', description: 'Classic bracket - lose once and you\'re out. Winner takes all.', players: '2+', duration: '5-30 min', recommended: true },
            { id: 'best-of-3', name: 'Best of 3', description: 'Play up to 3 games. First to 2 wins. More skill, less luck.', players: '2', duration: '15-45 min', recommended: false },
            { id: 'swiss', name: 'Swiss System', description: 'Play multiple rounds vs similar scores. No elimination. Fair for groups.', players: '4-64', duration: '30-60 min', recommended: false },
            { id: 'round-robin', name: 'Round Robin', description: 'Everyone plays everyone. Most wins takes the crown.', players: '3-8', duration: '20-40 min', recommended: false },
          ].map((mode) => {
            const isSelected = selectedMode === mode.id;
            return (
              <div 
                key={mode.id} 
                className={`p-4 rounded-xl transition-all ${isSelected ? 'bg-primary/10 ring-2 ring-primary' : 'bg-surface-container-low hover:bg-surface-container'}`}
                onClick={() => setSelectedMode(mode.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-[24px]">account_tree</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-headline font-bold text-on-surface">{mode.name}</h3>
                      {mode.recommended && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-tertiary-container text-tertiary font-bold">Recommended</span>
                      )}
                    </div>
                    <p className="text-sm text-on-surface-variant mt-1">Classic bracket - lose once and you're out. Winner takes all.</p>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs">
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">{mode.players}</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">{mode.duration}</span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-primary text-[20px]">check</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-outline-variant/50">
          <button className="w-full px-4 py-3 bg-primary text-on-primary rounded-xl font-bold gap-2" onClick={() => window.location.href = `/game/${gameId}/rules?mode=single-elimination`}>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            Continue to Rules
          </button>
          <button className="w-full mt-2 px-4 py-3 bg-surface-container-high text-on-surface rounded-xl font-bold gap-2" onClick={() => window.history.back()}>
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Lobby
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
}
