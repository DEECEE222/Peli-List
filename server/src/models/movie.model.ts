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

export interface ApiResponse<T> {
  data: T;
  timestamp: string;
}
