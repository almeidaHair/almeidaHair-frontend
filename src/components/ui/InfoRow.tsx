import React, { ReactNode } from 'react';

interface InfoRowProps {
  label: string;
  children?: ReactNode;
}

export function InfoRow({ label, children }: InfoRowProps) {
  const empty = children === undefined || children === null || children === '' || children === false;
  return (
    <div className="border-b border-line/80 py-2.5 last:border-0 sm:grid sm:grid-cols-[180px_1fr] sm:gap-4">
      <dt className="text-[13px] text-ink-muted">{label}</dt>
      <dd className="mt-0.5 text-[15px] text-ink sm:mt-0">
        {empty ? <span className="italic text-ink-muted">Não informado</span> : children}
      </dd>
    </div>);

}