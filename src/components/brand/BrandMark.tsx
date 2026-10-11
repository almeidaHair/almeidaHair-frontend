import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BrandMarkProps {
  size?: 'sm' | 'lg';
  className?: string;
}

export function BrandMark({ size = 'sm', className = '' }: BrandMarkProps) {
  return (
    <span
      className={twMerge(
        'font-serif leading-none tracking-tight',
        size === 'lg' ? 'text-4xl sm:text-[2.75rem]' : 'text-xl',
        className
      )}>
      
      <span className="font-bold text-ink">almeida</span>
      <span className="italic text-wine">Hair</span>
    </span>);

}