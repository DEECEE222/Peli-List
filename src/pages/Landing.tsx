import { Link } from 'react-router-dom';

const features = [
  { icon: '🎬', title: 'Tu lista personal', desc: 'Guarda todas las películas que quieres ver o ya has visto.' },
  { icon: '🔍', title: 'Búsqueda TMDB', desc: 'Busca cualquier película y añádela con póster y datos automáticos.' },
  { icon: '✨', title: 'Recomendaciones', desc: 'Descubre películas basadas en tus géneros favoritos.' },
  { icon: '❤️', title: 'Favoritas', desc: 'Marca tus películas favoritas y tenlas siempre a mano.' },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">🎬 Peli-List</h1>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-gray-400 hover:text-white text-sm transition-colors px-4 py-2">
            Iniciar sesión
          </Link>
          <Link to="/register" className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg px-4 py-2 transition-colors">
            Crear cuenta
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-16 pb-32">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <span className="inline-block bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-medium px-3 py-1 rounded-full mb-6">
            Tu cine personal
          </span>
          <h2 className="text-5xl sm:text-7xl font-black leading-tight mb-6">
            Todas tus películas
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              en un solo lugar
            </span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Crea tu lista, descubre recomendaciones personalizadas y nunca olvides una película que querías ver.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register"
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl px-8 py-4 text-base transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5">
              Empezar gratis →
            </Link>
            <Link to="/login"
              className="w-full sm:w-auto border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-xl px-8 py-4 text-base transition-colors">
              Ya tengo cuenta
            </Link>
          </div>
        </div>

        {/* Fake movie cards decoration */}
        <div className="relative z-10 mt-20 flex gap-3 justify-center overflow-hidden w-full">
          {['from-purple-900', 'from-blue-900', 'from-red-900', 'from-green-900', 'from-yellow-900', 'from-pink-900'].map((color, i) => (
            <div key={i}
              className={`shrink-0 w-24 sm:w-32 aspect-[2/3] rounded-xl bg-gradient-to-b ${color} to-gray-900 border border-white/5`}
              style={{ transform: `rotate(${(i - 2.5) * 3}deg) translateY(${Math.abs(i - 2.5) * 8}px)` }}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-purple-500/30 transition-colors">
              <span className="text-3xl mb-3 block">{f.icon}</span>
              <h3 className="font-bold text-white mb-1">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA bottom */}
      <section className="relative z-10 text-center pb-24 px-6">
        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/20 rounded-3xl max-w-2xl mx-auto p-12">
          <h3 className="text-3xl font-black text-white mb-3">¿Listo para empezar?</h3>
          <p className="text-gray-400 mb-8">Crea tu cuenta gratis y empieza a gestionar tu lista de películas.</p>
          <Link to="/register"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl px-10 py-4 transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5">
            Crear cuenta gratis →
          </Link>
        </div>
      </section>
    </div>
  );
}
