import { Request, Response } from 'express';
import { movieService } from '../services/movie.service';
import { createMovieSchema, updateMovieSchema } from '../validators/movie.validator';

const ts = () => new Date().toISOString();

export function getMovies(_req: Request, res: Response): void {
  res.json({ data: movieService.getAll(), timestamp: ts() });
}

export function getMovie(req: Request, res: Response): void {
  const movie = movieService.getById(req.params.id as string);
  if (!movie) { res.status(404).json({ error: 'Película no encontrada', timestamp: ts() }); return; }
  res.json({ data: movie, timestamp: ts() });
}

export function createMovie(req: Request, res: Response): void {
  const result = createMovieSchema.safeParse(req.body);
  if (!result.success) { res.status(400).json({ error: 'Datos inválidos', details: result.error.flatten(), timestamp: ts() }); return; }
  res.status(201).json({ data: movieService.create(result.data), timestamp: ts() });
}

export function updateMovie(req: Request, res: Response): void {
  const result = updateMovieSchema.safeParse(req.body);
  if (!result.success) { res.status(400).json({ error: 'Datos inválidos', details: result.error.flatten(), timestamp: ts() }); return; }
  const movie = movieService.update(req.params.id as string, result.data);
  if (!movie) { res.status(404).json({ error: 'Película no encontrada', timestamp: ts() }); return; }
  res.json({ data: movie, timestamp: ts() });
}

export function deleteMovie(req: Request, res: Response): void {
  const deleted = movieService.delete(req.params.id as string);
  if (!deleted) { res.status(404).json({ error: 'Película no encontrada', timestamp: ts() }); return; }
  res.status(204).send();
}
