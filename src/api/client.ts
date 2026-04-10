import type { Movie, CreateMovieInput, UpdateMovieInput, ApiResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (res.status === 204) return undefined as T;

  const body: ApiResponse<T> = await res.json();

  if (!res.ok) throw new Error((body as unknown as { error: string }).error ?? `Error ${res.status}`);

  return body.data;
}

export const movieApi = {
  getAll: () => request<Movie[]>('/movies'),
  getById: (id: string) => request<Movie>(`/movies/${id}`),
  create: (input: CreateMovieInput) => request<Movie>('/movies', { method: 'POST', body: JSON.stringify(input) }),
  update: (id: string, input: UpdateMovieInput) => request<Movie>(`/movies/${id}`, { method: 'PUT', body: JSON.stringify(input) }),
  delete: (id: string) => request<void>(`/movies/${id}`, { method: 'DELETE' }),
};
