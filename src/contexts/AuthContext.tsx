import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { api } from '../utils/api';
import type { ChangePasswordInput, ProfileInput, Session } from '../types/models';

type AuthStatus = 'loading' | 'ready';

interface AuthContextValue {
  session: Session | null;
  token: string | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<Session>;
  logout: () => Promise<void>;
  updateProfile: (input: ProfileInput) => Promise<Session>;
  changePassword: (input: ChangePasswordInput) => Promise<void>;
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

  const updateProfile = useCallback(async (input: ProfileInput) => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const updatedSession = await api.updateProfile(token, input);
    setSession(updatedSession);
    return updatedSession;
  }, []);

  const changePassword = useCallback(async (input: ChangePasswordInput) => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    await api.changePassword(token, input);
  }, []);

  const expireSession = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setSession((current) => {
      if (current) toast.error('Sua sessão expirou. Entre novamente.');
      return null;
    });
  }, []);

  const value = useMemo(
    () => ({
      session,
      token: session?.token ?? null,
      status,
      login,
      logout,
      updateProfile,
      changePassword,
      expireSession
    }),
    [session, status, login, logout, updateProfile, changePassword, expireSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}