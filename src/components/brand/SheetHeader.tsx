import React, { ReactNode } from 'react';
import { OrnamentDivider } from './OrnamentDivider';

interface SheetHeaderProps {
  badge: string;
  title: ReactNode;
  subtitle?: ReactNode;
  as?: 'h1' | 'h2';
}

export function SheetHeader({ badge, title, subtitle, as: Heading = 'h1' }: SheetHeaderProps) {
  return (
    <header className="text-center">
      <OrnamentDivider variant="ring" />
      <span className="mt-2 inline-block rounded-full border-2 border-gold/70 bg-wine px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
        {badge}
      </span>
      <Heading className="mx-auto mt-5 max-w-xl text-balance font-serif text-[1.65rem] font-bold leading-tight text-ink sm:text-4xl">
        {title}
      </Heading>
      <div className="mt-4">
        <OrnamentDivider />
      </div>
      {subtitle && <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-muted">{subtitle}</p>}
    </header>);

}