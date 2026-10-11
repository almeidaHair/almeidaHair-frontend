import type { ClientInput, EvaluationInput } from '../types/models';

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
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