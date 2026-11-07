import { GameLayout } from '../../components/layout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

const ROWS = 6;
const COLS = 7;
type Cell = 'R' | 'Y' | null;
type Board = Cell[][];

const EMPTY_BOARD: Board = Array(ROWS).fill(null).map(() => Array(COLS).fill(null));

const checkWin = (board: Board, row: number, col: number, color: 'R' | 'Y'): [number, number][] | null => {
  const dirs = [[0,1],[1,0],[1,1],[1,-1]];
  for (const [dr, dc] of dirs) {
    const cells: [number, number][] = [[row, col]];
    for (let dir = -1; dir <= 1; dir += 2) {
      for (let i = 1; i < 4; i++) {
        const r = row + dr * i * (dir === -1 ? -1 : 1);
        const c = col + dc * i * (dir === -1 ? -1 : 1);
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== color) break;
        cells.push([r, c]);
      }
    }
    if (cells.length >= 4) return cells;
  }
  return null;
};

export default function LiveConnectFourScreen(): React.ReactElement | null {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board>(() => Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
  const [turn, setTurn] = useState<'R' | 'Y'>('R');
  const [myColor] = useState<'R' | 'Y'>('R');
  const [myTurn, setMyTurn] = useState(true);
  const [gameOver, setGameOver] = useState<string | null>(null);
  const [winningCells, setWinningCells] = useState<[number, number][]>([]);
  const [scores, setScores] = useState({ R: 0, Y: 0 });
  const [animating, setAnimating] = useState<{col: number, row: number, color: 'R' | 'Y'} | null>(null);

  const isMyTurn = myTurn && turn === myColor;

  const dropDisc = useCallback((col: number) => {
    if (gameOver || !isMyTurn || animating) return;
    
    let row = ROWS - 1;
    while (row >= 0 && board[row][col]) row--;
    if (row < 0) return;

    let nb: typeof board;
    
    setAnimating({ col, row: 0, color: turn });
    
    const animate = () => {
      setAnimating(prev => prev ? { ...prev, row: prev.row + 1 } : null);
      if (prev && prev.row < row) {
        requestAnimationFrame(animate);
      } else {
        setBoard(b => {
          nb = b.map(row => [...row]);
          nb[row][col] = turn;
          return nb;
        });
        setAnimating(null);
        
        const winCells = checkWin(nb, row, col, turn);
        if (winCells) {
          setWinningCells(winCells);
          setGameOver(`${turn === 'R' ? 'Red' : 'Yellow'} wins!`);
          setScores(s => ({ ...s, [turn]: s[turn] + 1 }));
        } else if (board.every(row => row.every(c => c))) {
          setGameOver('Draw!');
        } else {
          setTurn(t => t === 'R' ? 'Y' : 'R');
          setMyTurn(t => !t);
        }
      }
    };
    
    const prev = { col, row: 0, color: turn };
    animate();
  }, [turn, board, gameOver]);

  const handleNextRound = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    setTurn('R');
    setMyTurn(true);
    setGameOver(null);
    setWinningCells([]);
  };

  const isMyTurnLocal = myTurn && turn === myColor;

  if (!gameId) {
    navigate("/games");
    return null;
  }

  return (
    <GameLayout
      gameName="Connect Four"
      opponent={{ name: 'GrandMaster_K', online: true }}
      player={{ name: 'Valkyrie' }}
      turn={isMyTurnLocal ? 'player' : 'opponent'}
      onLeave={() => navigate('/games')}
      onMenu={() => {}}
    >
      <div className="w-full max-w-md mx-auto">
        <Card variant="base" padding="md" className="mb-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-on-surface-variant">You (Red)</p>
              <p className="text-2xl font-bold text-red-500">{scores.R}</p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant">Opponent (Yellow)</p>
              <p className="text-2xl font-bold text-yellow-400">{scores.Y}</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {Array.from({length: COLS}, (_, i) => (
            <Button
              key={i}
              variant="ghost"
              size="sm"
              className="h-8 px-0"
              onClick={() => dropDisc(i)}
              disabled={!!gameOver || !isMyTurnLocal || board[0][i] !== null}
            >
              <span className="material-symbols-outlined text-[20px]">expand_more</span>
            </Button>
          ))}
        </div>

        <div className="aspect-[7/6] bg-blue-900 rounded-xl relative overflow-hidden mb-4 p-2">
          <div className="grid grid-cols-7 grid-rows-6 h-full w-full gap-1">
            {board.map((row, r) => row.map((cell, c) => {
              const isWinning = winningCells.some(([wr, wc]) => wr === r && wc === c);
              return (
                <div
                  key={`${r}-${c}`}
                  className={`relative w-full h-full bg-blue-800 rounded-full ${isWinning ? 'ring-2 ring-tertiary animate-pulse' : ''}`}
                >
                  {(animating && animating.col === c && animating.row <= r) ? (
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-100">
                      <div className="w-8 h-8 rounded-full bg-red-500 transform" style={{ 
                        transform: `translateY(${(animating.row - r) * 100}%)` 
                      }} />
                    </div>
                  ) : cell && (
                    <div className="absolute inset-1 m-1 rounded-full transition-all duration-200" style={{ 
                      backgroundColor: cell === 'R' ? '#EF4444' : '#F59E0B',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)'
                    }} />
                  )}
                </div>
              );
            }))}
          </div>
        </div>

        <div className="text-center mb-4">
          {gameOver ? (
            <p className="text-lg font-bold text-tertiary">{gameOver}</p>
          ) : (
            <p className="text-on-surface-variant">
              {isMyTurnLocal ? 'Your turn (Red)' : "Opponent's turn (Yellow)"}
            </p>
          )}
        </div>

        {gameOver && (
          <Button variant="primary" size="lg" className="w-full gap-2" onClick={handleNextRound}>
            <span className="material-symbols-outlined text-[20px]">replay</span>
            Next Round
          </Button>
        )}

        <div className="mt-4">
          <Button variant="secondary" size="md" className="w-full gap-2" onClick={() => navigate('/games')}>
            <span className="material-symbols-outlined text-[18px]">exit_to_app</span>
            Leave Match
          </Button>
        </div>
      </div>
    </GameLayout>
  );
}
