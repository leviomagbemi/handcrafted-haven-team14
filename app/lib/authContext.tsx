'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export type UserRole = 'buyer' | 'artisan';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image_url?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (token: string, userData: AuthUser) => void;
  logout: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Decode JWT payload without a library (base64url → JSON). */
function decodeJwt(token: string): Partial<AuthUser> | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function loadUserFromStorage(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('auth_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Rehydrate from localStorage on mount (client only)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = loadUserFromStorage();

    if (token && storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  /**
   * Call this after a successful login response.
   * Persists the token + user data so state survives a hard refresh.
   */
  const login = (token: string, userData: AuthUser) => {
    localStorage.setItem('token', token);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('auth_user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
