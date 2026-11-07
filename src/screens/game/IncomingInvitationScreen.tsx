import { ScreenLayout } from '../../components/layout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Card } from '../../components/ui/Card';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function IncomingInvitationScreen(): React.ReactElement | null {
  const { invitationId } = useParams<{ invitationId: string }>();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60);
  const [responded, setResponded] = useState(false);

  const invitation = {
    gameId: 'chess',
    gameName: 'Chess',
    gameIcon: 'sports_esports',
    inviter: {
      username: 'GrandMaster_K',
      level: 'Grandmaster',
      elo: 2680,
    },
    matchType: 'private',
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          if (!responded) {
            toast.error('Invitation expired');
            navigate('/');
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [responded, navigate]);

  const handleAccept = () => {
    setResponded(true);
    toast.success('Match accepted! Joining...');
    setTimeout(() => navigate(`/game/${invitation.gameId}`), 1000);
  };

  const handleDecline = () => {
    setResponded(true);
    toast('Invitation declined');
    navigate('/');
  };

  const matchTypeConfig = {
    private: { label: 'Private Match', color: 'primary' as const },
    tournament: { label: 'Tournament Match', color: 'tertiary' as const },
    friendly: { label: 'Friendly Match', color: 'secondary' as const },
  };
  const matchConfig = matchTypeConfig[invitation.matchType as keyof typeof matchTypeConfig] || matchTypeConfig.private;

  return (
    <ScreenLayout showBottomNav={false}>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-[11px] font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            Incoming Invitation
          </div>
          <h1 className="text-2xl font-headline font-bold text-on-surface mb-2">
            Game Invitation
          </h1>
          <p className="text-on-surface-variant">
            {invitation.inviter.username} wants to play {invitation.gameName}
          </p>
        </div>

        <div className="w-full max-w-md mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-on-surface-variant">Time to respond</span>
            <span className="font-mono text-xl font-bold text-primary tabular-nums">{timeLeft}s</span>
          </div>
          <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 60) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-surface-container p-6 rounded-2xl max-w-md w-full mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar size="xl" online />
            <div className="flex-1 text-left">
              <h3 className="text-lg font-headline font-bold text-on-surface">
                {invitation.inviter.username}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="primary" size="sm" className="text-[10px]">{invitation.inviter.level}</Badge>
                <Badge variant="tertiary" size="sm" className="text-[10px] font-mono">{invitation.inviter.elo.toLocaleString()} ELO</Badge>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">sports_esports</span>
              </div>
              <div>
                <h4 className="text-sm font-headline font-bold text-on-surface">{invitation.gameName}</h4>
                <p className="text-xs text-on-surface-variant">1v1 • Best of 1 • 1hr max</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Private Match
            </div>
          </div>
        </div>

        <div className="w-full max-w-md space-y-3">
          <button 
            className="w-full px-4 py-3 bg-primary text-on-primary rounded-xl font-bold text-lg gap-2"
            onClick={handleAccept}
            disabled={responded}
          >
            <span className="material-symbols-outlined text-[20px]">check</span>
            Accept & Play
          </button>
          <button 
            className="w-full px-4 py-3 bg-surface-container-high text-on-surface rounded-xl font-bold text-lg gap-2"
            onClick={handleDecline}
            disabled={responded}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
            Decline
          </button>
        </div>

        {responded && (
          <p className="text-center text-sm text-on-surface-variant mt-4">
            Redirecting to match...
          </p>
        )}
      </div>
    </ScreenLayout>
  );
}
