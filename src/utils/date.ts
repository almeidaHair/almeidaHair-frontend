import { format, isValid, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(iso: string | null | undefined, pattern = 'dd/MM/yyyy'): string {
  if (!iso) return '';
  const date = parseISO(iso);
  return isValid(date) ? format(date, pattern, { locale: ptBR }) : '';
}

export function formatLongDate(iso: string | null | undefined): string {
  return formatDate(iso, "d 'de' MMMM 'de' yyyy");
}

export function todayISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}