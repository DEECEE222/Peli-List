import { createContext, useContext, ReactNode } from 'react';
import { useMovies } from '../hooks/useMovies';
import type { CreateMovieInput, Movie, NetworkState } from '../types';

interface MovieContextType {
  state: NetworkState<Movie[]>;
  addMovie: (input: CreateMovieInput) => Promise<void>;
  deleteMovie: (id: string) => Promise<void>;
  reload: () => void;
}

const MovieContext = createContext<MovieContextType | null>(null);

export function MovieProvider({ children }: { children: ReactNode }) {
  const { state, load, addMovie, deleteMovie } = useMovies();
  return (
    <MovieContext.Provider value={{ state, addMovie, deleteMovie, reload: load }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovieContext() {
  const ctx = useContext(MovieContext);
  if (!ctx) throw new Error('useMovieContext debe usarse dentro de MovieProvider');
  return ctx;
}
