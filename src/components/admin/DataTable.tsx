import type { ReactNode } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface Column<T> {
  key: string;
  header: string;
  render: (row: T, index: number) => ReactNode;
  className?: string;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No data available',
  striped = true,
  hoverable = true,
  className = '',
  onRowClick,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <Card variant="base" padding="lg" className="text-center">
        <span className="material-symbols-outlined text-on-surface-variant text-[48px] mb-4 block">table_rows</span>
        <p className="text-on-surface-variant">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <Card variant="base" padding="none" className={`overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="grid">
          <thead>
            <tr className="bg-surface-container-high border-b border-outline-variant">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-4 py-3 text-left font-mono text-[11px] uppercase tracking-wider text-on-surface-variant ${col.className || ''}`}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/50">
            {data.map((row, rowIndex) => (
              <tr
                key={keyExtractor(row)}
                className={`${striped && rowIndex % 2 === 1 ? 'bg-surface-container-low/50' : ''} ${hoverable ? 'hover:bg-surface-container-high/50' : ''} ${onRowClick ? 'cursor-pointer' : ''} transition-colors`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 ${col.className || ''}`}>
                    {col.render(row, rowIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

interface StatusConfig {
  label: string;
  variant: 'primary' | 'tertiary' | 'secondary' | 'error' | 'outline';
  dotColor?: 'primary' | 'tertiary' | 'error' | 'secondary';
}

export function createStatusBadge(status: string, configMap: Record<string, StatusConfig>) {
  const config = configMap[status] || { label: status, variant: 'secondary' };
  return (
    <Badge variant={config.variant} dot dotColor={config.dotColor || 'secondary'}>
      {config.label}
    </Badge>
  );
}