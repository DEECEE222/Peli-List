import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  search: string;
  onSearch: (v: string) => void;
}

export function Navbar({ search, onSearch }: NavbarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
        <h1 className="text-white font-bold text-xl shrink-0">🎬 Peli-List</h1>

        <div className="flex-1 max-w-md mx-auto">
          <input
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Buscar película..."
            className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-auto">
          <span className="text-gray-400 text-sm hidden sm:block">
            Hola, <span className="text-white font-medium">{user?.name}</span>
          </span>
          <button
            onClick={logout}
            className="text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded-lg px-3 py-1.5 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
