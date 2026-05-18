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
  'accion': 'Acción', 'comedia': 'Comedia', 'drama': 'Drama', 'terror': 'Terror',
  'ciencia-ficcion': 'Ciencia ficción', 'animacion': 'Animación', 'documental': 'Documental', 'romance': 'Romance',
};

export function MovieCard({ movie, onDelete }: MovieCardProps) {
  const status = statusConfig[movie.status];

  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-200 hover:shadow-xl hover:shadow-black/40 flex flex-col">
      {/* Poster */}
      <div className="relative aspect-[2/3] bg-gray-800 overflow-hidden">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl">🎬</span>
          </div>
        )}
        {/* Status badge over poster */}
        <div className="absolute top-2 right-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full border backdrop-blur-sm ${status.classes}`}>
            {status.label}
          </span>
        </div>
        {/* Delete button on hover */}
        <button
          onClick={() => onDelete(movie.id)}
          className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/80 hover:bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs backdrop-blur-sm"
          title="Eliminar"
        >
          ✕
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-bold text-white text-sm leading-tight line-clamp-2">{movie.title}</h3>
        <p className="text-gray-500 text-xs">
          {movie.year} · {genreLabels[movie.genre] ?? movie.genre}
        </p>
        {movie.rating && (
          <p className="text-yellow-400 text-xs mt-1">{'⭐'.repeat(Math.round(movie.rating / 2))} {movie.rating}/10</p>
        )}
        {movie.notes && (
          <p className="text-gray-500 text-xs italic mt-1 line-clamp-2">"{movie.notes}"</p>
        )}
      </div>
    </div>
  );
}
