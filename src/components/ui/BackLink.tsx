import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';

export function BackLink({ to, children }: {to: string;children: ReactNode;}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 rounded-full py-1 text-sm font-medium text-ink-muted transition-colors duration-150 hover:text-wine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine/30">
      
      <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
      {children}
    </Link>);

}