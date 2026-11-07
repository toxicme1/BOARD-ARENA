import { GameLayout } from '../../components/layout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

type Piece = { color: 'r' | 'b'; king: boolean } | null;
type Board = Piece[][];

const INITIAL_BOARD: Board = Array(8).fill(null).map((_, r) => 
  Array(8).fill(null).map((_, c) => {
    if ((r + c) % 2 === 1) {
      if (r < 3) return { color: 'b', king: false };
      if (r > 4) return { color: 'r', king: false };
    }
    return null;
  })
);

export default function LiveCheckersScreen(): React.ReactElement | null {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board>(INITIAL_BOARD);
  const [turn, setTurn] = useState<'r' | 'b'>('r');
  const [myColor] = useState<'r' | 'b'>('r');
  const [selected, setSelected] = useState<{r: number, c: number} | null>(null);
  const [legalMoves, setLegalMoves] = useState<{r: number, c: number, capture?: boolean}[]>([]);
  const [myTurn, setMyTurn] = useState(true);
  const [gameOver, setGameOver] = useState<string | null>(null);
  const [captured, setCaptured] = useState({ r: 0, b: 0 });

  const isMyTurn = myTurn && turn === myColor;

  const getLegalMoves = useCallback((r: number, c: number, piece: {color: 'r'|'b', king: boolean}): {r: number, c: number, capture?: boolean}[] => {
    const moves: {r: number, c: number, capture?: boolean}[] = [];
    const dirs = piece.king ? [[-1,-1],[-1,1],[1,-1],[1,1]] : 
      piece.color === 'r' ? [[-1,-1],[-1,1]] : [[1,-1],[1,1]];
    
    dirs.forEach(([dr, dc]) => {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && !board[nr][nc]) {
        moves.push({ r: nr, c: nc, capture: false });
      }
      const jr = r + 2*dr, jc = c + 2*dc;
      const mr = r + dr, mc = c + dc;
      if (jr >= 0 && jr < 8 && jc >= 0 && jc < 8 && !board[jr][jc]) {
        const mid = board[mr][mc];
        if (mid && mid.color !== turn) {
          moves.push({ r: jr, c: jc, capture: true });
        }
      }
    });
    return moves;
  }, [board, turn]);

  const hasCaptureMoves = useCallback((color: 'r'|'b') => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p && p.color === color) {
          const moves = getLegalMoves(r, c, p);
          if (moves.some(m => m.capture)) return true;
        }
      }
    }
    return false;
  }, [board]);

  const handleSquareClick = (r: number, c: number) => {
    if (gameOver || !isMyTurn) return;
    const piece = board[r][c];

    if (selected) {
      if (selected.r === r && selected.c === c) {
        setSelected(null); setLegalMoves([]); return;
      }
      const move = legalMoves.find(m => m.r === r && m.c === c);
      if (move) makeMove(selected.r, selected.c, r, c, move.capture);
      setSelected(null); setLegalMoves([]);
    } else if (piece && piece.color === myColor) {
      const moves = getLegalMoves(r, c, piece);
      const hasCaptures = moves.some(m => m.capture);
      if (hasCaptureMoves(myColor) && !hasCaptures) return;
      setSelected({ r, c });
      setLegalMoves(moves);
    }
  };

  const makeMove = (r1: number, c1: number, r2: number, c2: number, isCapture: boolean) => {
    const piece = { ...board[r1][c1]! };
    const newBoard = board.map(row => [...row]);
    newBoard[r2][c2] = piece;
    newBoard[r1][c1] = null;
    
    if (isCapture) {
      const mr = (r1 + r2) / 2, mc = (c1 + c2) / 2;
      newBoard[mr][mc] = null;
      setCaptured(prev => ({ ...prev, [turn]: prev[turn] + 1 }));
    }
    
    if (!piece.king && ((piece.color === 'r' && r2 === 0) || (piece.color === 'b' && r2 === 7))) {
      piece.king = true;
    }
    
    newBoard[r2][c2] = piece;
    setBoard(newBoard);
    
    const nextMoves = getLegalMoves(r2, c2, piece);
    const moreCaptures = nextMoves.filter(m => m.capture);
    
    if (moreCaptures.length > 0) {
      setSelected({ r: r2, c: c2 });
      setLegalMoves(moreCaptures);
      return;
    }
    
    endTurn();
  };

  const endTurn = () => {
    setTurn(t => t === 'r' ? 'b' : 'r');
    setMyTurn(t => !t);
    setSelected(null);
    setLegalMoves([]);
    
    const hasR = board.flat().some(p => p?.color === 'r');
    const hasB = board.flat().some(p => p?.color === 'b');
    if (!hasR) setGameOver('Black wins');
    else if (!hasB) setGameOver('Red wins');
  };

  if (!gameId) navigate("/games"); return null;

  return (
    <GameLayout
      gameName="Checkers"
      opponent={{ name: 'GrandMaster_K', online: true }}
      player={{ name: 'Valkyrie' }}
      turn={isMyTurn ? 'player' : 'opponent'}
      onLeave={() => navigate('/games')}
      onMenu={() => {}}
    >
      <div className="w-full max-w-md mx-auto">
      <div className="aspect-square bg-surface-container-high rounded-xl relative overflow-hidden mb-4">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {board.map((row, r) => row.map((piece, c) => {
            const isDark = (r + c) % 2 === 1;
            const isSelected = selected?.r === r && selected?.c === c;
            const isLegal = legalMoves.some(m => m.r === r && m.c === c);
            return (
              <button
                key={`${r}-${c}`}
                className={`relative ${isDark ? 'bg-amber-900' : 'bg-amber-100'} ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''} ${isLegal ? 'after:content-[""] after:absolute after:inset-0 after:bg-primary/30' : ''}`}
                onClick={() => handleSquareClick(r, c)}
                disabled={!!gameOver || !isMyTurn}
              >
                {piece && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${piece.color === 'r' ? 'bg-red-500' : 'bg-gray-800'} ${piece.king ? 'ring-2 ring-yellow-400' : ''}`}>
                      {piece.king && <span className="text-xs text-yellow-300">♔</span>}
                    </div>
                  </div>
                )}
              </button>
            );
          }))}
        </div>
      </div>

      <div className="flex justify-between gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-on-surface-variant">Captured:</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-container-highest text-on-surface-variant">Red: {captured.r}</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-container-highest text-on-surface-variant">Black: {captured.b}</span>
        </div>
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
