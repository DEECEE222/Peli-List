import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onDelete: (id: string) => void;
}

const statusColors = {
  vista: 'bg-green-100 text-green-800',
  pendiente: 'bg-yellow-100 text-yellow-800',
  favorita: 'bg-purple-100 text-purple-800',
};

const statusLabels = {
  vista: 'Vista',
  pendiente: 'Pendiente',
  favorita: 'Favorita',
};

export function MovieCard({ movie, onDelete }: MovieCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{movie.title}</h3>
          <p className="text-gray-500 text-sm">{movie.year} · {movie.genre}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[movie.status]}`}>
          {statusLabels[movie.status]}
        </span>
      </div>
      {movie.rating && (
        <p className="text-sm text-gray-600 mb-2">⭐ {movie.rating}/10</p>
      )}
      {movie.notes && (
        <p className="text-sm text-gray-500 italic mb-3">"{movie.notes}"</p>
      )}
      <button
        onClick={() => onDelete(movie.id)}
        className="text-xs text-red-500 hover:text-red-700 transition-colors"
      >
        Eliminar
      </button>
    </div>
  );
}
