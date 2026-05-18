import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onDelete: (id: string) => void;
}

const statusConfig = {
  vista:     { label: 'Vista',     classes: 'bg-green-500/20 text-green-400 border-green-500/30' },
  pendiente: { label: 'Pendiente', classes: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  favorita:  { label: '❤️ Favorita', classes: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
};

const genreLabels: Record<string, string> = {
  accion: 'Acción', comedia: 'Comedia', drama: 'Drama', terror: 'Terror',
  'ciencia-ficcion': 'Ciencia ficción', animacion: 'Animación', documental: 'Documental', romance: 'Romance',
};

export function MovieCard({ movie, onDelete }: MovieCardProps) {
  const status = statusConfig[movie.status];
  return (
    <div className="group relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 flex flex-col animate-fadeIn">
      <div className="relative aspect-[2/3] bg-gray-800 overflow-hidden">
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl">🎬</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <p className="text-white font-bold text-sm leading-tight">{movie.title}</p>
          <p className="text-gray-300 text-xs mt-0.5">{movie.year} · {genreLabels[movie.genre] ?? movie.genre}</p>
          {movie.rating && <p className="text-yellow-400 text-xs mt-1">⭐ {movie.rating}/10</p>}
          {movie.notes && <p className="text-gray-400 text-xs italic mt-1 line-clamp-2">"{movie.notes}"</p>}
          <button onClick={() => onDelete(movie.id)}
            className="mt-2 w-full bg-red-500/80 hover:bg-red-500 text-white text-xs rounded-lg py-1.5 transition-colors">
            Eliminar
          </button>
        </div>

        {/* Status badge */}
        <div className="absolute top-2 right-2 group-hover:opacity-0 transition-opacity duration-200">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full border backdrop-blur-sm ${status.classes}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Info below poster */}
      <div className="p-3 flex flex-col gap-0.5">
        <h3 className="font-bold text-white text-xs leading-tight line-clamp-1">{movie.title}</h3>
        <p className="text-gray-500 text-xs">{movie.year}</p>
      </div>
    </div>
  );
}
