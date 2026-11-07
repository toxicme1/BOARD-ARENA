import { GameLayout } from '../../components/layout';
import { Button } from '../../components/ui/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

const PLAYER_COLORS = ['#EF4444', '#22C55E', '#3B82F6', '#F59E0B'];
const HOME_POSITIONS = [
  { start: 0, homeCols: [53,54,55,56] },
  { start: 13, homeCols: [58,59,60,61] },
  { start: 26, homeCols: [63,64,65,66] },
  { start: 39, homeCols: [68,69,70,71] },
];

type Token = { id: number; pos: number; inHome: boolean; finished: boolean };
type PlayerState = { tokens: Token[]; color: string; isMe: boolean; name: string; elo: number };

export default function LiveLudoScreen(): React.ReactElement | null {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<PlayerState[]>([
    { tokens: Array.from({length:4},(_,i)=>({id:i,pos:-1,inHome:false,finished:false})), color: PLAYER_COLORS[0], isMe: true, name: 'Valkyrie', elo: 2410 },
    { tokens: Array.from({length:4},(_,i)=>({id:i,pos:-1,inHome:false,finished:false})), color: PLAYER_COLORS[1], isMe: false, name: 'GrandMaster_K', elo: 2680 },
    { tokens: Array.from({length:4},(_,i)=>({id:i,pos:-1,inHome:false,finished:false})), color: PLAYER_COLORS[2], isMe: false, name: 'Astraea', elo: 2290 },
    { tokens: Array.from({length:4},(_,i)=>({id:i,pos:-1,inHome:false,finished:false})), color: PLAYER_COLORS[3], isMe: false, name: 'ShadowKnight_99', elo: 2150 },
  ]);
  const [turn, setTurn] = useState(0);
  const [dice, setDice] = useState<number | null>(null);
  const [rolled, setRolled] = useState(false);
  const [myTurn, setMyTurn] = useState(true);
  const [gameOver, setGameOver] = useState<string | null>(null);
  const [mustRollAgain, setMustRollAgain] = useState(false);

  const currentPlayer = players[turn];
  const isMyTurn = myTurn && currentPlayer.isMe;

  const rollDice = useCallback(() => {
    if (!isMyTurn || rolled) return;
    const roll = Math.floor(Math.random() * 6) + 1;
    setDice(roll);
    setRolled(true);
    setMustRollAgain(roll === 6);
    const validTokens = getValidTokens(roll);
    if (validTokens.length === 1) {
      setTimeout(() => moveToken(validTokens[0]), 500);
    } else if (validTokens.length === 0) {
      setTimeout(nextTurn, 1000);
    }
  }, [isMyTurn, rolled]);

  const getValidTokens = (roll: number) => {
    const tokens = currentPlayer.tokens;
    return tokens
      .map((t, i) => ({ token: t, index: i }))
      .filter(({ token }) => {
        if (token.finished) return false;
        if (token.inHome) return false;
        if (token.pos === -1) return roll === 6;
        const newPos = token.pos + roll;
        const hp = HOME_POSITIONS[turn];
        if (newPos >= 52) {
          const homeSteps = newPos - 52;
          return homeSteps <= 4 && !tokens.some(t => t.inHome && t.pos === hp.homeCols[homeSteps-1]);
        }
        return true;
      })
      .map(({ index }) => index);
  };

  const moveToken = (tokenIndex: number) => {
    if (!rolled || dice === null) return;
    const roll = dice;
    setPlayers(prev => {
      const p = [...prev];
      const tokens = [...p[turn].tokens];
      const token = { ...tokens[tokenIndex] };
      
      if (token.pos === -1) {
        token.pos = HOME_POSITIONS[turn].start;
        token.inHome = false;
      } else {
        const newPos = token.pos + roll;
        const hp = HOME_POSITIONS[turn];
        if (newPos >= 52) {
          const homeSteps = newPos - 52;
          if (homeSteps <= 4) {
            token.pos = hp.homeCols[homeSteps - 1];
            token.inHome = true;
          }
        } else {
          token.pos = newPos;
        }
      }
      
      if (!token.inHome && !token.finished) {
        p.forEach((op, oi) => {
          if (oi !== turn) {
            op.tokens.forEach((ot) => {
              if (!ot.inHome && !ot.finished && ot.pos === token.pos) {
                ot.pos = -1;
                ot.inHome = true;
                toast(`${op.name}'s token sent home!`);
              }
            });
          }
        });
      }
      
      if (token.inHome && HOME_POSITIONS[turn].homeCols.includes(token.pos)) {
        token.finished = true;
      }
      
      tokens[tokenIndex] = token;
      p[turn] = { ...p[turn], tokens };
      
      if (tokens.every(t => t.finished)) {
        setGameOver(`${currentPlayer.name} wins!`);
      }
      
      return p;
    });
    
    setRolled(false);
    setDice(null);
    
    if (!mustRollAgain) {
      setTimeout(nextTurn, 500);
    }
  };

  const nextTurn = () => {
    setTurn(t => (t + 1) % 4);
    setRolled(false);
    setDice(null);
    setMyTurn(false); // Will be set to true for the next player in the actual game logic
    setMustRollAgain(false);
  };

  const handleTokenClick = (index: number) => {
    if (!isMyTurn || !rolled || dice === null) return;
    const validTokens = getValidTokens(dice);
    if (validTokens.includes(index)) {
      moveToken(index);
    }
  };

  const getTokenPosition = (token: Token, playerIndex: number) => {
    if (token.finished) {
      const hp = HOME_POSITIONS[playerIndex];
      const idx = hp.homeCols.indexOf(token.pos);
      if (idx >= 0) {
        const centerX = 50, centerY = 50;
        const angle = (playerIndex * 90 - 90) * Math.PI / 180;
        const dist = 35 + idx * 8;
        return { x: centerX + Math.cos(angle) * dist, y: centerY + Math.sin(angle) * dist };
      }
    }
    if (token.pos === -1) {
      const angles = [225, 315, 45, 135];
      const angle = angles[playerIndex] * Math.PI / 180;
      const tokenIdx = token.id;
      const row = Math.floor(tokenIdx / 2);
      const col = tokenIdx % 2;
      const dist = 42 + row * 6;
      return { x: 50 + Math.cos(angle) * dist + (col - 0.5) * 5, y: 50 + Math.sin(angle) * dist };
    }
    const hp = HOME_POSITIONS[playerIndex];
    let trackPos = (token.pos - hp.start + 52) % 52;
    const angle = (trackPos / 52) * 2 * Math.PI - Math.PI / 2;
    return { x: 50 + Math.cos(angle) * 30, y: 50 + Math.sin(angle) * 30 };
  };

  if (!gameId) navigate("/games"); return null;

  return (
    <GameLayout
      gameName="LUDO"
      opponent={{ name: 'GrandMaster_K', online: true }}
      player={{ name: 'Valkyrie' }}
      turn={myTurn ? 'player' : 'opponent'}
      onLeave={() => navigate('/games')}
      onMenu={() => {}}
    >
      <div className="w-full max-w-lg mx-auto">
        <div className="flex justify-center mb-4">
          <button 
            className={`w-20 h-20 rounded-xl flex flex-col items-center justify-center gap-1 ${myTurn && !dice ? 'bg-primary' : 'bg-surface-container-high'}`}
            onClick={() => {
              if (!myTurn || dice !== null) return;
              const roll = Math.floor(Math.random() * 6) + 1;
              setDice(roll);
              setMustRollAgain(roll === 6);
              const validTokens = getValidTokens(roll);
              if (validTokens.length === 1) {
                setTimeout(() => moveToken(validTokens[0]), 500);
              } else if (validTokens.length === 0) {
                setTimeout(nextTurn, 1000);
              }
            }}
            disabled={!myTurn || dice !== null}
          >
            {dice !== null ? (
              <span className="text-4xl font-bold">{dice}</span>
            ) : (
              <span className="material-symbols-outlined text-3xl animate-pulse">shuffle</span>
            )}
          </button>
        </div>

        <div className="aspect-square bg-surface-container-high rounded-xl relative overflow-hidden mb-4">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <rect x="10" y="10" width="80" height="80" fill="#1a1a2e" rx="8"/>
            <rect x="10" y="40" width="30" height="20" fill="#2a2a4a"/>
            <rect x="60" y="40" width="30" height="20" fill="#2a2a4a"/>
            <rect x="40" y="10" width="20" height="30" fill="#2a2a4a"/>
            <rect x="40" y="60" width="20" height="30" fill="#2a2a4a"/>
            <rect x="40" y="40" width="20" height="20" fill="#0f0f1a"/>
            
            {players.map((p, pi) => p.tokens.map((t, ti) => {
              const pos = getTokenPosition(t, pi);
              if (!t.finished) {
                return (
                  <circle 
                    key={`${pi}-${ti}`} 
                    cx={pos.x} 
                    cy={pos.y} 
                    r="5" 
                    fill={p.color} 
                    stroke="#000" 
                    strokeWidth="1.5"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
                  />
                );
              }
              return null;
            }))}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {players.map((p, i) => (
            <div key={i} className={`p-3 rounded-xl text-center ${turn === i ? 'bg-primary/10 ring-2 ring-primary' : 'bg-surface-container-low'}`}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="font-bold text-sm">{p.name}</span>
                {turn === i && <span className="material-symbols-outlined text-primary text-[14px] animate-pulse">schedule</span>}
              </div>
              <div className="text-xs text-on-surface-variant">
                {p.tokens.filter(t => t.finished).length}/4 home
              </div>
            </div>
          ))}
        </div>

        {gameOver && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-surface-container p-8 rounded-2xl text-center max-w-md mx-4">
              <h2 className="text-2xl font-bold text-tertiary mb-4">Game Over</h2>
              <p className="text-lg mb-6">{gameOver}</p>
              <button className="px-4 py-2 bg-primary text-on-primary rounded-xl font-bold" onClick={() => navigate('/games')}>
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
