import type { Status } from '../types';

interface FilterBarProps {
  statusFilter: Status | 'all';
  onStatusFilter: (v: Status | 'all') => void;
  total: number;
}

const filters: { value: Status | 'all'; label: string; icon: string }[] = [
  { value: 'all',       label: 'Todas',      icon: '🎬' },
  { value: 'pendiente', label: 'Pendientes', icon: '⏳' },
  { value: 'vista',     label: 'Vistas',     icon: '✅' },
  { value: 'favorita',  label: 'Favoritas',  icon: '❤️' },
];

export function FilterBar({ statusFilter, onStatusFilter, total }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filters.map(f => (
        <button key={f.value} onClick={() => onStatusFilter(f.value)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${
            statusFilter === f.value
              ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/30 scale-105'
              : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-purple-500/50 hover:text-white hover:bg-gray-800'
          }`}>
          <span>{f.icon}</span>
          <span>{f.label}</span>
        </button>
      ))}
      <span className="ml-2 text-gray-600 text-sm font-medium">{total} película{total !== 1 ? 's' : ''}</span>
    </div>
  );
}
