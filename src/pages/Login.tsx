import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(''); setLoading(true);
    try { await login(email, password); navigate('/welcome'); }
    catch (err) { setError(err instanceof Error ? err.message : 'Error al iniciar sesión'); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex overflow-hidden">
      {/* Left side — decorative */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-gradient-to-br from-purple-950 via-gray-950 to-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/10" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />

        {/* Fake poster grid */}
        <div className="relative z-10 grid grid-cols-3 gap-3 p-8 rotate-6 scale-110">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={`w-28 aspect-[2/3] rounded-xl border border-white/10 bg-gradient-to-b ${
              ['from-purple-900','from-blue-900','from-red-900','from-green-900','from-yellow-900','from-pink-900','from-indigo-900','from-teal-900','from-orange-900'][i]
            } to-gray-900 opacity-60`} />
          ))}
        </div>

        <div className="absolute bottom-12 left-0 right-0 text-center z-20">
          <h1 className="text-4xl font-black text-white">🎬 Peli-List</h1>
          <p className="text-gray-400 mt-2">Tu cine personal</p>
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex-1 flex items-center justify-center px-6 relative">
        <div className="absolute inset-0 bg-gray-950">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-white">🎬 Peli-List</h1>
            <p className="text-gray-400 mt-1 text-sm">Tu cine personal</p>
          </div>

          <div className="bg-gray-900/80 backdrop-blur border border-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-black text-white mb-1">Bienvenido</h2>
            <p className="text-gray-500 text-sm mb-6">Inicia sesión para ver tu lista</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5" htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com" required
                  className="w-full bg-gray-800/80 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5" htmlFor="password">Contraseña</label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="w-full bg-gray-800/80 border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:opacity-50 text-white font-bold rounded-xl px-4 py-3 text-sm transition-all hover:shadow-lg hover:shadow-purple-500/30 mt-2">
                {loading ? 'Entrando...' : 'Entrar →'}
              </button>
            </form>

            <p className="text-center text-gray-600 text-sm mt-6">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                Regístrate gratis
              </Link>
            </p>
          </div>

          <p className="text-center mt-6">
            <Link to="/" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
              ← Volver al inicio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
