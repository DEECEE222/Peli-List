import type { Movie, CreateMovieInput, UpdateMovieInput, ApiResponse, AuthResponse, TmdbSearchResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

// --- Internal helpers ---

function getToken(): string | null {
  return localStorage.getItem('token');
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { headers, ...options });
  if (res.status === 204) return undefined as T;

  const body: ApiResponse<T> = await res.json();
  if (!res.ok) throw new Error((body as unknown as { error: string }).error ?? `Error ${res.status}`);
  return body.data;
}

// --- Auth API ---

export const authApi = {
  register: (email: string, password: string, name: string) =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),

  login: (email: string, password: string) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: () => request<AuthResponse['user']>('/auth/me'),
};

// --- Movies API ---

export const movieApi = {
  getAll: () => request<Movie[]>('/movies'),
  getById: (id: string) => request<Movie>(`/movies/${id}`),
  create: (input: CreateMovieInput) =>
    request<Movie>('/movies', { method: 'POST', body: JSON.stringify(input) }),
  update: (id: string, input: UpdateMovieInput) =>
    request<Movie>(`/movies/${id}`, { method: 'PUT', body: JSON.stringify(input) }),
  delete: (id: string) => request<void>(`/movies/${id}`, { method: 'DELETE' }),
};

// --- TMDB API ---

const TMDB_GENRE_MAP: Record<number, string> = {
  28: 'accion', 35: 'comedia', 18: 'drama', 27: 'terror',
  878: 'ciencia-ficcion', 16: 'animacion', 99: 'documental', 10749: 'romance',
};

export function tmdbGenreToLocal(genreIds: number[]): import('../types').Genre {
  for (const id of genreIds) {
    if (TMDB_GENRE_MAP[id]) return TMDB_GENRE_MAP[id] as import('../types').Genre;
  }
  return 'drama';
}

export async function searchTmdb(query: string): Promise<TmdbSearchResponse> {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=es-ES&page=1`,
    { headers: { Authorization: `Bearer ${TMDB_TOKEN}`, 'Content-Type': 'application/json' } }
  );
  if (!res.ok) throw new Error('Error buscando en TMDB');
  return res.json();
}

export function tmdbPosterUrl(path: string | null): string | undefined {
  if (!path) return undefined;
  return `https://image.tmdb.org/t/p/w300${path}`;
}
