import React, { FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircleIcon, EyeIcon, EyeOffIcon, ShieldCheckIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SheetFrame } from '../components/brand/SheetFrame';
import { OrnamentDivider } from '../components/brand/OrnamentDivider';
import { BrandMark } from '../components/brand/BrandMark';
import { TextField } from '../components/ui/TextField';
import { Button } from '../components/ui/Button';
import { LoadingState } from '../components/ui/LoadingState';
import { homeFor } from '../utils/routes';
import { isValidEmail } from '../utils/validation';

export function Login() {
  const { session, status, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (status === 'loading') {
    return (
      <div className="min-h-screen w-full bg-blush">
        <LoadingState />
      </div>);

  }
  if (session) return <Navigate to={homeFor(session.role)} replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isValidEmail(email) || !password) {
      setError('Informe seu e-mail e sua senha.');
      return;
    }
    setSubmitting(true);
    try {
      const next = await login(email, password);
      const from = (location.state as {from?: string;} | null)?.from;
      const home = homeFor(next.role);
      navigate(from && from.startsWith(home) ? from : home, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar. Tente novamente.');
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-blush px-4 py-10">
      <main className="w-full max-w-md">
        <SheetFrame floral>
          <header className="text-center">
            <OrnamentDivider variant="ring" />
            <span className="mt-2 inline-block rounded-full border-2 border-gold/70 bg-wine px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              Área exclusiva
            </span>
            <h1 className="mt-6">
              <BrandMark size="lg" />
            </h1>
            <div className="mt-4">
              <OrnamentDivider />
            </div>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              Acesse sua ficha, avaliações e o histórico de cuidados com o seu cabelo.
            </p>
          </header>

          <form noValidate onSubmit={handleSubmit} className="mt-7 space-y-2">
            <TextField
              label="E-mail"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            
            <TextField
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              trailing={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                className="grid h-8 w-8 place-items-center rounded-full text-ink-muted transition-colors duration-150 hover:bg-petal/60 hover:text-wine">
                
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              } />
            

            {error &&
            <div role="alert" className="flex items-start gap-2 rounded-lg bg-petal/70 px-3 py-2.5 text-sm text-wine">
                <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {error}
              </div>
            }

            <div className="pt-4">
              <Button type="submit" size="lg" loading={submitting} className="w-full">
                Entrar
              </Button>
            </div>
          </form>
        </SheetFrame>

        <p className="mt-5 flex items-start justify-center gap-1.5 px-4 text-center text-xs leading-relaxed text-ink-muted">
          <ShieldCheckIcon className="mt-px h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
          O acesso é criado pelo salão. Seus dados são protegidos e tratados conforme a LGPD.
        </p>
      </main>
    </div>);

}