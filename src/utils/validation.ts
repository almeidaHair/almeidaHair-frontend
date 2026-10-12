import type { ClientInput, EvaluationInput, ProfileInput } from '../types/models';

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function validateProfileInput(input: ProfileInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.name.trim()) errors.name = 'Informe o nome completo.';
  if (!isValidEmail(input.email)) errors.email = 'Informe um e-mail válido.';
  return errors;
}

export function validatePasswordChange(
  currentPassword: string,
  newPassword: string,
  passwordConfirmation: string
): FieldErrors {
  const errors: FieldErrors = {};
  if (!currentPassword) errors.currentPassword = 'Informe a senha atual.';
  if (newPassword.length < 8) errors.newPassword = 'A senha deve ter pelo menos 8 caracteres.';
  if (passwordConfirmation !== newPassword) errors.passwordConfirmation = 'As senhas não coincidem.';
  return errors;
}

export function validateClientInput(input: ClientInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.name.trim()) errors.name = 'Informe o nome completo.';
  if (!isValidEmail(input.email)) errors.email = 'Informe um e-mail válido.';
  if (input.password.length < 8) errors.password = 'A senha deve ter pelo menos 8 caracteres.';
  if (!input.lgpdConsent) errors.lgpdConsent = 'É necessário registrar o consentimento da cliente.';
  return errors;
}

export function validateEvaluationInput(input: EvaluationInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.date) errors.date = 'Informe a data da avaliação.';
  if (!input.professional.diagnosis.trim()) errors.diagnosis = 'Descreva o diagnóstico.';
  return errors;
}