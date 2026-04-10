import { useState, useEffect, useCallback } from 'react';
import { movieApi } from '../api/client';
import type { Movie, CreateMovieInput, NetworkState } from '../types';

export function useMovies() {
  const [state, setState] = useState<NetworkState<Movie[]>>({ status: 'loading' });

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const data = await movieApi.getAll();
      setState({ status: 'success', data });
    } catch (err) {
      setState({ status: 'error', message: err instanceof Error ? err.message : 'Error desconocido' });
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const addMovie = useCallback(async (input: CreateMovieInput) => {
    const movie = await movieApi.create(input);
    setState(prev =>
      prev.status === 'success'
        ? { status: 'success', data: [...prev.data, movie] }
        : prev
    );
  }, []);

  const deleteMovie = useCallback(async (id: string) => {
    await movieApi.delete(id);
    setState(prev =>
      prev.status === 'success'
        ? { status: 'success', data: prev.data.filter(m => m.id !== id) }
        : prev
    );
  }, []);

  return { state, load, addMovie, deleteMovie };
}
