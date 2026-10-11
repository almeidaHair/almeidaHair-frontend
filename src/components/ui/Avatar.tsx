import React from 'react';
import { initials } from '../../utils/text';

const sizes = {
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-10 w-10 text-xs',
  lg: 'h-14 w-14 text-base'
};

export function Avatar({ name, size = 'md' }: {name: string;size?: keyof typeof sizes;}) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full border border-petal-border bg-petal font-serif font-bold text-wine ${sizes[size]}`}>
      
      {initials(name)}
    </span>);

}