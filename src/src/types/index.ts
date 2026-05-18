export type Genre = 'accion' | 'comedia' | 'drama' | 'terror' | 'ciencia-ficcion' | 'animacion' | 'documental' | 'romance';
export type Status = 'vista' | 'pendiente' | 'favorita';

export interface Movie {
  id: string;
  userId: string;
  title: string;
  year: number;
  genre: Genre;
  status: Status;
  rating?: number;
  notes?: string;
  posterUrl?: string;
  tmdbId?: number;
  createdAt: string;
}

export interface CreateMovieInput {
  title: string;
  year: number;
  genre: Genre;
  status: Status;
  rating?: number;
  notes?: string;
  posterUrl?: string;
  tmdbId?: number;
}

export interface UpdateMovieInput extends Partial<CreateMovieInput> {}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  data: T;
  timestamp: string;
}

export interface ApiError {
  error: string;
  details?: unknown;
  timestamp: string;
}

export type NetworkState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

// TMDB types
export interface TmdbMovie {
  id: number;
  title: string;
  release_date: string;
  genre_ids: number[];
  poster_path: string | null;
  overview: string;
}

export interface TmdbSearchResponse {
  results: TmdbMovie[];
}
