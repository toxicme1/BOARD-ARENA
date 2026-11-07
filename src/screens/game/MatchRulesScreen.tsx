import { ScreenLayout } from '../../components/layout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

const gameRules: Record<string, {
  overview: string;
  rules: { title: string; description: string }[];
  winCondition: string;
  specialRules: string[];
}> = {
  chess: {
    overview: 'Classic 8×8 chess with standard FIDE rules. No takebacks. Touch-move enforced.',
    rules: [
      { title: 'Piece Movement', description: 'Standard chess piece movements apply. Pawns promote on 8th rank.' },
      { title: 'Castling', description: 'King and rook must not have moved. No pieces between. King not in check.' },
      { title: 'En Passant', description: 'Available immediately after opponent pawn moves two squares from starting rank.' },
      { title: 'Draw Rules', description: '50-move rule, threefold repetition, stalemate, insufficient material.' },
      { title: 'Time Control', description: 'Each player has 1 hour total. Flag fall = loss if opponent has mating material.' },
    ],
    winCondition: 'Checkmate opponent\'s king. Resignation also counts as win.',
    specialRules: [
      'No external assistance (engines, databases, humans)',
      'Neural anti-cheat monitors move patterns',
      'Disconnection: 2 min grace to reconnect, then forfeit',
    ],
  },
  ludo: {
    overview: 'Classic 4-player LUDO. Race all 4 tokens from start to home. Exact roll needed to enter home.',
    rules: [
      { title: 'Starting', description: 'Roll 6 to move token from yard to start. Extra turn on 6.' },
      { title: 'Movement', description: 'Tokens move clockwise. Land on opponent = send them home.' },
      { title: 'Safe Spaces', description: 'Star-marked spaces are safe. Two tokens on same space = block.' },
      { title: 'Home Stretch', description: 'Exact roll needed to enter home column. Overshoot = bounce back.' },
      { title: 'Winning', description: 'First to get all 4 tokens home wins. Others rank by tokens home.' },
    ],
    winCondition: 'First player to move all 4 tokens into home triangle wins.',
    specialRules: [
      'Anti-stall: Auto-roll after 30s inactivity',
      'Disconnection: Auto-play with safe moves',
      'No chat spam during opponent\'s turn',
    ],
  },
  checkers: {
    overview: 'Standard 8×8 English draughts. Mandatory captures. Kings move any distance.',
    rules: [
      { title: 'Movement', description: 'Men move diagonally forward. Kings move any distance diagonally.' },
      { title: 'Captures', description: 'Mandatory. Multi-jumps required. King captures any distance.' },
      { title: 'Crowning', description: 'Man reaches far rank → becomes King. Turn ends.' },
      { title: 'Draw Rules', description: '40 moves without capture/crowning, 3-fold repetition, mutual agreement.' },
    ],
    winCondition: 'Capture all opponent pieces or block all their moves.',
    specialRules: [
      'Touch-move enforced on touch devices',
      'Anti-cheat validates capture sequences',
    ],
  },
  'tic-tac-toe': {
    overview: 'Instant 3×3 blitz. Best of 3/5/7. Perfect play = draw.',
    rules: [
      { title: 'Placement', description: 'Tap empty cell to place X or O. Alternating turns.' },
      { title: 'Winning', description: '3 in a row (horizontal, vertical, diagonal) wins round.' },
      { title: 'Draw', description: 'Full board with no winner = draw round.' },
    ],
    winCondition: 'First to majority wins in series (2/3, 3/5, 4/7).',
    specialRules: [
      '15s per move (anti-stall)',
      'Instant rematch available',
    ],
  },
  'connect-four': {
    overview: 'Vertical 7×6 grid. Drop discs. Connect 4 to win.',
    rules: [
      { title: 'Dropping', description: 'Select column. Disc falls to lowest empty slot.' },
      { title: 'Winning', description: '4 connected horizontally, vertically, or diagonally.' },
      { title: 'Draw', description: 'Full board with no connect-4 = draw.' },
    ],
    winCondition: 'First to connect 4 wins round. Best of series.',
    specialRules: [
      '20s per move',
      'Gravity animation (cannot skip)',
    ],
  },
  'connect-six': {
    overview: 'Gomoku on 15×15. Connect 6 stones. Black plays first.',
    rules: [
      { title: 'Placement', description: 'Place stone on empty intersection. No moving after placed.' },
      { title: 'Winning', description: '6 in a row (any direction) wins. Overlines (7+) also win.' },
      { title: 'Opening Rules', description: 'Swap2: Black places 3 stones (2B/1W), White chooses color.' },
    ],
    winCondition: 'First to connect 6 (or more) wins.',
    specialRules: [
      '30s per move',
      'Anti-cheat: Opening book detection',
    ],
  },
};

