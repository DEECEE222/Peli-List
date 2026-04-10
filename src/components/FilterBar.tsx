import type { Status } from '../types';

interface FilterBarProps {
  search: string;
  onSearch: (v: string) => void;
  statusFilter: Status | 'all';
  onStatusFilter: (v: Status | 'all') => void;
}

export function FilterBar({ search, onSearch, statusFilter, onStatusFilter }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        value={search}
        onChange={e => onSearch(e.target.value)}
        placeholder="🔍 Buscar película..."
        className="flex-1 min-w-48 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
      />
      <select
        value={statusFilter}
        onChange={e => onStatusFilter(e.target.value as Status | 'all')}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
      >
        <option value="all">Todas</option>
        <option value="pendiente">Pendientes</option>
        <option value="vista">Vistas</option>
        <option value="favorita">Favoritas</option>
      </select>
    </div>
  );
}
