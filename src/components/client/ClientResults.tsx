import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { StatusBadge } from '../ui/StatusBadge';
import { formatDate } from '../../utils/date';
import type { ClientSummary } from '../../types/models';

interface ClientResultsProps {
  clients: ClientSummary[];
  refreshing: boolean;
}

export function ClientResults({ clients, refreshing }: ClientResultsProps) {
  const navigate = useNavigate();
  const hrefFor = (id: string) => `/admin/clientes/${id}`;

  return (
    <div aria-busy={refreshing} className={`transition-opacity duration-150 ${refreshing ? 'opacity-60' : 'opacity-100'}`}>
      {/* Mobile list */}
      <ul className="divide-y divide-line/80 overflow-hidden rounded-2xl border border-petal-border bg-white md:hidden">
        {clients.map((c) =>
        <li key={c.id}>
            <Link
            to={hrefFor(c.id)}
            className="flex items-center gap-3 px-4 py-3.5 transition-colors duration-150 active:bg-blush focus-visible:bg-blush focus-visible:outline-none">
            
              <Avatar name={c.name} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-medium text-ink">{c.name}</p>
                <p className="truncate text-sm text-ink-muted">{c.email}</p>
              </div>
              <StatusBadge status={c.status} />
              <ChevronRightIcon className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
            </Link>
          </li>
        )}
      </ul>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-petal-border bg-white md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-petal-border bg-petal/40">
            <tr className="text-[12px] uppercase tracking-[0.06em] text-wine">
              <th scope="col" className="px-5 py-3 font-semibold">Nome</th>
              <th scope="col" className="px-5 py-3 font-semibold">E-mail</th>
              <th scope="col" className="px-5 py-3 font-semibold">Status</th>
              <th scope="col" className="px-5 py-3 font-semibold">Última avaliação</th>
              <th scope="col" className="w-12 px-5 py-3">
                <span className="sr-only">Abrir ficha</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/80">
            {clients.map((c) =>
            <tr
              key={c.id}
              onClick={() => navigate(hrefFor(c.id))}
              className="group cursor-pointer transition-colors duration-150 hover:bg-blush">
              
                <td className="px-5 py-3.5">
                  <Link
                  to={hrefFor(c.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-3 font-medium text-ink focus-visible:underline focus-visible:outline-none">
                  
                    <Avatar name={c.name} size="sm" />
                    {c.name}
                  </Link>
                </td>
                <td className="px-5 py-3.5 text-ink-muted">{c.email}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-5 py-3.5 text-ink-muted">
                  {c.lastEvaluationDate ? formatDate(c.lastEvaluationDate) : '—'}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <ChevronRightIcon
                  className="ml-auto h-4 w-4 text-ink-faint transition-[transform,color] duration-150 group-hover:translate-x-0.5 group-hover:text-wine"
                  aria-hidden="true" />
                
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>);

}