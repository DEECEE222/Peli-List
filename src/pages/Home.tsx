import { useState, useMemo } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { MovieCard } from '../components/MovieCard';
import { MovieForm } from '../components/MovieForm';
import { FilterBar } from '../components/FilterBar';
import type { Status } from '../types';

export function Home() {
  const { state, addMovie, deleteMovie } = useMovieContext();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');

  const filtered = useMemo(() => {
    if (state.status !== 'success') return [];
    return state.data
      .filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
      .filter(m => statusFilter === 'all' || m.status === statusFilter);
  }, [state, search, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-purple-600">🎬 Peli-List</h1>
        <p className="text-gray-500 text-sm">Tu lista de películas personal</p>
      </header>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <MovieForm onSubmit={addMovie} />
          </div>
          <div className="lg:col-span-2">
            <FilterBar search={search} onSearch={setSearch} statusFilter={statusFilter} onStatusFilter={setStatusFilter} />
            {state.status === 'loading' && <p className="text-gray-500 text-center py-12">Cargando películas...</p>}
            {state.status === 'error' && <p className="text-red-500 text-center py-12">{state.message}</p>}
            {state.status === 'success' && filtered.length === 0 && <p className="text-gray-400 text-center py-12">No hay películas. ¡Añade una!</p>}
            {state.status === 'success' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map(movie => (
                  <MovieCard key={movie.id} movie={movie} onDelete={deleteMovie} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
