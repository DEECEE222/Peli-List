import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-center px-4">
      <div>
        <p className="text-6xl mb-4">🎬</p>
        <h1 className="text-3xl font-bold text-white mb-2">404</h1>
        <p className="text-gray-400 mb-6">Página no encontrada</p>
        <Link to="/" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition-colors">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
