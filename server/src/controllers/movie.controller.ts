import { Response } from 'express';
import { movieService } from '../services/movie.service';
import { createMovieSchema, updateMovieSchema } from '../validators/movie.validator';
import { AuthRequest } from '../middleware/auth.middleware';

const ts = () => new Date().toISOString();

export function getMovies(req: AuthRequest, res: Response): void {
  res.json({ data: movieService.getAll(req.userId!), timestamp: ts() });
}

export function getMovie(req: AuthRequest, res: Response): void {
  const id = req.params['id'] as string;
  const movie = movieService.getById(id, req.userId!);
  if (!movie) { res.status(404).json({ error: 'Película no encontrada', timestamp: ts() }); return; }
  res.json({ data: movie, timestamp: ts() });
}

export function createMovie(req: AuthRequest, res: Response): void {
  const result = createMovieSchema.safeParse(req.body);
  if (!result.success) { res.status(400).json({ error: 'Datos inválidos', details: result.error.flatten(), timestamp: ts() }); return; }
  res.status(201).json({ data: movieService.create(result.data, req.userId!), timestamp: ts() });
}

export function updateMovie(req: AuthRequest, res: Response): void {
  const id = req.params['id'] as string;
  const result = updateMovieSchema.safeParse(req.body);
  if (!result.success) { res.status(400).json({ error: 'Datos inválidos', details: result.error.flatten(), timestamp: ts() }); return; }
  const movie = movieService.update(id, result.data, req.userId!);
  if (!movie) { res.status(404).json({ error: 'Película no encontrada', timestamp: ts() }); return; }
  res.json({ data: movie, timestamp: ts() });
}

export function deleteMovie(req: AuthRequest, res: Response): void {
  const id = req.params['id'] as string;
  const deleted = movieService.delete(id, req.userId!);
  if (!deleted) { res.status(404).json({ error: 'Película no encontrada', timestamp: ts() }); return; }
  res.status(204).send();
}
