import { useState, useRef, useEffect, FormEvent } from 'react';
import type { CreateMovieInput, Genre, Status, TmdbMovie } from '../types';
import { searchTmdb, tmdbPosterUrl, tmdbGenreToLocal } from '../api/client';

interface MovieFormProps {
  onSubmit: (input: CreateMovieInput) => Promise<void>;
  onClose: () => void;
}

export function MovieForm({ onSubmit, onClose }: MovieFormProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<TmdbMovie[]>([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<TmdbMovie | null>(null);

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState<Genre>('drama');
  const [status, setStatus] = useState<Status>('pendiente');
  const [rating, setRating] = useState('');
  const [notes, setNotes] = useState('');
  const [posterUrl, setPosterUrl] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced TMDB search
  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await searchTmdb(query);
        setSuggestions(res.results.slice(0, 5));
      } catch { setSuggestions([]); }
      finally { setSearching(false); }
    }, 400);
  }, [query]);

  function selectMovie(movie: TmdbMovie) {
    setSelected(movie);
    setTitle(movie.title);
    setYear(movie.release_date?.slice(0, 4) ?? '');
    setGenre(tmdbGenreToLocal(movie.genre_ids));
    setPosterUrl(tmdbPosterUrl(movie.poster_path) ?? '');
    setQuery('');
    setSuggestions([]);
  }

  function clearSelection() {
    setSelected(null);
    setTitle(''); setYear(''); setGenre('drama'); setPosterUrl('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setError('El título es obligatorio'); return; }
    if (!year || isNaN(Number(year))) { setError('El año debe ser un número válido'); return; }
    setError(''); setLoading(true);
    try {
      await onSubmit({
        title: title.trim(),
        year: Number(year),
        genre, status,
        rating: rating ? Number(rating) : undefined,
        notes: notes.trim() || undefined,
        posterUrl: posterUrl || undefined,
        tmdbId: selected?.id,
      });
      onClose();
    } catch { setError('Error al añadir la película'); }
    finally { setLoading(false); }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white">Añadir película</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {/* TMDB search */}
          {!selected && (
            <div className="relative">
              <label className="block text-sm text-gray-400 mb-1">Buscar en TMDB</label>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Escribe para buscar..."
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
              {searching && <p className="text-gray-500 text-xs mt-1">Buscando...</p>}
              {suggestions.length > 0 && (
                <div className="absolute z-10 top-full mt-1 w-full bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-xl">
                  {suggestions.map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => selectMovie(m)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors text-left"
                    >
                      {m.poster_path
                        ? <img src={tmdbPosterUrl(m.poster_path)} alt="" className="w-8 h-12 object-cover rounded" />
                        : <div className="w-8 h-12 bg-gray-700 rounded flex items-center justify-center text-lg">🎬</div>
                      }
                      <div>
                        <p className="text-white text-sm font-medium">{m.title}</p>
                        <p className="text-gray-500 text-xs">{m.release_date?.slice(0, 4)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Selected movie preview */}
          {selected && (
            <div className="flex items-center gap-3 bg-gray-800 rounded-xl p-3 border border-purple-500/30">
              {posterUrl && <img src={posterUrl} alt="" className="w-10 h-14 object-cover rounded" />}
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{selected.title}</p>
                <p className="text-gray-500 text-xs">{selected.release_date?.slice(0, 4)}</p>
              </div>
              <button type="button" onClick={clearSelection} className="text-gray-500 hover:text-white text-xs">Cambiar</button>
            </div>
          )}

          {/* Manual fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Título *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título de la película" required
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Año *</label>
              <input value={year} onChange={e => setYear(e.target.value)} type="number" placeholder="2024" required
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Puntuación</label>
              <input value={rating} onChange={e => setRating(e.target.value)} type="number" min="1" max="10" placeholder="1-10"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Género</label>
              <select value={genre} onChange={e => setGenre(e.target.value as Genre)}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors">
                <option value="accion">Acción</option>
                <option value="comedia">Comedia</option>
                <option value="drama">Drama</option>
                <option value="terror">Terror</option>
                <option value="ciencia-ficcion">Ciencia ficción</option>
                <option value="animacion">Animación</option>
                <option value="documental">Documental</option>
                <option value="romance">Romance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Estado</label>
              <select value={status} onChange={e => setStatus(e.target.value as Status)}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors">
                <option value="pendiente">Pendiente</option>
                <option value="vista">Vista</option>
                <option value="favorita">Favorita</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Notas</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="Opinión, recomendación..."
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors">
            {loading ? 'Añadiendo...' : 'Añadir película'}
          </button>
        </form>
      </div>
    </div>
  );
}
