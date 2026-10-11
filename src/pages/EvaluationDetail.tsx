import React from 'react';
import { useParams } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAsync } from '../hooks/useAsync';
import { SheetFrame } from '../components/brand/SheetFrame';
import { SheetHeader } from '../components/brand/SheetHeader';
import { EvaluationView } from '../components/evaluation/EvaluationView';
import { BackLink } from '../components/ui/BackLink';
import { LoadingState } from '../components/ui/LoadingState';
import { ErrorState } from '../components/ui/ErrorState';
import { api } from '../utils/api';
import { formatLongDate } from '../utils/date';

export function EvaluationDetail() {
  const { evaluationId = '' } = useParams();
  const { token, session } = useAuth();
  const isAdmin = session?.role === 'admin';
  const { data, error, loading, reload } = useAsync(() => api.getEvaluation(token, evaluationId), [token, evaluationId]);

  const backTo = isAdmin ?
  data ?
  `/admin/clientes/${data.clientId}?aba=avaliacoes` :
  '/admin' :
  '/minha-area';
  const backLabel = isAdmin ? data?.clientName ?? 'Voltar' : 'Minha área';

  return (
    <div className="mx-auto max-w-3xl">
      <BackLink to={backTo}>{backLabel}</BackLink>
      {loading && !data ?
      <LoadingState label="Carregando avaliação…" /> :
      error || !data ?
      <ErrorState message={error?.message ?? 'Avaliação não encontrada.'} onRetry={reload} /> :

      <SheetFrame floral className="mt-4">
          <SheetHeader
          badge={isAdmin ? data.clientName : 'Sua avaliação'}
          title="Ficha de Anamnese e Diagnóstico Capilar"
          subtitle={`${formatLongDate(data.date)} · avaliação feita por ${data.authorName}`} />
        
          {isAdmin &&
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-ink-muted">
              {data.sharedWithClient ?
          <>
                  <EyeIcon className="h-3.5 w-3.5 text-sage" aria-hidden="true" /> Disponível na área da cliente
                </> :

          <>
                  <EyeOffIcon className="h-3.5 w-3.5" aria-hidden="true" /> Interna — a cliente não visualiza
                </>
          }
            </p>
        }
          <EvaluationView evaluation={data} />
          {!isAdmin &&
        <p className="mt-8 text-center text-xs text-ink-muted">
              Registro profissional do salão, somente para consulta. Dúvidas? Fale com a sua profissional.
            </p>
        }
        </SheetFrame>
      }
    </div>);

}