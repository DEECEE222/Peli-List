export type Genre = 'accion' | 'comedia' | 'drama' | 'terror' | 'ciencia-ficcion' | 'animacion' | 'documental' | 'romance';
export type Status = 'vista' | 'pendiente' | 'favorita';

export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: Genre;
  status: Status;
  rating?: number;
  notes?: string;
  createdAt: string;
}

export interface CreateMovieInput {
  title: string;
  year: number;
  genre: Genre;
  status: Status;
  rating?: number;
  notes?: string;
}

export interface UpdateMovieInput extends Partial<CreateMovieInput> {}

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
