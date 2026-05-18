import { useState, useRef, useEffect, FormEvent } from 'react';
import type { CreateMovieInput, Genre, Status, TmdbMovie } from '../types';
import { searchTmdb, tmdbPosterUrl, tmdbGenreToLocal } from '../api/client';

interface MovieFormProps {
  onSubmit: (input: CreateMovieInput) => Promise<void>;
  onClose: () => void;
  preselected?: TmdbMovie | null;
}

export function MovieForm({ onSubmit, onClose, preselected }: MovieFormProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<TmdbMovie[]>([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<TmdbMovie | null>(preselected ?? null);

  const [title, setTitle] = useState(preselected?.title ?? '');
  const [year, setYear] = useState(preselected?.release_date?.slice(0, 4) ?? '');
  const [genre, setGenre] = useState<Genre>(preselected ? tmdbGenreToLocal(preselected.genre_ids) : 'drama');
  const [status, setStatus] = useState<Status>('pendiente');
  const [rating, setRating] = useState('');
  const [notes, setNotes] = useState('');
  const [posterUrl, setPosterUrl] = useState(preselected?.poster_path ? tmdbPosterUrl(preselected.poster_path) ?? '' : '');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    setQuery(''); setSuggestions([]);
  }

  function clearSelection() {
    setSelected(null); setTitle(''); setYear(''); setGenre('drama'); setPosterUrl('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setError('El título es obligatorio'); return; }
    if (!year || isNaN(Number(year))) { setError('El año debe ser un número válido'); return; }
    setError(''); setLoading(true);
    try {
      await onSubmit({
        title: title.trim(), year: Number(year), genre, status,
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-lg font-black text-white">Añadir película</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">{error}</div>}

          {!selected && (
            <div className="relative">
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">Buscar en TMDB</label>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Escribe para buscar..."
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all" />
              {searching && <p className="text-gray-500 text-xs mt-1">Buscando...</p>}
              {suggestions.length > 0 && (
                <div className="absolute z-10 top-full mt-1 w-full bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                  {suggestions.map(m => (
                    <button key={m.id} type="button" onClick={() => selectMovie(m)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors text-left border-b border-gray-700 last:border-0">
                      {m.poster_path
                        ? <img src={tmdbPosterUrl(m.poster_path)} alt="" className="w-8 h-12 object-cover rounded-lg" />
                        : <div className="w-8 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-lg">🎬</div>}
                      <div>
                        <p className="text-white text-sm font-semibold">{m.title}</p>
                        <p className="text-gray-500 text-xs">{m.release_date?.slice(0, 4)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {selected && (
            <div className="flex items-center gap-3 bg-gray-800 rounded-2xl p-3 border border-purple-500/40">
              {posterUrl && <img src={posterUrl} alt="" className="w-12 h-16 object-cover rounded-xl" />}
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm truncate">{selected.title}</p>
                <p className="text-gray-500 text-xs">{selected.release_date?.slice(0, 4)}</p>
              </div>
              <button type="button" onClick={clearSelection} className="text-gray-500 hover:text-white text-xs shrink-0 transition-colors">Cambiar</button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">Título *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título de la película" required
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">Año *</label>
              <input value={year} onChange={e => setYear(e.target.value)} type="number" placeholder="2024" required
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">Puntuación <span className="text-gray-600">(opcional)</span></label>
              <input value={rating} onChange={e => setRating(e.target.value)} type="number" min="1" max="10" placeholder="No puntuada"
                className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">Género</label>
              <select value={genre} onChange={e => setGenre(e.target.value as Genre)}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all">
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
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">Estado</label>
              <select value={status} onChange={e => setStatus(e.target.value as Status)}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all">
                <option value="pendiente">Pendiente</option>
                <option value="vista">Vista</option>
                <option value="favorita">Favorita</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5 font-medium">Notas <span className="text-gray-600">(opcional)</span></label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="Opinión, recomendación..."
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all resize-none" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 text-white font-bold rounded-xl px-4 py-3 text-sm transition-all hover:shadow-lg hover:shadow-purple-500/30">
            {loading ? 'Añadiendo...' : 'Añadir película'}
          </button>
        </form>
      </div>
    </div>
  );
}
