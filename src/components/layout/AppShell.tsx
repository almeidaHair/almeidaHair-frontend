import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LogOutIcon, MoonIcon, ShieldCheckIcon, SunIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { homeFor } from '../../utils/routes';
import { BrandMark } from '../brand/BrandMark';
import { Avatar } from '../ui/Avatar';

export function AppShell() {
  const { session, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  if (!session) return null;

  const handleLogout = async () => {
    await logout();
    toast.success('Você saiu com segurança.');
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-blush">
      <header className="sticky top-0 z-20 border-b border-gold/40 bg-surface/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            to={homeFor(session.role)}
            className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine/30"
            aria-label="almeidaHair — início">
            
            <BrandMark />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/perfil"
              aria-label="Abrir perfil da conta"
              className="flex items-center gap-3 rounded-lg p-1 transition-colors duration-150 hover:bg-petal/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine/30">
              <Avatar name={session.name} size="sm" />
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-medium text-ink">{session.name}</p>
                <p className="text-xs text-ink-muted">{session.role === 'admin' ? 'Administração' : 'Área da cliente'}</p>
              </div>
            </Link>
            <span aria-hidden="true" className="h-8 w-px bg-line" />
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
              aria-pressed={theme === 'dark'}
              title={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink-muted transition-colors duration-150 hover:bg-petal/60 hover:text-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine/30">
              {theme === 'light' ? (
                <MoonIcon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <SunIcon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-9 items-center gap-2 rounded-full px-3 text-sm font-medium text-ink-muted transition-colors duration-150 hover:bg-petal/60 hover:text-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine/30">
              
              <LogOutIcon className="h-4 w-4" aria-hidden="true" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-line/70 py-6">
        <p className="mx-auto flex max-w-5xl items-center justify-center gap-1.5 px-4 text-center text-xs text-ink-muted">
          <ShieldCheckIcon className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
          Dados pessoais protegidos e tratados conforme a LGPD.
        </p>
      </footer>
    </div>);

}