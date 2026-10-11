import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { api } from '../utils/api';
import type { Session } from '../types/models';

type AuthStatus = 'loading' | 'ready';

interface AuthContextValue {
  session: Session | null;
  token: string | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<Session>;
  logout: () => Promise<void>;
  expireSession: () => void;
}

const TOKEN_KEY = 'almeidahair:token';
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: {children: ReactNode;}) {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    const stored = sessionStorage.getItem(TOKEN_KEY);
    if (!stored) {
      setStatus('ready');
      return;
    }
    api.
    getSession(stored).
    then(setSession).
    catch(() => sessionStorage.removeItem(TOKEN_KEY)).
    finally(() => setStatus('ready'));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const next = await api.login(email, password);
    sessionStorage.setItem(TOKEN_KEY, next.token);
    setSession(next);
    return next;
  }, []);

  const logout = useCallback(async () => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    setSession(null);
    try {
      await api.logout(token);
    } catch {

      // Session is already cleared locally.
    }}, []);

  const expireSession = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setSession((current) => {
      if (current) toast.error('Sua sessão expirou. Entre novamente.');
      return null;
    });
  }, []);

  const value = useMemo(
    () => ({ session, token: session?.token ?? null, status, login, logout, expireSession }),
    [session, status, login, logout, expireSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}