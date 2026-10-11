import React from 'react';
import { AlertCircleIcon } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="mx-auto flex max-w-sm flex-col items-center py-16 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-petal text-wine">
        <AlertCircleIcon className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="mt-4 font-serif text-lg font-bold text-ink">Não foi possível carregar</p>
      <p className="mt-1 text-sm text-ink-muted">{message}</p>
      {onRetry &&
      <Button variant="secondary" size="sm" className="mt-5" onClick={onRetry}>
          Tentar novamente
        </Button>
      }
    </div>);

}