import { ScreenLayout } from '../../components/layout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Card } from '../../components/ui/Card';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Friend {
  username: string;
  level: string;
  elo: number;
  isOnline: boolean;
  status: 'available' | 'in-game' | 'busy';
}

const mockFriends: Friend[] = [
  { username: 'GrandMaster_K', level: 'Grandmaster', elo: 2680, isOnline: true, status: 'available' },
  { username: 'Astraea', level: 'Master', elo: 2290, isOnline: true, status: 'in-game' },
  { username: 'ShadowKnight_99', level: 'Expert', elo: 2150, isOnline: true, status: 'available' },
  { username: 'ZeroCool', level: 'Moderator', elo: 2520, isOnline: true, status: 'busy' },
  { username: 'Aegis_Tactics', level: 'Master', elo: 2080, isOnline: false, status: 'available' },
  { username: 'HyperNova', level: 'Diamond', elo: 1980, isOnline: true, status: 'available' },
  { username: 'NewPlayer_2026', level: 'Beginner', elo: 1000, isOnline: false, status: 'available' },
];

export default function InviteFriendScreen(): React.ReactElement | null {
  const [search, setSearch] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [gameId, setGameId] = useState('chess');

  const filteredFriends = mockFriends.filter(f => 
    f.username.toLowerCase().includes(search.toLowerCase())
  );

  const statusConfig = {
    available: { label: 'Available', color: 'tertiary' as const },
    'in-game': { label: 'In Game', color: 'primary' as const },
    busy: { label: 'Busy', color: 'secondary' as const },
  };

  const inviteSelected = () => {
    if (selectedFriends.length === 0) {
      toast.error('Select at least one friend');
      return;
    }
    toast.success(`Invited ${selectedFriends.length} friend(s) to play!`);
  };

  return (
    <ScreenLayout title="Invite Friends" subtitle="Private Match" showBottomNav={false}>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search friends..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-base"
          />
        </div>

        <div className="bg-surface-container p-4 rounded-xl mb-4">
          <label className="block text-xs font-label font-medium text-on-surface-variant mb-2">Select Game</label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['chess', 'ludo', 'checkers', 'tic-tac-toe', 'connect-four', 'connect-six'].map((id) => {
              const info = {
                chess: { name: 'Chess', icon: 'sports_esports' },
                ludo: { name: 'LUDO', icon: 'casino' },
                checkers: { name: 'Checkers', icon: 'check_circle' },
                'tic-tac-toe': { name: 'Tic-Tac-Toe', icon: 'close' },
                'connect-four': { name: 'Connect 4', icon: 'grid_4x4' },
                'connect-six': { name: 'Connect 6', icon: 'hexagon' },
              }[id] || { name: id, icon: 'games' };
              return (
                <button
                  key={id}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm font-medium shrink-0 ${gameId === id ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}
                  onClick={() => setGameId(id)}
                >
                  <span className="material-symbols-outlined text-[16px]">{info.icon}</span>
                  {info.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-surface-container rounded-xl overflow-hidden">
          <div className="p-4 border-b border-outline-variant/50 flex items-center justify-between">
            <h3 className="text-sm font-headline font-bold text-on-surface">Friends ({mockFriends.length})</h3>
            <Badge variant="tertiary" size="sm" dot dotColor="tertiary">
              {mockFriends.filter(f => f.isOnline).length} Online
            </Badge>
          </div>
          
          <div className="divide-y divide-outline-variant/50">
            {mockFriends.filter(f => f.username.toLowerCase().includes(search.toLowerCase())).map((friend) => {
              const config = statusConfig[friend.status];
              const isSelected = selectedFriends.includes(friend.username);
              return (
                <div 
                  key={friend.username} 
                  className={`p-4 flex items-center gap-4 ${isSelected ? 'bg-primary/5' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-xl border-2 ${isSelected ? 'border-primary' : 'border-transparent'} flex-shrink-0`}>
                    <Avatar size="md" online={friend.isOnline} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-headline font-bold text-on-surface truncate">{friend.username}</h4>
                      <Badge variant={config.color} size="sm" dot dotColor={config.color} className="text-[10px]">
                        {config.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-on-surface-variant">
                      <Badge variant="primary" size="sm" className="text-[10px]">{friend.level}</Badge>
                      <span className="font-mono">{friend.elo.toLocaleString()} ELO</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <span className="material-symbols-outlined text-primary text-[22px]">check_circle</span>
                    )}
                    <button 
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${friend.isOnline && friend.status === 'available' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}`}
                      disabled={!friend.isOnline || friend.status !== 'available'}
                      onClick={(e) => { e.stopPropagation(); toast.success(`Invited ${friend.username}!`); }}
                    >
                      Invite
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedFriends.length > 0 && (
          <div className="mt-4 bg-primary/10 p-4 rounded-xl border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-headline font-bold text-on-surface">
                  {selectedFriends.length} friend(s) selected
                </p>
                <p className="text-xs text-on-surface-variant">Ready to send invitations</p>
              </div>
              <button className="px-4 py-2 bg-primary text-on-primary rounded-xl font-bold gap-1" onClick={() => toast.success(`Invited ${selectedFriends.length} friend(s)!`)}>
                <span className="material-symbols-outlined text-[18px]">send</span>
                Invite All
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 p-4 rounded-xl bg-surface-container-low">
          <h4 className="text-sm font-headline font-bold text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">link</span>
            Share Invitation Link
          </h4>
          <div className="flex gap-2">
            <input
              type="text"
              value="boardarena.com/invite/A1B2C3?game=chess"
              readOnly
              className="flex-1 input-base font-mono text-xs"
            />
            <button className="px-4 py-2 bg-surface-container-high text-on-surface rounded-xl font-medium" onClick={() => navigator.clipboard.writeText('boardarena.com/invite/A1B2C3?game=chess') || toast.success('Copied!')}>
              Copy
            </button>
          </div>
          <p className="text-xs text-on-surface-variant mt-2">Anyone with this link can join your private match directly</p>
        </div>
      </div>
    </ScreenLayout>
  );
}
