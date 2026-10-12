import React, { ReactNode, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { Sparkle } from '../brand/Sparkle';

interface FormSectionProps {
  number: number;
  title: string;
  children: ReactNode;
  className?: string;
}

export function FormSection({ number, title, children, className = '' }: FormSectionProps) {
  const id = useId();
  return (
    <section aria-labelledby={id} className={twMerge('space-y-3', className)}>
      <div className="flex items-center">
        <span
          aria-hidden="true"
          className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-wine text-sm font-semibold text-gold-soft ring-[3px] ring-petal">
          
          {number}
        </span>
        <h2
          id={id}
          className="-ml-3 whitespace-nowrap rounded-full border border-petal-border bg-petal py-1.5 pl-6 pr-5 text-[13px] font-bold uppercase tracking-[0.06em] text-wine">
          
          {title}
        </h2>
        <span aria-hidden="true" className="ml-2 h-px flex-1 bg-gold/60" />
        <Sparkle className="h-3 w-3 shrink-0 text-gold" />
      </div>
      <div className="rounded-xl border border-petal-border bg-surface px-4 py-3 sm:px-5 sm:py-4">{children}</div>
    </section>);

}