import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onDelete: (id: string) => void;
  onClick: (movie: Movie) => void;
}

const statusConfig = {
  vista:     { label: 'Vista',     classes: 'bg-green-500/20 text-green-400 border-green-500/40' },
  pendiente: { label: 'Pendiente', classes: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
  favorita:  { label: '❤️ Fav',    classes: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
};

const genreLabels: Record<string, string> = {
  accion: 'Acción', comedia: 'Comedia', drama: 'Drama', terror: 'Terror',
  'ciencia-ficcion': 'Ciencia ficción', animacion: 'Animación', documental: 'Documental', romance: 'Romance',
};

export function MovieCard({ movie, onDelete, onClick }: MovieCardProps) {
  const status = statusConfig[movie.status];
  return (
    <div onClick={() => onClick(movie)}
      className="group relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/15 hover:-translate-y-1.5 flex flex-col cursor-pointer animate-fadeIn">
      <div className="relative aspect-[2/3] bg-gray-800 overflow-hidden">
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <span className="text-5xl">🎬</span>
            <p className="text-gray-600 text-xs text-center px-2">{movie.title}</p>
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <button onClick={e => { e.stopPropagation(); onDelete(movie.id); }}
            className="w-full bg-red-500/90 hover:bg-red-500 text-white text-xs rounded-lg py-2 transition-colors font-semibold">
            Eliminar
          </button>
        </div>

        {/* Status badge */}
        <div className="absolute top-2 right-2">
          <span className={`text-xs font-bold px-2 py-1 rounded-full border backdrop-blur-sm ${status.classes}`}>
            {status.label}
          </span>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-1">
        <h3 className="font-bold text-white text-xs leading-tight line-clamp-2">{movie.title}</h3>
        <p className="text-gray-500 text-xs">{movie.year} · {genreLabels[movie.genre] ?? movie.genre}</p>
        <p className={`text-xs font-medium mt-0.5 ${movie.rating ? 'text-yellow-400' : 'text-gray-600 italic'}`}>
          {movie.rating ? `⭐ ${movie.rating}/10` : 'No puntuada'}
        </p>
      </div>
    </div>
  );
}
