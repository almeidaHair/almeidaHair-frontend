import React, { FormEvent, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { toast } from 'sonner';
import { BackLink } from '../components/ui/BackLink';
import { Button } from '../components/ui/Button';
import { FormSection } from '../components/ui/FormSection';
import { TextField } from '../components/ui/TextField';
import { useAuth } from '../contexts/AuthContext';
import { ApiError } from '../utils/apiError';
import { homeFor } from '../utils/routes';
import {
  FieldErrors,
  validatePasswordChange,
  validateProfileInput
} from '../utils/validation';

export function Profile() {
  const { session, updateProfile, changePassword } = useAuth();
  const [name, setName] = useState(session?.name ?? '');
  const [email, setEmail] = useState(session?.email ?? '');
  const [profileErrors, setProfileErrors] = useState<FieldErrors>({});
  const [profileMessage, setProfileMessage] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<FieldErrors>({});
  const [passwordMessage, setPasswordMessage] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  if (!session) return null;

  const clearProfileError = (field: string) => {
    setProfileErrors((current) => {
      const remaining = { ...current };
      delete remaining[field];
      return remaining;
    });
  };

  const clearPasswordError = (field: string) => {
    setPasswordErrors((current) => {
      const remaining = { ...current };
      delete remaining[field];
      return remaining;
    });
  };

  const handleProfileSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setProfileMessage('');
    const input = { name, email };
    const errors = validateProfileInput(input);
    setProfileErrors(errors);
    if (Object.keys(errors).length) return;

    setSavingProfile(true);
    try {
      const updated = await updateProfile(input);
      setName(updated.name);
      setEmail(updated.email);
      toast.success('Dados da conta atualizados.');
    } catch (error) {
      if (error instanceof ApiError) {
        setProfileErrors(error.fieldErrors ?? {});
        setProfileMessage(error.message);
      } else {
        setProfileMessage('Não foi possível atualizar os dados. Tente novamente.');
      }
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setPasswordMessage('');
    const errors = validatePasswordChange(currentPassword, newPassword, passwordConfirmation);
    setPasswordErrors(errors);
    if (Object.keys(errors).length) return;

    setSavingPassword(true);
    try {
      await changePassword({ currentPassword, newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setPasswordConfirmation('');
      setShowPasswords(false);
      toast.success('Senha alterada com sucesso.');
    } catch (error) {
      if (error instanceof ApiError) {
        setPasswordErrors(error.fieldErrors ?? {});
        setPasswordMessage(error.message);
      } else {
        setPasswordMessage('Não foi possível alterar a senha. Tente novamente.');
      }
    } finally {
      setSavingPassword(false);
    }
  };

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPasswords((current) => !current)}
      aria-label={showPasswords ? 'Ocultar senhas' : 'Mostrar senhas'}
      className="grid h-8 w-8 place-items-center rounded-full text-ink-muted transition-colors duration-150 hover:bg-petal/60 hover:text-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine/30">
      {showPasswords ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
    </button>
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <BackLink to={homeFor(session.role)}>Voltar para o início</BackLink>
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-wine">Minha conta</p>
        <h1 className="mt-1 font-serif text-3xl text-ink">Perfil</h1>
        <p className="mt-2 text-sm text-ink-muted">Atualize seus dados de acesso e sua senha.</p>
      </header>

      <form noValidate onSubmit={handleProfileSubmit}>
        <FormSection number={1} title="Dados da conta">
          <TextField
            label="Nome"
            autoComplete="name"
            required
            value={name}
            error={profileErrors.name}
            onChange={(event) => {
              setName(event.target.value);
              clearProfileError('name');
              setProfileMessage('');
            }}
          />
          <TextField
            label="E-mail"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            error={profileErrors.email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearProfileError('email');
              setProfileMessage('');
            }}
          />
          {profileMessage && <p role="alert" className="mt-2 text-sm text-wine">{profileMessage}</p>}
          <div className="mt-4 flex justify-end">
            <Button type="submit" loading={savingProfile}>Salvar dados</Button>
          </div>
        </FormSection>
      </form>

      <form noValidate onSubmit={handlePasswordSubmit}>
        <FormSection number={2} title="Alterar senha">
          <TextField
            label="Senha atual"
            type={showPasswords ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={currentPassword}
            error={passwordErrors.currentPassword}
            onChange={(event) => {
              setCurrentPassword(event.target.value);
              clearPasswordError('currentPassword');
              setPasswordMessage('');
            }}
          />
          <TextField
            label="Nova senha"
            type={showPasswords ? 'text' : 'password'}
            autoComplete="new-password"
            required
            hint="Use pelo menos 8 caracteres."
            value={newPassword}
            error={passwordErrors.newPassword}
            onChange={(event) => {
              setNewPassword(event.target.value);
              clearPasswordError('newPassword');
              setPasswordMessage('');
            }}
          />
          <TextField
            label="Confirmar nova senha"
            type={showPasswords ? 'text' : 'password'}
            autoComplete="new-password"
            required
            trailing={passwordToggle}
            value={passwordConfirmation}
            error={passwordErrors.passwordConfirmation}
            onChange={(event) => {
              setPasswordConfirmation(event.target.value);
              clearPasswordError('passwordConfirmation');
              setPasswordMessage('');
            }}
          />
          {passwordMessage && <p role="alert" className="mt-2 text-sm text-wine">{passwordMessage}</p>}
          <div className="mt-4 flex justify-end">
            <Button type="submit" loading={savingPassword}>Alterar senha</Button>
          </div>
        </FormSection>
      </form>
    </div>
  );
}
