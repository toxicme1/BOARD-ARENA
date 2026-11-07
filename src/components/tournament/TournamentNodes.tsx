import type { Node, NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import { Badge } from '../ui/Badge';

interface TournamentNodeData {
  label: string;
  config: Record<string, unknown>;
  onConfigChange: (key: string, value: unknown) => void;
  validation?: Record<string, string>;
}

export type { TournamentNodeData };

function BaseNode({ data }: NodeProps<TournamentNodeData>) {
  const { label, config, onConfigChange, validation = {} } = data;
  const hasErrors = Object.keys(validation).length > 0;

  return (
    <div className={`bg-surface-container border border-outline-variant rounded-xl p-4 min-w-[280px] max-w-[360px] shadow-lg ${hasErrors ? 'ring-2 ring-error' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">{getNodeIcon(label)}</span>
          <h3 className="text-sm font-headline font-bold text-on-surface">{label}</h3>
        </div>
        {hasErrors && (
          <Badge variant="error" size="sm" dot dotColor="error" className="text-[10px]">
            {Object.keys(validation).length} issue(s)
          </Badge>
        )}
      </div>
      <div className="space-y-3">
        {renderFields(label, config, onConfigChange, validation)}
      </div>
      <div className="flex justify-between mt-4 pt-3 border-t border-outline-variant/50">
        <Handle type="target" position={Position.Left} className="w-3 h-3 bg-primary border-2 border-surface" />
        <Handle type="source" position={Position.Right} className="w-3 h-3 bg-primary border-2 border-surface" />
      </div>
    </div>
  );
}

function getNodeIcon(label: string): string {
  switch (label) {
    case 'Game Selection': return 'sports_esports';
    case 'Player Pool': return 'group';
    case 'Bracket Config': return 'account_tree';
    case 'Prize Pool': return 'attach_money';
    case 'Schedule': return 'schedule';
    case 'Fair Play': return 'shield';
    default: return 'settings';
  }
}

function renderFields(
  label: string,
  config: Record<string, unknown>,
  onChange: (key: string, value: unknown) => void,
  validation: Record<string, string>
) {
  const fieldConfigs: Record<string, Array<{ key: string; label: string; type: string; options?: string[] }>> = {
    'Game Selection': [
      { key: 'game', label: 'Game', type: 'select', options: ['chess', 'ludo', 'checkers', 'tic-tac-toe', 'connect-four', 'connect-six'] },
      { key: 'variant', label: 'Variant', type: 'select', options: ['standard', 'blitz', 'rapid', 'classic'] },
    ],
    'Player Pool': [
      { key: 'minPlayers', label: 'Min Players', type: 'number' },
      { key: 'maxPlayers', label: 'Max Players', type: 'number' },
      { key: 'requireVerified', label: 'Verified Only', type: 'boolean' },
      { key: 'minElo', label: 'Min ELO', type: 'number' },
      { key: 'maxElo', label: 'Max ELO', type: 'number' },
    ],
    'Bracket Config': [
      { key: 'format', label: 'Format', type: 'select', options: ['single-elimination', 'double-elimination', 'swiss'] },
      { key: 'seeding', label: 'Seeding', type: 'select', options: ['elo-based', 'random', 'manual'] },
      { key: 'bestOf', label: 'Best Of', type: 'select', options: ['1', '3', '5'] },
      { key: 'antiStall', label: 'Anti-Stall Timer', type: 'boolean' },
    ],
    'Prize Pool': [
      { key: 'totalPool', label: 'Total Prize Pool', type: 'number' },
      { key: 'firstPlace', label: '1st Place %', type: 'number' },
      { key: 'secondPlace', label: '2nd Place %', type: 'number' },
      { key: 'thirdPlace', label: '3rd Place %', type: 'number' },
      { key: 'currency', label: 'Currency', type: 'select', options: ['XP', 'Coins', 'Tokens', 'USD'] },
    ],
    'Schedule': [
      { key: 'startDate', label: 'Start Date', type: 'datetime' },
      { key: 'endDate', label: 'End Date', type: 'datetime' },
      { key: 'matchWindowStart', label: 'Daily Window Start', type: 'time' },
      { key: 'matchWindowEnd', label: 'Daily Window End', type: 'time' },
      { key: 'maxMatchDuration', label: 'Max Match Duration (hrs)', type: 'number' },
    ],
    'Fair Play': [
      { key: 'antiCheat', label: 'Neural Anti-Cheat', type: 'boolean' },
      { key: 'requirePhone', label: 'Phone Verification', type: 'boolean' },
      { key: 'replayReview', label: 'Replay Review Enabled', type: 'boolean' },
      { key: 'stallPenalty', label: 'Stall Penalty', type: 'select', options: ['auto-forfeit', 'warning', 'elo-penalty'] },
    ],
  };

  const fields = fieldConfigs[label] || [];
  
  return fields.map((field) => {
    const value = config[field.key];
    const error = validation[field.key];
    
    switch (field.type) {
      case 'select':
        return (
          <div>
            <label className="block text-xs font-label font-medium text-on-surface-variant mb-1">{field.label}</label>
            <select
              value={value as string}
              onChange={(e) => onChange(field.key, e.target.value)}
              className={`input-base text-sm ${error ? 'border-error' : ''}`}
            >
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {error && <p className="text-[10px] text-error font-mono">{error}</p>}
          </div>
        );
      case 'number':
        return (
          <div>
            <label className="block text-xs font-label font-medium text-on-surface-variant mb-1">{field.label}</label>
            <input
              type="number"
              value={value as number | string}
              onChange={(e) => onChange(field.key, Number(e.target.value))}
              className={`input-base text-sm ${error ? 'border-error' : ''}`}
            />
            {error && <p className="text-[10px] text-error font-mono">{error}</p>}
          </div>
        );
      case 'boolean':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => onChange(field.key, e.target.checked)}
              className="w-4 h-4 rounded border-outline-variant bg-surface-container-high text-primary focus:ring-primary"
            />
            <span className="text-sm text-on-surface">{field.label}</span>
          </label>
        );
      case 'datetime':
        return (
          <div>
            <label className="block text-xs font-label font-medium text-on-surface-variant mb-1">{field.label}</label>
            <input
              type="datetime-local"
              value={value as string}
              onChange={(e) => onChange(field.key, e.target.value)}
              className={`input-base text-sm ${error ? 'border-error' : ''}`}
            />
            {error && <p className="text-[10px] text-error font-mono">{error}</p>}
          </div>
        );
      case 'time':
        return (
          <div>
            <label className="block text-xs font-label font-medium text-on-surface-variant mb-1">{field.label}</label>
            <input
              type="time"
              value={value as string}
              onChange={(e) => onChange(field.key, e.target.value)}
              className={`input-base text-sm ${error ? 'border-error' : ''}`}
            />
            {error && <p className="text-[10px] text-error font-mono">{error}</p>}
          </div>
        );
      default:
        return null;
    }
  });
}

export const tournamentNodeTypes = {
  tournamentNode: BaseNode,
};

export const initialNodes: Node<TournamentNodeData>[] = [
  {
    id: 'game',
    type: 'tournamentNode',
    position: { x: 50, y: 50 },
    data: {
      label: 'Game Selection',
      config: {
        game: 'chess',
        variant: 'blitz',
      },
      onConfigChange: () => {},
    },
  },
  {
    id: 'players',
    type: 'tournamentNode',
    position: { x: 50, y: 280 },
    data: {
      label: 'Player Pool',
      config: {
        minPlayers: 8,
        maxPlayers: 64,
        requireVerified: true,
        minElo: 1000,
        maxElo: 3000,
      },
      onConfigChange: () => {},
    },
  },
  {
    id: 'bracket',
    type: 'tournamentNode',
    position: { x: 50, y: 580 },
    data: {
      label: 'Bracket Config',
      config: {
        format: 'single-elimination',
        seeding: 'elo-based',
        bestOf: '1',
        antiStall: true,
      },
      onConfigChange: () => {},
    },
  },
  {
    id: 'prizes',
    type: 'tournamentNode',
    position: { x: 50, y: 880 },
    data: {
      label: 'Prize Pool',
      config: {
        totalPool: 10000,
        firstPlace: 50,
        secondPlace: 30,
        thirdPlace: 20,
        currency: 'XP',
      },
      onConfigChange: () => {},
    },
  },
  {
    id: 'schedule',
    type: 'tournamentNode',
    position: { x: 50, y: 1180 },
    data: {
      label: 'Schedule',
      config: {
        startDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
        endDate: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 16),
        matchWindowStart: '09:00',
        matchWindowEnd: '22:00',
        maxMatchDuration: 1,
      },
      onConfigChange: () => {},
    },
  },
  {
    id: 'fairplay',
    type: 'tournamentNode',
    position: { x: 50, y: 1480 },
    data: {
      label: 'Fair Play',
      config: {
        antiCheat: true,
        requirePhone: true,
        replayReview: true,
        stallPenalty: 'auto-forfeit',
      },
      onConfigChange: () => {},
    },
  },
];

export const initialEdges = [
  { id: 'e1', source: 'game', target: 'players', animated: true },
  { id: 'e2', source: 'players', target: 'bracket', animated: true },
  { id: 'e3', source: 'bracket', target: 'prizes', animated: true },
  { id: 'e4', source: 'prizes', target: 'schedule', animated: true },
  { id: 'e5', source: 'schedule', target: 'fairplay', animated: true },
];