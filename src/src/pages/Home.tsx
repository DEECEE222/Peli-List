import { useState, useMemo } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { MovieCard } from '../components/MovieCard';
import { MovieForm } from '../components/MovieForm';
import { FilterBar } from '../components/FilterBar';
import { Navbar } from '../components/Navbar';
import type { Status } from '../types';

export function Home() {
  const { state, addMovie, deleteMovie } = useMovieContext();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    if (state.status !== 'success') return [];
    return state.data
      .filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
      .filter(m => statusFilter === 'all' || m.status === statusFilter);
  }, [state, search, statusFilter]);

  const stats = useMemo(() => {
    if (state.status !== 'success') return { total: 0, vistas: 0, pendientes: 0, favoritas: 0 };
    return {
      total: state.data.length,
      vistas: state.data.filter(m => m.status === 'vista').length,
      pendientes: state.data.filter(m => m.status === 'pendiente').length,
      favoritas: state.data.filter(m => m.status === 'favorita').length,
    };
  }, [state]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar search={search} onSearch={setSearch} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        {state.status === 'success' && stats.total > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Total', value: stats.total, color: 'text-white' },
              { label: 'Vistas', value: stats.vistas, color: 'text-green-400' },
              { label: 'Pendientes', value: stats.pendientes, color: 'text-yellow-400' },
              { label: 'Favoritas', value: stats.favoritas, color: 'text-purple-400' },
            ].map(s => (
              <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-center">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <FilterBar statusFilter={statusFilter} onStatusFilter={setStatusFilter} total={filtered.length} />
          <button
            onClick={() => setShowForm(true)}
            className="ml-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-4 py-2 text-sm transition-colors flex items-center gap-2 shrink-0"
          >
            <span className="text-lg leading-none">+</span> Nueva película
          </button>
        </div>

        {/* States */}
        {state.status === 'loading' && (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {state.status === 'error' && (
          <div className="text-center py-24">
            <p className="text-red-400 mb-2">{state.message}</p>
          </div>
        )}
        {state.status === 'success' && filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🎬</p>
            <p className="text-gray-400 text-lg font-medium">No hay películas aquí</p>
            <p className="text-gray-600 text-sm mt-1">
              {search ? 'Prueba con otro título' : 'Añade tu primera película'}
            </p>
          </div>
        )}

        {/* Grid */}
        {state.status === 'success' && filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map(movie => (
              <MovieCard key={movie.id} movie={movie} onDelete={deleteMovie} />
            ))}
          </div>
        )}
      </main>

      {/* Modal form */}
      {showForm && <MovieForm onSubmit={addMovie} onClose={() => setShowForm(false)} />}
    </div>
  );
}
