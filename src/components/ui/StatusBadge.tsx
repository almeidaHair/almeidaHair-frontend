import React from 'react';
import type { ClientStatus } from '../../types/models';

export function StatusBadge({ status }: {status: ClientStatus;}) {
  const active = status === 'ativo';
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${
      active ? 'bg-sage-soft text-sage' : 'bg-line/70 text-ink-muted'}`
      }>
      
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-sage' : 'bg-ink-faint'}`} />
      {active ? 'Ativo' : 'Inativo'}
    </span>);

}