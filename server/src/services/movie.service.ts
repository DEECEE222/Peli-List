import { Movie } from '../models/movie.model';
import { CreateMovieDto, UpdateMovieDto } from '../validators/movie.validator';

let movies: Movie[] = [
  { id: '1', title: 'Interstellar', year: 2014, genre: 'ciencia-ficcion', status: 'vista', rating: 9, createdAt: new Date().toISOString() },
  { id: '2', title: 'El Padrino', year: 1972, genre: 'drama', status: 'favorita', rating: 10, createdAt: new Date().toISOString() },
  { id: '3', title: 'Inception', year: 2010, genre: 'ciencia-ficcion', status: 'pendiente', createdAt: new Date().toISOString() },
];

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const movieService = {
  getAll: (): Movie[] => movies,

  getById: (id: string): Movie | undefined => movies.find(m => m.id === id),

  create: (dto: CreateMovieDto): Movie => {
    const movie: Movie = { id: generateId(), ...dto, createdAt: new Date().toISOString() };
    movies.push(movie);
    return movie;
  },

  update: (id: string, dto: UpdateMovieDto): Movie | undefined => {
    const index = movies.findIndex(m => m.id === id);
    if (index === -1) return undefined;
    movies[index] = { ...movies[index], ...dto };
    return movies[index];
  },

  delete: (id: string): boolean => {
    const before = movies.length;
    movies = movies.filter(m => m.id !== id);
    return movies.length < before;
  },
};
