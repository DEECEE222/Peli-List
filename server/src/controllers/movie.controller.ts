import { Request, Response } from 'express';
import { movieService } from '../services/movie.service';
import { createMovieSchema, updateMovieSchema } from '../validators/movie.validator';
import { AuthRequest } from '../middleware/auth.middleware';

const ts = () => new Date().toISOString();

export function getMovies(req: Request, res: Response): void {
  const userId = (req as AuthRequest).userId!;
  res.json({ data: movieService.getAll(userId), timestamp: ts() });
}

export function getMovie(req: Request, res: Response): void {
  const userId = (req as AuthRequest).userId!;
  const id = req.params['id'] as string;
  const movie = movieService.getById(id, userId);
  if (!movie) { res.status(404).json({ error: 'Película no encontrada', timestamp: ts() }); return; }
  res.json({ data: movie, timestamp: ts() });
}

export function createMovie(req: Request, res: Response): void {
  const userId = (req as AuthRequest).userId!;
  const result = createMovieSchema.safeParse(req.body);
  if (!result.success) { res.status(400).json({ error: 'Datos inválidos', details: result.error.flatten(), timestamp: ts() }); return; }
  res.status(201).json({ data: movieService.create(result.data, userId), timestamp: ts() });
}

export function updateMovie(req: Request, res: Response): void {
  const userId = (req as AuthRequest).userId!;
  const id = req.params['id'] as string;
  const result = updateMovieSchema.safeParse(req.body);
  if (!result.success) { res.status(400).json({ error: 'Datos inválidos', details: result.error.flatten(), timestamp: ts() }); return; }
  const movie = movieService.update(id, result.data, userId);
  if (!movie) { res.status(404).json({ error: 'Película no encontrada', timestamp: ts() }); return; }
  res.json({ data: movie, timestamp: ts() });
}

export function deleteMovie(req: Request, res: Response): void {
  const userId = (req as AuthRequest).userId!;
  const id = req.params['id'] as string;
  const deleted = movieService.delete(id, userId);
  if (!deleted) { res.status(404).json({ error: 'Película no encontrada', timestamp: ts() }); return; }
  res.status(204).send();
}
