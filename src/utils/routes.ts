import type { Role } from '../types/models';

export function homeFor(role: Role): string {
  return role === 'admin' ? '/admin' : '/minha-area';
}