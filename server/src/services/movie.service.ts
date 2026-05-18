import { Movie } from '../models/movie.model';
import { CreateMovieDto, UpdateMovieDto } from '../validators/movie.validator';

let movies: Movie[] = [];

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const movieService = {
  getAll: (userId: string): Movie[] => movies.filter(m => m.userId === userId),
  getById: (id: string, userId: string): Movie | undefined => movies.find(m => m.id === id && m.userId === userId),
  create: (dto: CreateMovieDto, userId: string): Movie => {
    const movie: Movie = { id: generateId(), userId, ...dto, createdAt: new Date().toISOString() };
    movies.push(movie);
    return movie;
  },
  update: (id: string, dto: UpdateMovieDto, userId: string): Movie | undefined => {
    const index = movies.findIndex(m => m.id === id && m.userId === userId);
    if (index === -1) return undefined;
    movies[index] = { ...movies[index], ...dto };
    return movies[index];
  },
  delete: (id: string, userId: string): boolean => {
    const before = movies.length;
    movies = movies.filter(m => !(m.id === id && m.userId === userId));
    return movies.length < before;
  },
};
