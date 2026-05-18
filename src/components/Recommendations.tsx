import { useEffect, useState } from 'react';
import type { Movie, Genre, CreateMovieInput, TmdbMovie } from '../types';
import { tmdbPosterUrl, tmdbGenreToLocal } from '../api/client';

interface RecommendationsProps {
  movies: Movie[];
  onAdd: (input: CreateMovieInput) => Promise<void>;
}

const TMDB_GENRE_IDS: Record<Genre, number> = {
  accion: 28, comedia: 35, drama: 18, terror: 27,
  'ciencia-ficcion': 878, animacion: 16, documental: 99, romance: 10749,
};

const genreLabels: Record<string, string> = {
  accion: 'Acción', comedia: 'Comedia', drama: 'Drama', terror: 'Terror',
  'ciencia-ficcion': 'Ciencia ficción', animacion: 'Animación', documental: 'Documental', romance: 'Romance',
};

export function Recommendations({ movies, onAdd }: RecommendationsProps) {
  const [recs, setRecs] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState<number | null>(null);

  function getFavoriteGenre(): Genre | null {
    if (movies.length === 0) return null;
    const counts: Partial<Record<Genre, number>> = {};
    for (const m of movies) {
      counts[m.genre] = (counts[m.genre] ?? 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Genre;
  }

  useEffect(() => {
    const genre = getFavoriteGenre();
    if (!genre) return;
    setLoading(true);
    const genreId = TMDB_GENRE_IDS[genre];
    fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&language=es-ES&page=1`,
      { headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` } }
    )
      .then(r => r.json())
      .then(data => {
        const existingTmdbIds = new Set(movies.map(m => m.tmdbId).filter(Boolean));
        const filtered = (data.results as TmdbMovie[])
          .filter(m => !existingTmdbIds.has(m.id))
          .slice(0, 10);
        setRecs(filtered);
      })
      .catch(() => setRecs([]))
      .finally(() => setLoading(false));
  }, [movies.length]);

  async function handleAdd(movie: TmdbMovie) {
    setAdding(movie.id);
    try {
      await onAdd({
        title: movie.title,
        year: Number(movie.release_date?.slice(0, 4) ?? new Date().getFullYear()),
        genre: tmdbGenreToLocal(movie.genre_ids),
        status: 'pendiente',
        posterUrl: tmdbPosterUrl(movie.poster_path),
        tmdbId: movie.id,
      });
    } finally {
      setAdding(null);
    }
  }

  const genre = getFavoriteGenre();
  if (!genre || (recs.length === 0 && !loading)) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gray-800" />
        <h2 className="text-gray-400 text-sm font-medium whitespace-nowrap">
          ✨ Recomendado para ti · <span className="text-purple-400">{genreLabels[genre]}</span>
        </h2>
        <div className="h-px flex-1 bg-gray-800" />
      </div>
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {!loading && recs.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recs.map((movie, i) => (
            <div key={movie.id}
              className="group relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 animate-fadeIn"
              style={{ animationDelay: `${i * 60}ms` }}>
              <div className="relative aspect-[2/3] bg-gray-800 overflow-hidden">
                {movie.poster_path ? (
                  <img src={tmdbPosterUrl(movie.poster_path)} alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">🎬</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <p className="text-white font-bold text-xs leading-tight">{movie.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{movie.release_date?.slice(0, 4)}</p>
                  <button onClick={() => handleAdd(movie)} disabled={adding === movie.id}
                    className="mt-2 w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs rounded-lg py-1.5 transition-colors">
                    {adding === movie.id ? 'Añadiendo...' : '+ Añadir a mi lista'}
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-white text-xs leading-tight line-clamp-1">{movie.title}</h3>
                <p className="text-gray-500 text-xs">{movie.release_date?.slice(0, 4)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
