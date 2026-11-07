import { ScreenLayout } from '../../components/layout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function PrivateMatchScreen(): React.ReactElement | null {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'create' | 'join'>('create');
  const [inviteCode, setInviteCode] = useState('');
  const [gameMode, setGameMode] = useState('single-elimination');
  const [bestOf, setBestOf] = useState('1');
  const [maxPlayers, setMaxPlayers] = useState(2);
  const [isCreating, setIsCreating] = useState(false);

  const game = {
    chess: { name: 'Chess', icon: 'sports_esports' },
    ludo: { name: 'LUDO', icon: 'casino' },
    checkers: { name: 'Checkers', icon: 'check_circle' },
    'tic-tac-toe': { name: 'Tic-Tac-Toe', icon: 'close' },
    'connect-four': { name: 'Connect Four', icon: 'grid_4x4' },
    'connect-six': { name: 'Connect Six', icon: 'hexagon' },
  }[gameId || ''] || { name: 'Game', icon: 'sports_esports' };

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      toast.success(`Match created! Code: ${code}`);
      navigate(`/game/lobby/${code}`);
    } catch {
      toast.error('Failed to create match');
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoin = async () => {
    if (!inviteCode || inviteCode.length !== 6) {
      toast.error('Enter a valid 6-character code');
      return;
    }
    try {
      await new Promise(r => setTimeout(r, 1000));
      toast.success('Joining match...');
      navigate(`/game/lobby/${inviteCode.toUpperCase()}`);
    } catch {
      toast.error('Invalid or expired code');
    }
  };

  if (!gameId) navigate("/games"); return null;

  const renderCreateTab = () => (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="bg-surface-container p-4 rounded-xl">
        <h3 className="text-lg font-headline font-bold text-on-surface mb-4">Create Private Match</h3>
        <p className="text-sm text-on-surface-variant mb-6">
          Share the invite code with friends to play together
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Game Mode</label>
            <select value={gameMode} onChange={e => setGameMode(e.target.value)} className="input-base">
              <option value="single-elimination">Single Elimination (1v1)</option>
              <option value="round-robin">Round Robin (Group)</option>
              <option value="swiss">Swiss System</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Best Of</label>
            <select value={bestOf} onChange={e => setBestOf(e.target.value)} className="input-base">
              <option value="1">1 Game</option>
              <option value="3">Best of 3</option>
              <option value="5">Best of 5</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Max Players</label>
            <select value={maxPlayers} onChange={e => setMaxPlayers(Number(e.target.value))} className="input-base">
              <option value={2}>2 Players (1v1)</option>
              <option value={4}>4 Players</option>
              <option value={8}>8 Players</option>
              <option value={16}>16 Players</option>
            </select>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/50">
            <h4 className="text-sm font-headline font-bold text-on-surface mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[18px]">vpn_key</span>
              Your Invite Code
            </h4>
            <p className="text-xs text-on-surface-variant mb-2">Share this 6-character code with friends</p>
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-high">
              <span className="font-mono text-2xl text-on-surface tracking-widest" style={{ letterSpacing: '0.4em' }}>A1B2C3</span>
              <button className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg" onClick={() => navigator.clipboard.writeText('A1B2C3') || toast.success('Copied!')}>Copy</button>
            </div>
          </div>
        </div>

        <button 
          className="w-full px-4 py-3 bg-primary text-on-primary rounded-xl font-bold"
          onClick={handleCreate}
          disabled={isCreating}
        >
          {isCreating ? 'Creating...' : 'Create Match'}
        </button>
      </div>

      <div className="mt-4 p-4 rounded-xl bg-surface-container-low">
        <h4 className="text-sm font-headline font-bold text-on-surface mb-3">Quick Options</h4>
        <div className="grid grid-cols-2 gap-3">
          <button className="px-3 py-2 bg-surface-container-high text-on-surface rounded-xl font-medium text-sm" onClick={() => navigate('/invite-friend')}>
            <span className="material-symbols-outlined text-[16px] mr-1">person_add</span>
            Invite Friends
          </button>
          <button className="px-3 py-2 bg-surface-container-high text-on-surface rounded-xl font-medium text-sm">
            <span className="material-symbols-outlined text-[16px] mr-1">share</span>
            Share Link
          </button>
        </div>
      </div>
    </div>
  );

  const renderJoinTab = () => (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-primary text-[40px]">vpn_key</span>
        </div>
        <h3 className="text-lg font-headline font-bold text-on-surface">Join Private Match</h3>
        <p className="text-sm text-on-surface-variant mt-1">Enter the 6-character invite code from your friend</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-label font-medium text-on-surface-variant mb-1.5">Invite Code</label>
          <input
            type="text"
            value={inviteCode.toUpperCase()}
            onChange={e => setInviteCode(e.target.value.toUpperCase())}
            placeholder="A1B2C3"
            maxLength={6}
            className="input-base text-center text-xl font-mono tracking-widest"
            style={{ letterSpacing: '0.4em' }}
            autoFocus
          />
        </div>

        <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/50">
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-primary text-[18px]">info</span>
            <span>Code format: 6 characters (A-Z, 2-9, no O/I)</span>
          </div>
        </div>

        <button 
          className="w-full px-4 py-3 bg-primary text-on-primary rounded-xl font-bold"
          onClick={handleJoin}
          disabled={inviteCode.length !== 6}
        >
          Join Match
        </button>
      </div>

      <div className="p-4 rounded-xl bg-surface-container-low">
        <h4 className="text-sm font-headline font-bold text-on-surface mb-3">Need Help?</h4>
        <div className="space-y-2 text-xs text-on-surface-variant">
          <p>• Ask your friend to share the code from "Create Match"</p>
          <p>• Codes expire after 24 hours</p>
          <p>• Codes are case-insensitive</p>
        </div>
      </div>
    </div>
  );

  if (!gameId) navigate("/games"); return null;

  return (
    <ScreenLayout title="Private Match" subtitle={game.name} showBottomNav={false}>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex gap-2 mb-6">
          <Button variant={tab === 'create' ? 'primary' : 'secondary'} className="flex-1" onClick={() => setTab('create')}>
            Create Match
          </Button>
          <Button variant={tab === 'join' ? 'primary' : 'secondary'} className="flex-1" onClick={() => setTab('join')}>
            Join Match
          </Button>
        </div>

        {tab === 'create' ? renderCreateTab() : renderJoinTab()}
      </div>
    </ScreenLayout>
  );
}
