import { z } from 'zod';

const genreSchema = z.enum(['accion', 'comedia', 'drama', 'terror', 'ciencia-ficcion', 'animacion', 'documental', 'romance']);
const statusSchema = z.enum(['vista', 'pendiente', 'favorita']);

export const createMovieSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio').max(200).trim(),
  year: z.number().int().min(1888).max(new Date().getFullYear() + 2),
  genre: genreSchema,
  status: statusSchema,
  rating: z.number().min(1).max(10).optional(),
  notes: z.string().max(500).optional(),
});

export const updateMovieSchema = createMovieSchema.partial();

export type CreateMovieDto = z.infer<typeof createMovieSchema>;
export type UpdateMovieDto = z.infer<typeof updateMovieSchema>;
