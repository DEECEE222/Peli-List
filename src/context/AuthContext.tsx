import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { authApi } from '../api/client';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    authApi.me()
      .then((u: User) => setUser(u))
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);

  const saveSession = (u: User, t: string) => {
    localStorage.setItem('token', t);
    setToken(t);
    setUser(u);
  };

  const login = async (email: string, password: string) => {
    const { user: u, token: t } = await authApi.login(email, password);
    saveSession(u, t);
  };

  const register = async (email: string, password: string, name: string) => {
    const { user: u, token: t } = await authApi.register(email, password, name);
    saveSession(u, t);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
