import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ClipboardPlusIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAsync } from '../../hooks/useAsync';
import { BackLink } from '../../components/ui/BackLink';
import { Avatar } from '../../components/ui/Avatar';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Tabs } from '../../components/ui/Tabs';
import { LoadingState } from '../../components/ui/LoadingState';
import { ErrorState } from '../../components/ui/ErrorState';
import { EmptyState } from '../../components/ui/EmptyState';
import { ClientProfileView } from '../../components/client/ClientProfileView';
import { EvaluationCard } from '../../components/evaluation/EvaluationCard';
import { api } from '../../utils/api';
import { buttonClasses } from '../../utils/buttonStyles';
import { formatDate } from '../../utils/date';

type Tab = 'ficha' | 'avaliacoes';

export function ClientDetail() {
  const { clientId = '' } = useParams();
  const { token } = useAuth();
  const [params, setParams] = useSearchParams();
  const tab: Tab = params.get('aba') === 'avaliacoes' ? 'avaliacoes' : 'ficha';

  const { data, error, loading, reload } = useAsync(
    () => Promise.all([api.getClient(token, clientId), api.listEvaluations(token, clientId)]),
    [token, clientId]
  );

  if (loading && !data) return <LoadingState label="Carregando ficha…" />;
  if (error || !data) {
    return (
      <div>
        <BackLink to="/admin">Clientes</BackLink>
        <ErrorState message={error?.message ?? 'Cliente não encontrada.'} onRetry={reload} />
      </div>);

  }

  const [client, evaluations] = data;
  const newEvaluationHref = `/admin/clientes/${client.id}/avaliacoes/nova`;

  return (
    <div>
      <BackLink to="/admin">Clientes</BackLink>

      <header className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={client.name} size="lg" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h1 className="font-serif text-2xl font-bold leading-tight text-ink sm:text-3xl">{client.name}</h1>
              <StatusBadge status={client.status} />
            </div>
            <p className="mt-1 truncate text-sm text-ink-muted">
              {client.email} · cliente desde {formatDate(client.firstVisit || client.createdAt.slice(0, 10))}
            </p>
          </div>
        </div>
        <Link to={newEvaluationHref} className={buttonClasses('primary', 'md', 'self-start sm:self-auto')}>
          <ClipboardPlusIcon className="h-4 w-4" aria-hidden="true" />
          Nova avaliação
        </Link>
      </header>

      <div className="mt-8">
        <Tabs<Tab>
          tabs={[
          { id: 'ficha', label: 'Ficha' },
          { id: 'avaliacoes', label: 'Avaliações', count: evaluations.length }]
          }
          value={tab}
          onChange={(id) => setParams(id === 'ficha' ? {} : { aba: id }, { replace: true })} />
        
      </div>

      <div role="tabpanel" className="mt-6">
        {tab === 'ficha' ?
        <ClientProfileView client={client} audience="admin" /> :
        evaluations.length === 0 ?
        <EmptyState
          title="Nenhuma avaliação registrada"
          description="Registre a primeira anamnese capilar para acompanhar a evolução da cliente."
          action={
          <Link to={newEvaluationHref} className={buttonClasses('primary')}>
                <ClipboardPlusIcon className="h-4 w-4" aria-hidden="true" />
                Nova avaliação
              </Link>
          } /> :


        <ul className="grid gap-3 lg:grid-cols-2">
            {evaluations.map((ev) =>
          <li key={ev.id}>
                <EvaluationCard
              evaluation={ev}
              href={`/admin/clientes/${client.id}/avaliacoes/${ev.id}`}
              showVisibility />
            
              </li>
          )}
          </ul>
        }
      </div>
    </div>);

}