import { GameLayout } from '../../components/layout';
import { Card } from '../../components/ui/Card';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

type Cell = 'X' | 'O' | null;
type Board = Cell[];

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

export default function LiveTicTacToeScreen(): React.ReactElement | null {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [turn, setTurn] = useState<'X' | 'O'>('X');
  const [mySymbol] = useState<'X' | 'O'>('X');
  const [myTurn, setMyTurn] = useState(true);
  const [gameOver, setGameOver] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [round, setRound] = useState(1);

  const isMyTurn = myTurn && turn === mySymbol;

  const checkWinner = useCallback((b: Board): { winner: 'X' | 'O' | null, line: number[] | null } => {
    for (const line of WIN_LINES) {
      const [a,b,c] = line;
      if (b[a] && b[a] === b[b] && b[a] === b[c]) {
        return { winner: b[a], line };
      }
    }
    if (b.every(cell => cell !== null)) return { winner: null, line: null };
    return { winner: null, line: null };
  }, []);

  const handleCellClick = (index: number) => {
    if (gameOver || !myTurn || board[index]) return;
    
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    
    const { winner, line } = checkWinner(newBoard);
    if (winner) {
      setGameOver(`${winner} wins!`);
      setWinningLine(line!);
      setScores(s => ({ ...s, [winner]: s[winner] + 1 }));
    } else if (newBoard.every(c => c !== null)) {
      setGameOver('Draw!');
      setScores(s => ({ ...s, draws: s.draws + 1 }));
    } else {
      setTurn(t => t === 'X' ? 'O' : 'X');
      setMyTurn(t => !t);
    }
  };

  const handleNextRound = () => {
    setBoard(Array(9).fill(null));
    setTurn('X');
    setMyTurn(true);
    setGameOver(null);
    setWinningLine(null);
    setRound(r => r + 1);
  };

  if (!gameId) navigate("/games"); return null;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-3 gap-4 text-center mb-4">
        <div>
          <p className="text-xs text-on-surface-variant">You (X)</p>
          <p className="text-2xl font-bold text-primary">{scores.X}</p>
        </div>
        <div>
          <p className="text-xs text-on-surface-variant">Draws</p>
          <p className="text-2xl font-bold text-on-surface">{scores.draws}</p>
        </div>
        <div>
          <p className="text-xs text-on-surface-variant">Opponent (O)</p>
          <p className="text-2xl font-bold text-secondary">{scores.O}</p>
        </div>
      </div>
      <p className="text-xs text-on-surface-variant text-center mb-4">Round {round}</p>

      <div className="aspect-square bg-surface-container-high rounded-xl relative overflow-hidden mb-4">
        <div className="grid grid-cols-3 grid-rows-3 h-full w-full">
          {board.map((cell, i) => (
            <button
              key={i}
              className={`relative ${i % 2 === 0 ? 'bg-surface-container' : 'bg-surface-container-low'} border border-outline-variant/50 ${winningLine?.includes(i) ? 'bg-tertiary/20' : ''}`}
              onClick={() => handleCellClick(i)}
              disabled={!!gameOver || !myTurn || board[i] !== null}
            >
              {cell && (
                <span className="absolute inset-0 flex items-center justify-center text-6xl font-bold ${cell === 'X' ? 'text-primary' : 'text-secondary'}">
                  {cell}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center mb-4">
        {gameOver ? (
          <p className="text-lg font-bold text-tertiary">{gameOver}</p>
        ) : (
          <p className="text-on-surface-variant">
            {myTurn && turn === mySymbol ? 'Your turn' : "Opponent's turn"}
          </p>
        )}
      </div>

      {gameOver && (
        <button className="w-full px-4 py-3 bg-primary text-on-primary rounded-xl font-bold mb-2" onClick={handleNextRound}>
          Next Round
        </button>
      )}

      <button className="w-full px-4 py-3 bg-surface-container-high text-on-surface rounded-xl font-bold" onClick={() => navigate('/games')}>
        Leave Match
      </button>
    </div>
  );
}
