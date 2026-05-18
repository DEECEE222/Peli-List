import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { searchTmdb, tmdbPosterUrl } from '../api/client';
import type { TmdbMovie } from '../types';

interface NavbarProps {
  search: string;
  onSearch: (v: string) => void;
  onSelectMovie?: (movie: TmdbMovie) => void;
}

export function Navbar({ search, onSearch, onSelectMovie }: NavbarProps) {
  const { user, logout } = useAuth();
  const [suggestions, setSuggestions] = useState<TmdbMovie[]>([]);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (search.length < 2) { setSuggestions([]); return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await searchTmdb(search);
        setSuggestions(res.results.slice(0, 6));
      } catch { setSuggestions([]); }
      finally { setSearching(false); }
    }, 400);
  }, [search]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(movie: TmdbMovie) {
    setSuggestions([]);
    onSearch('');
    onSelectMovie?.(movie);
  }

  return (
    <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-6 h-18 py-3 flex items-center gap-4">
        <h1 className="text-white font-black text-2xl tracking-tight shrink-0">
          🎬 <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Peli-List</span>
        </h1>

        <div className="flex-1 max-w-lg mx-auto relative" ref={wrapperRef}>
          <input
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Buscar película..."
            className="w-full bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
          {searching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              {suggestions.map(m => (
                <button key={m.id} onClick={() => handleSelect(m)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-left border-b border-gray-800 last:border-0">
                  {m.poster_path
                    ? <img src={tmdbPosterUrl(m.poster_path)} alt="" className="w-8 h-12 object-cover rounded-lg shrink-0" />
                    : <div className="w-8 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-lg shrink-0">🎬</div>}
                  <div className="min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{m.title}</p>
                    <p className="text-gray-500 text-xs">{m.release_date?.slice(0, 4)}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-auto">
          <span className="text-gray-400 text-sm hidden sm:block">
            Hola, <span className="text-white font-bold">{user?.name}</span>
          </span>
          <button onClick={logout}
            className="text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-purple-500 rounded-xl px-3 py-2 transition-all">
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
