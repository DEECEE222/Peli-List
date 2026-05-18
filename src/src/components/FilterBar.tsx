import type { Status } from '../types';

interface FilterBarProps {
  statusFilter: Status | 'all';
  onStatusFilter: (v: Status | 'all') => void;
  total: number;
}

const filters: { value: Status | 'all'; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'pendiente', label: 'Pendientes' },
  { value: 'vista', label: 'Vistas' },
  { value: 'favorita', label: 'Favoritas' },
];

export function FilterBar({ statusFilter, onStatusFilter, total }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => onStatusFilter(f.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
            statusFilter === f.value
              ? 'bg-purple-600 border-purple-600 text-white'
              : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
          }`}
        >
          {f.label}
        </button>
      ))}
      <span className="ml-auto text-gray-600 text-sm">{total} película{total !== 1 ? 's' : ''}</span>
    </div>
  );
}
