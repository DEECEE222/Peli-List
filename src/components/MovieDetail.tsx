import { useEffect, useState } from 'react';
import type { Movie } from '../types';

interface Provider {
  provider_name: string;
  logo_path: string;
}

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
}

const genreLabels: Record<string, string> = {
  accion: 'Acción', comedia: 'Comedia', drama: 'Drama', terror: 'Terror',
  'ciencia-ficcion': 'Ciencia ficción', animacion: 'Animación', documental: 'Documental', romance: 'Romance',
};

const statusConfig = {
  vista:     { label: 'Vista',     classes: 'bg-green-500/20 text-green-400 border-green-500/40' },
  pendiente: { label: 'Pendiente', classes: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
  favorita:  { label: '❤️ Favorita', classes: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
};

export function MovieDetail({ movie, onClose }: MovieDetailProps) {
  const [overview, setOverview] = useState<string>('');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const status = statusConfig[movie.status];

  useEffect(() => {
    if (!movie.tmdbId) return;
    setLoadingDetails(true);

    // Fetch movie details + watch providers
    Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${movie.tmdbId}?language=es-ES`, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` }
      }).then(r => r.json()),
      fetch(`https://api.themoviedb.org/3/movie/${movie.tmdbId}/watch/providers`, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` }
      }).then(r => r.json()),
    ])
      .then(([details, watchData]) => {
        setOverview(details.overview ?? '');
        const esProviders = watchData?.results?.ES ?? watchData?.results?.US ?? {};
        const flat: Provider[] = [
          ...(esProviders.flatrate ?? []),
          ...(esProviders.free ?? []),
          ...(esProviders.ads ?? []),
        ].slice(0, 6);
        setProviders(flat);
      })
      .catch(() => {})
      .finally(() => setLoadingDetails(false));
  }, [movie.tmdbId]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}>

        {/* Header with poster */}
        <div className="relative">
          {movie.posterUrl && (
            <div className="absolute inset-0 overflow-hidden rounded-t-3xl">
              <img src={movie.posterUrl} alt="" className="w-full h-full object-cover opacity-20 blur-sm scale-110" />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900" />
            </div>
          )}
          <div className="relative z-10 flex gap-6 p-6">
            {movie.posterUrl ? (
              <img src={movie.posterUrl} alt={movie.title}
                className="w-32 shrink-0 rounded-2xl shadow-2xl border border-white/10" />
            ) : (
              <div className="w-32 aspect-[2/3] shrink-0 bg-gray-800 rounded-2xl flex items-center justify-center text-4xl">🎬</div>
            )}
            <div className="flex flex-col justify-end min-w-0">
              <h2 className="text-2xl font-black text-white leading-tight">{movie.title}</h2>
              <p className="text-gray-400 text-sm mt-1">{movie.year} · {genreLabels[movie.genre] ?? movie.genre}</p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${status.classes}`}>
                  {status.label}
                </span>
                <span className={`text-sm font-bold ${movie.rating ? 'text-yellow-400' : 'text-gray-600 italic'}`}>
                  {movie.rating ? `⭐ ${movie.rating}/10` : 'No puntuada'}
                </span>
              </div>
            </div>
            <button onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors">
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-5">
          {/* Synopsis */}
          <div>
            <h3 className="text-white font-bold text-sm mb-2 uppercase tracking-wider text-gray-500">Sinopsis</h3>
            {loadingDetails ? (
              <div className="h-16 bg-gray-800 rounded-xl animate-pulse" />
            ) : overview ? (
              <p className="text-gray-300 text-sm leading-relaxed">{overview}</p>
            ) : (
              <p className="text-gray-600 text-sm italic">No hay sinopsis disponible.</p>
            )}
          </div>

          {/* Where to watch */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3 uppercase tracking-wider text-gray-500">Dónde ver</h3>
            {loadingDetails ? (
              <div className="flex gap-2">
                {[1,2,3].map(i => <div key={i} className="w-10 h-10 bg-gray-800 rounded-xl animate-pulse" />)}
              </div>
            ) : providers.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {providers.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2">
                    <img src={`https://image.tmdb.org/t/p/w45${p.logo_path}`} alt={p.provider_name}
                      className="w-6 h-6 rounded-md" />
                    <span className="text-white text-xs font-medium">{p.provider_name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm italic">No hay información de plataformas disponible.</p>
            )}
          </div>

          {/* Notes */}
          {movie.notes && (
            <div>
              <h3 className="text-white font-bold text-sm mb-2 uppercase tracking-wider text-gray-500">Tus notas</h3>
              <p className="text-gray-400 text-sm italic bg-gray-800 rounded-xl px-4 py-3">"{movie.notes}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
