import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, EyeOffIcon } from 'lucide-react';
import { formatDate } from '../../utils/date';
import type { Evaluation } from '../../types/models';

interface EvaluationCardProps {
  evaluation: Evaluation;
  href: string;
  showVisibility?: boolean;
}

export function EvaluationCard({ evaluation, href, showVisibility = false }: EvaluationCardProps) {
  const { professional } = evaluation;
  return (
    <Link
      to={href}
      className="group flex h-full items-stretch gap-4 rounded-xl border border-petal-border bg-white p-4 transition-colors duration-150 hover:border-wine/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine/30">
      
      <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-petal/60 py-2 text-wine">
        <span className="font-serif text-xl font-bold leading-none">{formatDate(evaluation.date, 'dd')}</span>
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-wide">
          {formatDate(evaluation.date, 'MMM yy')}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs text-ink-muted">Avaliação capilar · {evaluation.authorName}</p>
          {showVisibility && !evaluation.sharedWithClient &&
          <span className="inline-flex items-center gap-1 rounded-full bg-line/70 px-2 py-px text-[11px] font-medium text-ink-muted">
              <EyeOffIcon className="h-3 w-3" aria-hidden="true" />
              Interna
            </span>
          }
        </div>
        <p className="mt-1 line-clamp-2 text-[15px] font-medium leading-snug text-ink">{professional.diagnosis}</p>
        {professional.recommendedProcedure &&
        <p className="mt-1 truncate text-sm text-ink-muted">Recomendado: {professional.recommendedProcedure}</p>
        }
      </div>
      <ChevronRightIcon
        className="h-4 w-4 shrink-0 self-center text-ink-faint transition-[transform,color] duration-150 group-hover:translate-x-0.5 group-hover:text-wine"
        aria-hidden="true" />
      
    </Link>);

}