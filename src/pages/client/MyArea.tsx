import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRightIcon, LockIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAsync } from '../../hooks/useAsync';
import { Tabs } from '../../components/ui/Tabs';
import { LoadingState } from '../../components/ui/LoadingState';
import { ErrorState } from '../../components/ui/ErrorState';
import { EmptyState } from '../../components/ui/EmptyState';
import { ClientProfileView } from '../../components/client/ClientProfileView';
import { EvaluationCard } from '../../components/evaluation/EvaluationCard';
import { FloralSprig } from '../../components/brand/FloralSprig';
import { api } from '../../utils/api';
import { formatDate } from '../../utils/date';
import { firstName } from '../../utils/text';

type Tab = 'avaliacoes' | 'dados';

export function MyArea() {
  const { token, session } = useAuth();
  const [params, setParams] = useSearchParams();
  const tab: Tab = params.get('aba') === 'dados' ? 'dados' : 'avaliacoes';
  const clientId = session?.clientId ?? '';

  const { data, error, loading, reload } = useAsync(
    () => Promise.all([api.getMe(token), api.listEvaluations(token, clientId)]),
    [token, clientId]
  );

  if (loading && !data) return <LoadingState label="Carregando sua área…" />;
  if (error || !data) return <ErrorState message={error?.message ?? 'Tente novamente.'} onRetry={reload} />;

  const [client, evaluations] = data;
  const latest = evaluations[0];

  return (
    <div>
      <header className="flex items-center gap-3">
        <FloralSprig className="h-12 w-14 shrink-0" />
        <div>
          <p className="text-sm text-ink-muted">Sua área almeidaHair</p>
          <h1 className="font-serif text-[1.75rem] font-bold leading-tight text-ink sm:text-3xl">
            Olá, {firstName(client.name)}
          </h1>
        </div>
      </header>

      {latest &&
      <Link
        to={`/minha-area/avaliacoes/${latest.id}`}
        className="group mt-6 block rounded-2xl bg-wine p-5 text-white transition-colors duration-150 hover:bg-wine-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine/40 focus-visible:ring-offset-2 focus-visible:ring-offset-blush sm:p-7">
        
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-soft">
            Avaliação mais recente · {formatDate(latest.date)}
          </p>
          <p className="mt-3 max-w-3xl font-serif text-lg leading-relaxed sm:text-xl">{latest.professional.diagnosis}</p>
          <div className="mt-5 flex flex-col gap-3 border-t border-white/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
            {latest.professional.recommendedProcedure ?
          <p className="text-[15px]">
                <span className="text-white/75">Recomendado: </span>
                <span className="font-medium">{latest.professional.recommendedProcedure}</span>
              </p> :

          <span />
          }
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-gold-soft">
              Ver avaliação completa
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </div>
        </Link>
      }

      <div className="mt-8">
        <Tabs<Tab>
          tabs={[
          { id: 'avaliacoes', label: 'Minhas avaliações', count: evaluations.length },
          { id: 'dados', label: 'Meus dados' }]
          }
          value={tab}
          onChange={(id) => setParams(id === 'avaliacoes' ? {} : { aba: id }, { replace: true })} />
        
      </div>

      <div role="tabpanel" className="mt-6">
        {tab === 'avaliacoes' ?
        evaluations.length === 0 ?
        <EmptyState
          title="Nenhuma avaliação por aqui ainda"
          description="Assim que o salão registrar e compartilhar uma avaliação do seu cabelo, ela aparecerá aqui." /> :


        <ul className="grid gap-3 lg:grid-cols-2">
              {evaluations.map((ev) =>
          <li key={ev.id}>
                  <EvaluationCard evaluation={ev} href={`/minha-area/avaliacoes/${ev.id}`} />
                </li>
          )}
            </ul> :


        <div className="space-y-6">
            <p className="flex items-start gap-2 rounded-xl border border-gold/40 bg-white px-4 py-3 text-sm text-ink-muted">
              <LockIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              Seus dados são somente para consulta. Para atualizar alguma informação, fale com o salão.
            </p>
            <ClientProfileView client={client} audience="client" />
          </div>
        }
      </div>
    </div>);

}