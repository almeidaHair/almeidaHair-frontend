import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { FloralSprig } from './FloralSprig';

interface SheetFrameProps {
  children: ReactNode;
  floral?: boolean;
  className?: string;
}

const corner = 'pointer-events-none absolute h-5 w-5 border-gold/70';

export function SheetFrame({ children, floral = false, className = '' }: SheetFrameProps) {
  return (
    <div
      className={twMerge(
        'rounded-2xl bg-white p-2 shadow-[0_1px_2px_rgba(43,27,34,0.04),0_12px_32px_-16px_rgba(140,45,79,0.25)] sm:p-3',
        className
      )}>
      
      <div className="relative rounded-xl border border-gold/50 px-4 pb-7 pt-8 sm:px-8 sm:pb-10 sm:pt-10">
        {floral ?
        <FloralSprig className="pointer-events-none absolute -left-1 -top-2 h-16 w-[72px] sm:left-1 sm:h-20 sm:w-[88px]" /> :

        <span className={`${corner} left-2 top-2 rounded-tl-md border-l border-t`} />
        }
        <span className={`${corner} right-2 top-2 rounded-tr-md border-r border-t`} />
        <span className={`${corner} bottom-2 left-2 rounded-bl-md border-b border-l`} />
        <span className={`${corner} bottom-2 right-2 rounded-br-md border-b border-r`} />
        {children}
      </div>
    </div>);

}