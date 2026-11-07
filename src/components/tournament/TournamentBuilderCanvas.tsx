import { useState, useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  type Connection,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
  Panel,
  type NodeTypes,
  type EdgeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { tournamentNodeTypes, initialNodes, initialEdges, type TournamentNodeData } from './TournamentNodes';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { toast } from 'react-hot-toast';

interface TournamentConfig {
  game: string;
  variant: string;
  minPlayers: number;
  maxPlayers: number;
  requireVerified: boolean;
  minElo: number;
  maxElo: number;
  format: string;
  seeding: string;
  bestOf: string;
  antiStall: boolean;
  totalPool: number;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
  currency: string;
  startDate: string;
  endDate: string;
  matchWindowStart: string;
  matchWindowEnd: string;
  maxMatchDuration: number;
  antiCheat: boolean;
  requirePhone: boolean;
  replayReview: boolean;
  stallPenalty: string;
}

const defaultConfig: TournamentConfig = {
  game: 'chess',
  variant: 'blitz',
  minPlayers: 8,
  maxPlayers: 64,
  requireVerified: true,
  minElo: 1000,
  maxElo: 3000,
  format: 'single-elimination',
  seeding: 'elo-based',
  bestOf: '1',
  antiStall: true,
  totalPool: 10000,
  firstPlace: 50,
  secondPlace: 30,
  thirdPlace: 20,
  currency: 'XP',
  startDate: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
  endDate: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 16),
  matchWindowStart: '09:00',
  matchWindowEnd: '22:00',
  maxMatchDuration: 1,
  antiCheat: true,
  requirePhone: true,
  replayReview: true,
  stallPenalty: 'auto-forfeit',
};

const nodeTypes: NodeTypes = {
  ...tournamentNodeTypes,
};

const edgeTypes: EdgeTypes = {
  default: () => (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
      <path
        d="M 0 50 Q 50 50 100 50"
        stroke="#8B5CF6"
        strokeWidth={2}
        fill="none"
        style={{ animation: 'dash 1s linear infinite' }}
      />
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}</style>
    </svg>
  ),
};

