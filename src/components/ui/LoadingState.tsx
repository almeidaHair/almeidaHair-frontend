import React from 'react';
import { Loader2Icon } from 'lucide-react';

export function LoadingState({ label = 'Carregando…' }: {label?: string;}) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-20 text-ink-muted">
      <Loader2Icon className="h-6 w-6 animate-spin text-wine" aria-hidden="true" />
      <span className="text-sm">{label}</span>
    </div>);

}