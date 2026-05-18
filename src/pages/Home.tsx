import { useState, useMemo } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { MovieCard } from '../components/MovieCard';
import { MovieForm } from '../components/MovieForm';
import { FilterBar } from '../components/FilterBar';
import { Navbar } from '../components/Navbar';
import { Recommendations } from '../components/Recommendations';
import { MovieDetail } from '../components/MovieDetail';
import type { Movie, Status, TmdbMovie, CreateMovieInput, Genre } from '../types';
import { tmdbPosterUrl, tmdbGenreToLocal } from '../api/client';

export function Home() {
  const { state, addMovie, deleteMovie } = useMovieContext();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [preselected, setPreselected] = useState<TmdbMovie | null>(null);

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

  const allMovies = state.status === 'success' ? state.data : [];

  function handleNavbarSelect(movie: TmdbMovie) {
    setPreselected(movie);
    setShowForm(true);
  }

  async function handleAddFromTmdb(input: CreateMovieInput) {
    await addMovie(input);
    setPreselected(null);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar search={search} onSearch={setSearch} onSelectMovie={handleNavbarSelect} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        {state.status === 'success' && stats.total > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Total',      value: stats.total,      color: 'text-white',      bg: 'from-gray-800 to-gray-900' },
              { label: 'Vistas',     value: stats.vistas,     color: 'text-green-400',  bg: 'from-green-900/30 to-gray-900' },
              { label: 'Pendientes', value: stats.pendientes, color: 'text-yellow-400', bg: 'from-yellow-900/30 to-gray-900' },
              { label: 'Favoritas',  value: stats.favoritas,  color: 'text-purple-300', bg: 'from-purple-900/40 to-gray-900' },
            ].map(s => (
              <div key={s.label} className={`bg-gradient-to-br ${s.bg} border border-gray-800 rounded-2xl px-5 py-4 text-center hover:border-gray-700 transition-colors`}>
                <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-gray-500 text-xs font-medium mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <FilterBar statusFilter={statusFilter} onStatusFilter={setStatusFilter} total={filtered.length} />
          <button onClick={() => { setPreselected(null); setShowForm(true); }}
            className="ml-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-xl px-5 py-2.5 text-sm transition-all hover:shadow-lg hover:shadow-purple-500/30 flex items-center gap-2 shrink-0">
            <span className="text-base leading-none">+</span> Nueva película
          </button>
        </div>

        {/* States */}
        {state.status === 'loading' && (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {state.status === 'error' && <p className="text-red-400 text-center py-24">{state.message}</p>}

        {/* Empty state */}
        {state.status === 'success' && filtered.length === 0 && !search && statusFilter === 'all' && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-3xl scale-150" />
              <div className="relative text-8xl">🎬</div>
            </div>
            <h2 className="text-3xl font-black text-white mb-3">Tu lista está vacía</h2>
            <p className="text-gray-500 text-base max-w-sm mb-8 leading-relaxed">
              Añade tu primera película buscando en la barra de arriba o usando el botón Nueva película.
            </p>
            <button onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold rounded-xl px-8 py-3 transition-all hover:shadow-lg hover:shadow-purple-500/30">
              + Añadir primera película
            </button>
          </div>
        )}

        {state.status === 'success' && filtered.length === 0 && (search || statusFilter !== 'all') && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-gray-400 text-lg font-medium">No hay resultados</p>
            <p className="text-gray-600 text-sm mt-1">Prueba con otro filtro o búsqueda</p>
          </div>
        )}

        {/* Grid */}
        {state.status === 'success' && filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((movie, i) => (
              <div key={movie.id} style={{ animationDelay: `${i * 40}ms` }} className="animate-fadeIn">
                <MovieCard movie={movie} onDelete={deleteMovie} onClick={setSelectedMovie} />
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {state.status === 'success' && !search && statusFilter === 'all' && (
          <Recommendations movies={allMovies} onAdd={addMovie} />
        )}
      </main>

      {/* Modals */}
      {showForm && (
        <MovieForm
          onSubmit={handleAddFromTmdb}
          onClose={() => { setShowForm(false); setPreselected(null); }}
          preselected={preselected}
        />
      )}
      {selectedMovie && <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
}
