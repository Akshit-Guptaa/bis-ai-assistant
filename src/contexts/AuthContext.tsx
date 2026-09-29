'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
  name: string;
  role: string;
  isDemo: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginAsDemo: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('bis_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const u: User = {
      email,
      name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      role: 'Manufacturer / Applicant',
      isDemo: false,
    };
    setUser(u);
    localStorage.setItem('bis_user', JSON.stringify(u));
    router.push('/dashboard');
  };

  const loginAsDemo = () => {
    const u: User = {
      email: 'demo@bisai.gov.in',
      name: 'Demo User',
      role: 'Demo Account',
      isDemo: true,
    };
    setUser(u);
    localStorage.setItem('bis_user', JSON.stringify(u));
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bis_user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsDemo, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
