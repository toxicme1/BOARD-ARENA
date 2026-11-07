import { GameLayout } from '../../components/layout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

const PIECES = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
} as const;

type Piece = keyof typeof PIECES;
type Square = Piece | null;
type Board = Square[][];

const INITIAL_BOARD: Board = [
  ['bR','bN','bB','bQ','bK','bB','bN','bR'],
  ['bP','bP','bP','bP','bP','bP','bP','bP'],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  ['wP','wP','wP','wP','wP','wP','wP','wP'],
  ['wR','wN','wB','wQ','wK','wB','wN','wR'],
];

export default function LiveChessScreen(): React.ReactElement | null {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board>(INITIAL_BOARD);
  const [turn, setTurn] = useState<'w' | 'b'>('w');
  const [selected, setSelected] = useState<{r: number, c: number} | null>(null);
  const [legalMoves, setLegalMoves] = useState<[number, number][]>([]);
  const [myColor] = useState<'w' | 'b'>('w');
  const [time, setTime] = useState({ w: 3600, b: 3600 });
  const [captured, setCaptured] = useState({ w: [] as Piece[], b: [] as Piece[] });
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<string | null>(null);
  const [myTurn, setMyTurn] = useState(true);
  const [clockRunning, setClockRunning] = useState(true);

  const getLegalMoves = useCallback((r: number, c: number, piece: Piece): [number, number][] => {
    const moves: [number, number][] = [];
    const color = piece[0] as 'w' | 'b';
    const type = piece[1];
    const dir = color === 'w' ? -1 : 1;

    const add = (nr: number, nc: number) => {
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
        const target = board[nr][nc];
        if (!target || target[0] !== color) moves.push([nr, nc]);
      }
    };

    switch (type) {
      case 'P':
        const nr = r + dir;
        if (nr >= 0 && nr < 8 && !board[nr][c]) {
          add(nr, c);
          if ((color === 'w' && r === 6) || (color === 'b' && r === 1)) {
            const nr2 = r + 2*dir;
            if (!board[nr2][c]) add(nr2, c);
          }
        }
        [c-1, c+1].forEach(nc => {
          if (nc >= 0 && nc < 8 && board[nr]?.[nc]?.[0] !== color && board[nr]?.[nc]) add(nr, nc);
        });
        break;
      case 'N':
        [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(([dr,dc]) => add(r+dr, c+dc));
        break;
      case 'B':
        [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(([dr,dc]) => {
          for (let i=1; i<8; i++) {
            const nr = r+dr*i, nc = c+dc*i;
            if (nr<0||nr>7||nc<0||nc>7) break;
            if (board[nr][nc]) { if (board[nr][nc]![0]!==color) add(nr,nc); break; }
            add(nr,nc);
          }
        });
        break;
      case 'R':
        [[-1,0],[1,0],[0,-1],[0,1]].forEach(([dr,dc]) => {
          for (let i=1; i<8; i++) {
            const nr = r+dr*i, nc = c+dc*i;
            if (nr<0||nr>7||nc<0||nc>7) break;
            if (board[nr][nc]) { if (board[nr][nc]![0]!==color) add(nr,nc); break; }
            add(nr,nc);
          }
        });
        break;
      case 'Q':
        [[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]].forEach(([dr,dc]) => {
          for (let i=1; i<8; i++) {
            const nr = r+dr*i, nc = c+dc*i;
            if (nr<0||nr>7||nc<0||nc>7) break;
            if (board[nr][nc]) { if (board[nr][nc]![0]!==color) add(nr,nc); break; }
            add(nr,nc);
          }
        });
        break;
      case 'K':
        [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].forEach(([dr,dc]) => add(r+dr, c+dc));
        break;
    }
    return moves;
  }, [board]);

  const handleSquareClick = (r: number, c: number) => {
    if (gameOver || !myTurn) return;
    const piece = board[r][c];

    if (selected) {
      if (selected.r === r && selected.c === c) {
        setSelected(null); setLegalMoves([]); return;
      }
      const isLegal = legalMoves.some(([lr, lc]) => lr === r && lc === c);
      if (isLegal) makeMove(selected.r, selected.c, r, c);
      setSelected(null); setLegalMoves([]);
    } else if (piece && piece[0] === myColor) {
      setSelected({ r, c });
      setLegalMoves(getLegalMoves(r, c, piece));
    }
  };

  const makeMove = (r1: number, c1: number, r2: number, c2: number) => {
    const piece = board[r1][c1];
    const capturedPiece = board[r2][c2];
    const newBoard = board.map(row => [...row]);
    newBoard[r2][c2] = piece;
    newBoard[r1][c1] = null;
    
    if (piece === 'wP' && r2 === 0) newBoard[r2][c2] = 'wQ';
    if (piece === 'bP' && r2 === 7) newBoard[r2][c2] = 'bQ';

    setBoard(newBoard);
    setCaptured(prev => ({
      ...prev,
      [piece[0] === 'w' ? 'b' : 'w']: capturedPiece ? [...prev[piece[0] === 'w' ? 'b' : 'w'], capturedPiece] : prev[piece[0] === 'w' ? 'b' : 'w']
    }));
    
    const files = 'abcdefgh';
    const ranks = '87654321';
    const notation = `${piece[1]}${files[c1]}${ranks[r1]}${capturedPiece ? 'x' : '-'}${files[c2]}${ranks[r2]}`;
    setMoveHistory(prev => [...prev, notation]);

    const hasWK = newBoard.flat().includes('wK');
    const hasBK = newBoard.flat().includes('bK');
    if (!hasWK) setGameOver('Black wins');
    else if (!hasBK) setGameOver('White wins');

    setTurn(t => t === 'w' ? 'b' : 'w');
    setMyTurn(t => !t);
  };

  if (!gameId) navigate("/games"); return null;

  return (
    <GameLayout
      gameName="Chess"
      opponent={{ name: 'GrandMaster_K', online: true }}
      player={{ name: 'Valkyrie' }}
      turn={myTurn ? 'player' : 'opponent'}
      onLeave={() => navigate('/games')}
      onMenu={() => {}}
    >
      <div className="w-full max-w-lg mx-auto">
        <div className="aspect-square bg-surface-container-high rounded-xl relative overflow-hidden mb-4">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {board.map((row, r) => row.map((piece, c) => {
              const isLight = (r + c) % 2 === 0;
              const isSelected = selected?.r === r && selected?.c === c;
              const isLegal = legalMoves.some(([lr, lc]) => lr === r && lc === c);
              return (
                <button
                  key={`${r}-${c}`}
                  className={`relative ${isLight ? 'bg-amber-100' : 'bg-amber-900'} ${
                    isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
                  } ${isLegal ? 'after:content-[""] after:absolute after:inset-0 after:bg-primary/30 after:rounded' : ''}`}
                  onClick={() => handleSquareClick(r, c)}
                  disabled={!!gameOver || !myTurn}
                  style={{ touchAction: 'manipulation' }}
                >
                  {piece && (
                    <span className="text-4xl select-none" style={{ 
                      color: piece[0] === 'w' ? '#fff' : '#000',
                      textShadow: piece[0] === 'w' ? '0 0 2px #000' : '0 0 2px #fff'
                    }}>
                      {PIECES[piece as Piece]}
                    </span>
                  )}
                </button>
              );
            }))}
          </div>
        </div>

        <div className="flex justify-between gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant">Captured (Black):</span>
            <span className="font-mono">{captured.b.map(p => PIECES[p]).join(' ')}</span>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <span className="font-mono">{captured.w.map(p => PIECES[p]).join(' ')}</span>
            <span className="text-on-surface-variant">Captured (White):</span>
          </div>
        </div>

        <Card variant="base" padding="md" className="max-h-40 overflow-y-auto">
          <h4 className="font-headline font-bold text-on-surface mb-2">Move History</h4>
          <div className="grid grid-cols-2 gap-1 text-xs font-mono">
            {moveHistory.map((move, i) => (
              <div key={i} className={`px-2 py-1 ${i % 2 === 0 ? 'bg-surface-container-low' : ''}`}>
                {Math.floor(i/2)+1}. {move}
              </div>
            ))}
          </div>
        </Card>

        {gameOver && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <Card variant="elevated" padding="lg" className="text-center max-w-md mx-4">
              <h2 className="text-2xl font-bold text-tertiary mb-4">Game Over</h2>
              <p className="text-lg mb-6">{gameOver}</p>
              <Button variant="primary" size="lg" onClick={() => navigate('/games')}>
                Back to Home
              </Button>
            </Card>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
