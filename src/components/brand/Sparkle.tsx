import React from 'react';

export function Sparkle({ className = '' }: {className?: string;}) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className={className} fill="currentColor">
      <path d="M6 0C6.6 3.6 8.4 5.4 12 6 8.4 6.6 6.6 8.4 6 12 5.4 8.4 3.6 6.6 0 6 3.6 5.4 5.4 3.6 6 0Z" />
    </svg>);

}