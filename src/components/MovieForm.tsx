import { useState, FormEvent } from 'react';
import type { CreateMovieInput, Genre, Status } from '../types';

interface MovieFormProps {
  onSubmit: (input: CreateMovieInput) => Promise<void>;
}

export function MovieForm({ onSubmit }: MovieFormProps) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState<Genre>('accion');
  const [status, setStatus] = useState<Status>('pendiente');
  const [rating, setRating] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setError('El título es obligatorio'); return; }
    if (!year || isNaN(Number(year))) { setError('El año debe ser un número válido'); return; }

    setError('');
    setLoading(true);
    try {
      await onSubmit({ title: title.trim(), year: Number(year), genre, status, rating: rating ? Number(rating) : undefined, notes: notes.trim() || undefined });
      setTitle(''); setYear(''); setRating(''); setNotes('');
    } catch {
      setError('Error al añadir la película');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Añadir película</h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <div className="grid grid-cols-1 gap-3">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título *" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500" />
        <input value={year} onChange={e => setYear(e.target.value)} placeholder="Año *" type="number" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500" />
        <select value={genre} onChange={e => setGenre(e.target.value as Genre)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
          <option value="accion">Acción</option>
          <option value="comedia">Comedia</option>
          <option value="drama">Drama</option>
          <option value="terror">Terror</option>
          <option value="ciencia-ficcion">Ciencia ficción</option>
          <option value="animacion">Animación</option>
          <option value="documental">Documental</option>
          <option value="romance">Romance</option>
        </select>
        <select value={status} onChange={e => setStatus(e.target.value as Status)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
          <option value="pendiente">Pendiente</option>
          <option value="vista">Vista</option>
          <option value="favorita">Favorita</option>
        </select>
        <input value={rating} onChange={e => setRating(e.target.value)} placeholder="Puntuación (1-10)" type="number" min="1" max="10" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500" />
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notas (opcional)" rows={2} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 resize-none" />
        <button type="submit" disabled={loading} className="bg-purple-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50">
          {loading ? 'Añadiendo...' : 'Añadir película'}
        </button>
      </div>
    </form>
  );
}
