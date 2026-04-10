import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
      <p className="text-gray-500 mb-6">Página no encontrada</p>
      <Link to="/" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
        Volver al inicio
      </Link>
    </div>
  );
}
