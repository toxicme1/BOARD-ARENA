import type { ReactNode } from 'react';

interface ProgressBarItem {
  label: string;
  value: number;
  max?: number;
  color?: 'primary' | 'tertiary' | 'secondary' | 'purple' | 'error';
  subLabel?: string;
  icon?: ReactNode;
}

interface ProgressBarsProps {
  items: ProgressBarItem[];
  showPercentage?: boolean;
  className?: string;
}

const colorClasses = {
  primary: 'bg-primary',
  tertiary: 'bg-tertiary',
  secondary: 'bg-secondary',
  purple: 'bg-primary-fixed-dim',
  error: 'bg-error',
};

export function ProgressBars({ items, showPercentage = true, className = '' }: ProgressBarsProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-on-surface flex items-center gap-1.5">
              {item.icon && <span className="text-primary text-[11px] font-mono">{index + 1}.</span>}
              {item.icon || <span className="text-primary text-[11px] font-mono">{index + 1}.</span>}
              {item.label}
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              {item.subLabel && <span className="text-on-surface-variant">{item.subLabel}</span>}
              {showPercentage && (
                <span className={`font-bold ${colorClasses[item.color || 'primary']}`}>
                  {Math.round((item.value / (item.max || 100)) * 100)}%
                </span>
              )}
            </div>
          </div>
          <div className="h-2 w-full rounded-full bg-surface-container-highest overflow-hidden">
            <div
              className={`h-full rounded-full ${colorClasses[item.color || 'primary']}`}
              style={{ width: `${Math.min(100, (item.value / (item.max || 100)) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface SparklineProps {
  data: number[];
  color?: 'primary' | 'tertiary' | 'secondary' | 'purple';
  fill?: boolean;
  height?: number;
  width?: number;
  showPeak?: boolean;
  peakIndex?: number;
}

const sparklineColors = {
  primary: '#a78bfa',
  tertiary: '#34d399',
  secondary: '#71717a',
  purple: '#c4b5fd',
};

export function Sparkline({ data, color = 'primary', fill = true, height = 56, width = 800, showPeak = false, peakIndex }: SparklineProps) {
  if (data.length < 2) return null;

  const strokeColor = sparklineColors[color];
  const stepX = width / (data.length - 1);
  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  const points = data.map((val, i) => {
    const x = i * stepX;
    const y = height - ((val - minVal) / range) * (height - 20) - 10;
    return `${x},${y}`;
  }).join(' ');

  const fillPoints = [
    `${width},${height}`,
    ...points.split(' ').reverse(),
    `0,${height}`,
  ].join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full">
      {fill && (
        <polygon
          points={fillPoints}
          fill={strokeColor}
          fillOpacity="0.1"
        />
      )}
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        points={points}
      />
      {showPeak && peakIndex !== undefined && peakIndex >= 0 && peakIndex < data.length && (
        <>
          <circle
            cx={peakIndex * stepX}
            cy={height - ((data[peakIndex] - minVal) / range) * (height - 20) - 10}
            r="5"
            fill={strokeColor}
            stroke="#09090b"
            strokeWidth="2"
          />
          <line
            x1={peakIndex * stepX}
            y1={height - ((data[peakIndex] - minVal) / range) * (height - 20) - 10}
            x2={peakIndex * stepX}
            y2={height}
            stroke={strokeColor}
            strokeDasharray="2,2"
            strokeWidth="1"
            opacity="0.6"
          />
        </>
      )}
    </svg>
  );
}