export default function MatchRulesScreen(): React.ReactElement | null {
  const { gameId } = useParams<{ gameId: string }>();
  const [searchParams] = useSearchParams();
  const mode = 'single-elimination';
  const navigate = useNavigate();

  const game = {
    chess: { name: 'Chess', tagline: 'Tactical Mastery', icon: 'sports_esports' },
    ludo: { name: 'LUDO', tagline: 'Classic Dice Race', icon: 'casino' },
    checkers: { name: 'Checkers', tagline: 'Diagonal Conquest', icon: 'check_circle' },
    'tic-tac-toe': { name: 'Tic-Tac-Toe', tagline: 'Speed Strategy', icon: 'close' },
    'connect-four': { name: 'Connect Four', tagline: 'Vertical Alignment', icon: 'grid_4x4' },
    'connect-six': { name: 'Connect Six', tagline: 'Infinite Hex Matrix', icon: 'hexagon' },
  }[gameId || ''] || { name: 'Game', tagline: '', icon: 'sports_esports' };

  const rules = gameRules[gameId || ''];

  const handleConfirm = () => {
    window.location.href = `/game/${gameId}/confirmation?mode=single-elimination`;
  };

  if (!game || !rules) {
    window.history.back();
    return null;
  }

  return (
    <ScreenLayout title="Match Rules" subtitle={game.name} showBottomNav={false}>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-primary-container text-primary font-bold">Single Elimination</span>
            <Badge variant="outline" size="sm" className="text-[10px]">{game.name}</Badge>
          </div>
          <h2 className="text-lg font-headline font-bold text-on-surface">Match Rules</h2>
        </div>

        <div className="bg-surface-container p-4 rounded-xl mb-4">
          <h3 className="font-headline font-bold text-on-surface mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">info</span>
            Overview
          </h3>
          <p className="text-sm text-on-surface-variant">{rules.overview}</p>
        </div>

        <div className="bg-surface-container p-4 rounded-xl mb-4">
          <h3 className="font-headline font-bold text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">rule</span>
            Game Rules
          </h3>
          <div className="space-y-3">
            {rules.rules.map((rule, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-surface-container-low">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-mono text-sm shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h4 className="font-medium text-on-surface">{rule.title}</h4>
                  <p className="text-sm text-on-surface-variant mt-0.5">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container p-4 rounded-xl mb-4">
          <h3 className="font-headline font-bold text-on-surface mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[18px]">emoji_events</span>
            Win Condition
          </h3>
          <p className="text-sm text-on-surface-variant">{rules.winCondition}</p>
        </div>

        <div className="bg-primary/10 p-4 rounded-xl mb-4 border border-primary/20">
          <h3 className="font-headline font-bold text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-[18px]">warning</span>
            Important Rules (Fair Play)
          </h3>
          <ul className="space-y-1 text-sm text-on-surface-variant">
            {rules.specialRules.map((rule, i) => (
              <li key={i} className="flex gap-2">
                <span className="material-symbols-outlined text-error text-[16px] shrink-0">circle</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <button className="w-full px-4 py-3 bg-primary text-on-primary rounded-xl font-bold gap-2" onClick={() => window.location.href = `/game/${gameId}/confirmation?mode=single-elimination`}>
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            Confirm Rules & Continue
          </button>
          <button className="w-full px-4 py-3 bg-surface-container-high text-on-surface rounded-xl font-bold gap-2" onClick={() => window.history.back()}>
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Change Mode
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
}
