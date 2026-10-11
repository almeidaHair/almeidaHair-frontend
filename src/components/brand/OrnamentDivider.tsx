import React from 'react';

export function OrnamentDivider({ variant = 'dot' }: {variant?: 'dot' | 'ring';}) {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-3">
      <span className="h-px w-16 bg-gold/60 sm:w-28" />
      {variant === 'ring' ?
      <span className="grid h-3 w-3 place-items-center rounded-full border border-gold">
          <span className="h-1 w-1 rounded-full bg-gold" />
        </span> :

      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      }
      <span className="h-px w-16 bg-gold/60 sm:w-28" />
    </div>);

}