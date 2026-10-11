import React, { ReactNode } from 'react';
import { Sparkle } from '../brand/Sparkle';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-petal-border bg-white/60 px-6 py-12 text-center">
      <Sparkle className="h-5 w-5 text-gold" />
      <p className="mt-3 font-serif text-lg font-bold text-ink">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>);

}