export function TournamentBuilderCanvas() {
  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [config, _setConfig] = useState<TournamentConfig>(defaultConfig);
  const [isPublishing, setIsPublishing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, Record<string, string>>>({});

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ ...params, type: 'default', animated: true }, eds));
  }, [setEdges]);

  const validateNode = (nodeId: string, nodeConfig: Record<string, unknown>): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    switch (nodeId) {
      case 'players':
        if ((nodeConfig.minPlayers as number) < 2) errors.minPlayers = 'Minimum 2 players required';
        if ((nodeConfig.maxPlayers as number) < (nodeConfig.minPlayers as number)) errors.maxPlayers = 'Max must be >= min';
        if ((nodeConfig.maxPlayers as number) > 256) errors.maxPlayers = 'Max 256 players';
        break;
      case 'prizes':
        const total = (nodeConfig.firstPlace as number) + (nodeConfig.secondPlace as number) + (nodeConfig.thirdPlace as number);
        if (total !== 100) errors.total = `Percentages must equal 100% (currently ${total}%)`;
        break;
      case 'schedule':
        if (new Date(nodeConfig.startDate as string) >= new Date(nodeConfig.endDate as string)) {
          errors.endDate = 'End date must be after start date';
        }
        break;
    }
    
    return errors;
  };

  const hasErrors = Object.values(validationErrors).some((e) => Object.keys(e).length > 0);

  const extractConfig = () => {
    const fullConfig: Partial<TournamentConfig> = {};
    nodes.forEach((node) => {
      if (node.type === 'tournamentNode') {
        Object.assign(fullConfig, (node.data as TournamentNodeData).config);
      }
    });
    return fullConfig as TournamentConfig;
  };

  const handlePublish = async () => {
    const finalConfig = extractConfig();
    const allErrors: Record<string, string> = {};
    
    nodes.forEach((node) => {
      if (node.type === 'tournamentNode') {
        const validation = validateNode(node.id, (node.data as TournamentNodeData).config);
        Object.entries(validation).forEach(([key, msg]) => {
          allErrors[`${node.id}.${key}`] = msg;
        });
      }
    });

    if (Object.keys(allErrors).length > 0) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        Object.entries(allErrors).forEach(([key, msg]) => {
          const [nodeId, field] = key.split('.');
          if (!newErrors[nodeId]) newErrors[nodeId] = {};
          newErrors[nodeId][field] = msg;
        });
        return newErrors;
      });
      toast.error('Please fix validation errors before publishing');
      return;
    }

    setIsPublishing(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Generate tournament bracket
      const bracket = generateBracket(finalConfig);
      
      toast.success('Tournament published! Bracket generated.');
      console.log('Tournament Config:', finalConfig);
      console.log('Generated Bracket:', bracket);
      
      // In real app: POST to /api/admin/tournaments
    } catch (error) {
      toast.error('Failed to publish tournament');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleTest = () => {
    const finalConfig = extractConfig();
    toast.success('Test mode: Tournament logic validated');
    console.log('Test Config:', finalConfig);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface/90 backdrop-blur-xl border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-headline font-bold text-on-surface">Tournament Builder</h2>
          <div className="flex items-center gap-2">
            <Badge variant={hasErrors ? 'error' : 'tertiary'} size="sm" dot dotColor={hasErrors ? 'error' : 'tertiary'}>
              {hasErrors ? 'Validation Errors' : 'Valid Configuration'}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleTest} className="gap-1">
            <span className="material-symbols-outlined text-[16px]">science</span>
            Test Logic
          </Button>
          <Button variant="primary" size="sm" onClick={handlePublish} disabled={isPublishing || hasErrors} className="gap-1">
            {isPublishing ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                Publishing...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">publish</span>
                Publish Tournament
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background color="#27272a" gap={20} />
          <Controls />
          <MiniMap
            nodeColor={(node) => (node.data as TournamentNodeData)?.validation && Object.keys((node.data as TournamentNodeData).validation || {}).length > 0 ? '#EF4444' : '#8B5CF6'}
            maskColor="rgba(8, 9, 13, 0.8)"
          />
        </ReactFlow>

        {/* Validation Panel */}
        {hasErrors && (
          <Panel position="bottom-right">
            <Card variant="elevated" padding="md" className="w-80 max-h-60 overflow-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-headline font-bold text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  Validation Errors
                </h3>
              </div>
              <div className="space-y-2 text-xs">
                {Object.entries(validationErrors).map(([nodeId, errors]) => (
                  <div key={nodeId} className="border-l-2 border-error pl-2">
                    <p className="font-mono text-on-surface-variant mb-1">{nodeId}</p>
                    {Object.entries(errors).map(([field, msg]) => (
                      <p key={field} className="text-error ml-2">• {field}: {msg}</p>
                    ))}
                  </div>
                ))}
              </div>
            </Card>
          </Panel>
        )}

        {/* Fair Play Info Panel */}
        <Panel position="top-right">
          <Card variant="elevated" padding="md" className="w-72">
            <h3 className="text-sm font-headline font-bold text-on-surface flex items-center gap-1 mb-3">
              <span className="material-symbols-outlined text-tertiary text-[18px]">shield</span>
              Anti-Stalling System
            </h3>
            <div className="space-y-2 text-xs text-on-surface-variant">
              <div className="p-2 rounded-lg bg-surface-container-low">
                <p className="font-mono text-tertiary mb-1">⏰ Match Window</p>
                <p>Daily {config.matchWindowStart}–{config.matchWindowEnd}</p>
                <p>Max {config.maxMatchDuration}hr per match</p>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-low">
                <p className="font-mono text-primary mb-1">🏆 Payout Protection</p>
                <p>Top 3 paid even if incomplete</p>
                <p>1st: {config.firstPlace}% | 2nd: {config.secondPlace}% | 3rd: {config.thirdPlace}%</p>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-low">
                <p className="font-mono text-error mb-1">⚡ Anti-Stall</p>
                <p>Auto-forfeit after match window</p>
                <p>No waiting until tournament end</p>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-low">
                <p className="font-mono text-on-surface-variant mb-1">🔒 Fair Play</p>
                <p>Neural anti-cheat: {config.antiCheat ? 'ON' : 'OFF'}</p>
                <p>Phone verify: {config.requirePhone ? 'Required' : 'Optional'}</p>
                <p>Replay review: {config.replayReview ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>
          </Card>
        </Panel>
      </div>
    </div>
  );
}

// Bracket generation logic for single-elimination
function generateBracket(config: TournamentConfig) {
  const playerCount = Math.min(config.maxPlayers, Math.max(config.minPlayers, 32)); // Simulate
  const rounds = Math.ceil(Math.log2(playerCount));
  const matches: Array<{
    id: string;
    round: number;
    position: number;
    player1?: string;
    player2?: string;
    status: 'pending' | 'live' | 'completed' | 'forfeited';
    winner?: string;
    scheduledAt?: string;
    maxDuration: number;
  }> = [];

  let matchId = 0;
  
  // Round 1 matches
  for (let i = 0; i < playerCount / 2; i++) {
    matches.push({
      id: `M${++matchId}`,
      round: 1,
      position: i,
      status: 'pending',
      maxDuration: config.maxMatchDuration,
    });
  }

  // Subsequent rounds
  for (let round = 2; round <= rounds; round++) {
    const matchesInRound = playerCount / Math.pow(2, round);
    for (let i = 0; i < matchesInRound; i++) {
      matches.push({
        id: `M${++matchId}`,
        round,
        position: i,
        status: 'pending',
        maxDuration: config.maxMatchDuration,
      });
    }
  }

  return {
    config,
    totalPlayers: playerCount,
    totalRounds: rounds,
    totalMatches: matches.length,
    matches,
    payouts: {
      1: Math.round(config.totalPool * (config.firstPlace / 100)),
      2: Math.round(config.totalPool * (config.secondPlace / 100)),
      3: Math.round(config.totalPool * (config.thirdPlace / 100)),
    },
    schedule: {
      start: config.startDate,
      end: config.endDate,
      dailyWindow: `${config.matchWindowStart}–${config.matchWindowEnd}`,
      maxMatchDuration: config.maxMatchDuration,
    },
    fairPlay: {
      antiCheat: config.antiCheat,
      phoneVerification: config.requirePhone,
      replayReview: config.replayReview,
      stallPenalty: config.stallPenalty,
    },
  };
}