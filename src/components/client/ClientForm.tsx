import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, RefreshCwIcon } from 'lucide-react';
import { FormSection } from '../ui/FormSection';
import { TextField } from '../ui/TextField';
import { TextAreaField } from '../ui/TextAreaField';
import { ChoiceGroup } from '../ui/ChoiceGroup';
import { Button } from '../ui/Button';
import { statusOptions } from '../../data/hairOptions';
import { generatePassword } from '../../utils/crypto';
import { emptyClientInput } from '../../utils/evaluation';
import { buttonClasses } from '../../utils/buttonStyles';
import { FieldErrors, validateClientEditInput, validateClientInput } from '../../utils/validation';
import type { ClientEditableInput, ClientInput, ClientStatus } from '../../types/models';

interface BaseProps {
  submitting: boolean;
  serverErrors?: FieldErrors;
  cancelTo: string;
}

interface CreateProps extends BaseProps {
  mode?: 'create';
  onSubmit: (input: ClientInput) => Promise<void>;
}

interface EditProps extends BaseProps {
  mode: 'edit';
  initialValues: ClientEditableInput;
  onSubmit: (input: ClientEditableInput) => Promise<void>;
}

type ClientFormProps = CreateProps | EditProps;

export function ClientForm(props: ClientFormProps) {
  const { submitting, serverErrors, cancelTo } = props;
  const editing = props.mode === 'edit';
  const [form, setForm] = useState<ClientInput>(() =>
    editing
      ? { ...props.initialValues, password: '', lgpdConsent: true }
      : emptyClientInput(generatePassword())
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    if (serverErrors) setErrors(serverErrors);
  }, [serverErrors]);

  const set = <K extends keyof ClientInput,>(key: K, value: ClientInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as string]) {
      setErrors((current) => {
        const remaining = { ...current };
        delete remaining[key as string];
        return remaining;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = editing ? validateClientEditInput(form) : validateClientInput(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (props.mode === 'edit') {
      const { password, lgpdConsent, ...input } = form;
      void password;
      void lgpdConsent;
      await props.onSubmit(input);
    } else {
      await props.onSubmit(form);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-7">
      <FormSection number={1} title="Dados da cliente">
        <TextField
          label="Nome completo"
          required
          autoComplete="off"
          value={form.name}
          error={errors.name}
          onChange={(e) => set('name', e.target.value)} />
        
        <div className="grid gap-x-6 sm:grid-cols-2">
          <TextField
            label="Data de nascimento"
            type="date"
            value={form.birthDate}
            onChange={(e) => set('birthDate', e.target.value)} />
          
          <TextField
            label="Telefone / WhatsApp"
            type="tel"
            inputMode="tel"
            placeholder="(11) 90000-0000"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)} />
          
        </div>
      </FormSection>

      <FormSection number={2} title="Contato">
        <TextField
          label="Instagram"
          placeholder="@usuario"
          value={form.instagram}
          onChange={(e) => set('instagram', e.target.value)} />
        
        <TextField
          label="E-mail"
          type="email"
          required
          autoComplete="off"
          hint="Também será usado como login da cliente."
          value={form.email}
          error={errors.email}
          onChange={(e) => set('email', e.target.value)} />
        
        <TextField label="Endereço" value={form.address} onChange={(e) => set('address', e.target.value)} />
      </FormSection>

      <FormSection number={3} title="Perfil e preferências">
        <TextField
          label="Como conheceu o salão"
          value={form.howFound}
          onChange={(e) => set('howFound', e.target.value)} />
        
        <TextField
          label="Procedimentos que costuma realizar"
          value={form.usualProcedures}
          onChange={(e) => set('usualProcedures', e.target.value)} />
        
        <TextField label="Preferências" value={form.preferences} onChange={(e) => set('preferences', e.target.value)} />
      </FormSection>

      <FormSection number={4} title="Observações">
        <TextAreaField
          label="Observações importantes"
          placeholder="Alergias, sensibilidades, cuidados especiais… (visível apenas para o salão)"
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)} />
        
        <TextField
          label="Data do primeiro atendimento"
          type="date"
          className="sm:max-w-xs"
          value={form.firstVisit}
          onChange={(e) => set('firstVisit', e.target.value)} />
        
      </FormSection>

      <FormSection number={5} title="Acesso da cliente">
        {!editing && (
          <TextField
            label="Senha provisória"
            required
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            hint="Compartilhe com a cliente de forma privada. Mínimo de 8 caracteres."
            value={form.password}
            error={errors.password}
            onChange={(e) => set('password', e.target.value)}
            trailing={
              <>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="grid h-8 w-8 place-items-center rounded-full text-ink-muted transition-colors duration-150 hover:bg-petal/60 hover:text-wine">
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => set('password', generatePassword())}
                  aria-label="Gerar nova senha"
                  className="grid h-8 w-8 place-items-center rounded-full text-ink-muted transition-colors duration-150 hover:bg-petal/60 hover:text-wine">
                  <RefreshCwIcon className="h-4 w-4" />
                </button>
              </>
            } />
        )}
        <ChoiceGroup
          label="Status do acesso"
          options={statusOptions}
          value={form.status}
          onChange={(v: string) => set('status', (v || 'ativo') as ClientStatus)} />
      </FormSection>

      {!editing && (
        <div className="rounded-xl border border-gold/40 bg-blush px-4 py-4 sm:px-5">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 accent-wine"
              checked={form.lgpdConsent}
              aria-invalid={errors.lgpdConsent ? true : undefined}
              onChange={(e) => set('lgpdConsent', e.target.checked)} />
            <span className="text-sm leading-relaxed text-ink">
              Confirmo que a cliente autorizou o tratamento dos seus dados pessoais para fins de atendimento e
              acompanhamento, conforme a LGPD (Lei nº 13.709/2018).
            </span>
          </label>
          {errors.lgpdConsent && <p className="mt-2 pl-7 text-xs font-medium text-wine">{errors.lgpdConsent}</p>}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <Link to={cancelTo} className={buttonClasses('secondary', 'lg')}>
          Cancelar
        </Link>
        <Button type="submit" size="lg" loading={submitting}>
          {editing ? 'Salvar alterações' : 'Salvar cadastro'}
        </Button>
      </div>
    </form>);

}