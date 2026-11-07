import { GameLayout } from '../../components/layout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

const SIZE = 15;
type Cell = 'B' | 'W' | null;
type Board = Cell[][];

const EMPTY_BOARD: Board = Array(SIZE).fill(null).map(() => Array(SIZE).fill(null));

const checkWin = (board: Board, row: number, col: number, color: 'B' | 'W'): [number, number][] | null => {
  const dirs = [[0,1],[1,0],[1,1],[1,-1]];
  for (const [dr, dc] of dirs) {
    const cells: [number, number][] = [[row, col]];
    for (let dir = -1; dir <= 1; dir += 2) {
      for (let i = 1; i < 6; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (r < 0 || r >= 15 || c < 0 || c >= 15) break;
        if (board[r][c] !== color) break;
        cells.push([r, c]);
      }
    }
    if (cells.length >= 6) return cells;
  }
  return null;
};

export default function LiveConnectSixScreen(): React.ReactElement | null {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState(() => Array(15).fill(null).map(() => Array(15).fill(null)));
  const [turn, setTurn] = useState<'B' | 'W'>('B');
  const [myColor] = useState<'B' | 'W'>('B');
  const [myTurn, setMyTurn] = useState(true);
  const [gameOver, setGameOver] = useState<string | null>(null);
  const [winningCells, setWinningCells] = useState<[number, number][]>([]);
  const [scores, setScores] = useState({ B: 0, W: 0 });
  const [hovered, setHovered] = useState<[number, number] | null>(null);

  const isMyTurn = myTurn && turn === myColor;

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || !myTurn || board[row][col]) return;
    
    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = turn;
    setBoard(newBoard);
    
    const winCells = checkWin(newBoard, row, col, turn);
    if (winCells) {
      setWinningCells(winCells);
      setGameOver(`${turn === 'B' ? 'Black' : 'White'} wins!`);
      setScores(s => ({ ...s, [turn]: s[turn] + 1 }));
    } else if (board.flat().every(c => c !== null)) {
      setGameOver('Draw!');
    } else {
      setTurn(t => t === 'B' ? 'W' : 'B');
      setMyTurn(t => !t);
    }
  };

  const checkWin = (b: typeof board, r: number, c: number, clr: 'B' | 'W'): [number, number][] | null => {
    const dirs = [[0,1],[1,0],[1,1],[1,-1]];
    for (const [dr, dc] of dirs) {
      const cells: [number, number][] = [[r, c]];
      for (let dir = -1; dir <= 1; dir += 2) {
        for (let i = 1; i < 6; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;
          if (nr < 0 || nr >= 15 || nc < 0 || nc >= 15 || b[nr][nc] !== turn) break;
          cells.push([nr, nc]);
        }
      }
      if (cells.length >= 6) return cells;
    }
    return null;
  };

  const handleNextRound = () => {
    setBoard(Array(15).fill(null).map(() => Array(15).fill(null)));
    setTurn('B');
    setMyTurn(true);
    setGameOver(null);
    setWinningCells([]);
  };

  if (!gameId) navigate("/games"); return null;

  return (
    <GameLayout
      gameName="Connect Six"
      opponent={{ name: 'GrandMaster_K', online: true }}
      player={{ name: 'Valkyrie' }}
      turn={isMyTurn ? 'player' : 'opponent'}
      onLeave={() => navigate('/games')}
      onMenu={() => {}}
    >
      <div className="w-full max-w-[600px] mx-auto">
        <div className="aspect-square bg-amber-900/50 rounded-xl relative overflow-hidden mb-4 p-1">
          <svg className="w-full h-full" viewBox="0 0 15 15">
            <g stroke="#8B5CF6" strokeWidth="0.5" opacity="0.3">
              {Array.from({length: 16}, (_, i) => (
                <>
                  <line x1={i} y1={0} x2={i} y2={15} />
                  <line x1={0} y1={i} x2={15} y2={i} />
                </>
              ))}
            </g>
            
            <g fill="#8B5CF6" opacity="0.5">
              {[3, 7, 11].flatMap(r => [3, 7, 11].map(c => (
                <circle key={`${r}-${c}`} cx={c} cy={r} r="0.15" />
              )))}
            </g>
            
            <g>
              {board.map((row, r) => row.map((cell, c) => {
                const isWinning = winningCells.some(([wr, wc]) => wr === r && wc === c);
                if (!cell) return null;
                return (
                  <circle
                    key={`${r}-${c}`}
                    cx={c} cy={r} r="0.45"
                    fill={cell === 'B' ? '#000' : '#fff'}
                    stroke={cell === 'B' ? '#333' : '#ccc'}
                    strokeWidth="0.05"
                    filter={isWinning ? "drop-shadow(0 0 4px #22C55E)" : "none"}
                    className={isWinning ? "animate-pulse" : ""}
                  />
                );
              }))}
            </g>
            
            {hovered && !board[hovered[0]][hovered[1]] && !gameOver && myTurn && (
              <circle 
                cx={hovered[1]} cy={hovered[0]} r="0.45"
                fill={turn === 'B' ? '#000' : '#fff'}
                opacity="0.5"
                pointerEvents="none"
              />
            )}
          </svg>
        </div>

        <div className="text-center mb-4">
          {gameOver ? (
            <p className="text-lg font-bold text-tertiary">{gameOver}</p>
          ) : (
            <p className="text-on-surface-variant">
              {myTurn && turn === 'B' ? 'Your turn (Black)' : "Opponent's turn"}
            </p>
          )}
        </div>

        {gameOver && (
          <button className="w-full px-4 py-3 bg-primary text-on-primary rounded-xl font-bold" onClick={() => { setBoard(Array(15).fill(null).map(() => Array(15).fill(null))); setTurn('B'); setMyTurn(true); setGameOver(null); setWinningCells([]); }}>
            Next Round
          </button>
        )}

        <div className="mt-4">
          <button className="w-full px-4 py-3 bg-surface-container-high text-on-surface rounded-xl font-bold" onClick={() => navigate('/games')}>
            Leave Match
          </button>
        </div>
      </div>
    </GameLayout>
  );
}
