import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import { useAsync } from '../../hooks/useAsync';
import { SheetFrame } from '../../components/brand/SheetFrame';
import { SheetHeader } from '../../components/brand/SheetHeader';
import { EvaluationForm } from '../../components/evaluation/EvaluationForm';
import { BackLink } from '../../components/ui/BackLink';
import { LoadingState } from '../../components/ui/LoadingState';
import { ErrorState } from '../../components/ui/ErrorState';
import { api } from '../../utils/api';
import { ApiError } from '../../utils/apiError';
import type { FieldErrors } from '../../utils/validation';
import type { EvaluationInput } from '../../types/models';

export function EvaluationNew() {
  const { clientId = '' } = useParams();
  const { token, expireSession } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState<FieldErrors>();
  const { data: client, error, loading, reload } = useAsync(() => api.getClient(token, clientId), [token, clientId]);
  const backTo = `/admin/clientes/${clientId}?aba=avaliacoes`;

  const handleSubmit = async (input: EvaluationInput) => {
    setSubmitting(true);
    try {
      const evaluation = await api.createEvaluation(token, clientId, input);
      toast.success('Avaliação salva', {
        description: input.sharedWithClient ? 'Já está disponível na área da cliente.' : 'Visível apenas para o salão.'
      });
      navigate(`/admin/clientes/${clientId}/avaliacoes/${evaluation.id}`, { replace: true });
    } catch (err) {
      setSubmitting(false);
      if (err instanceof ApiError) {
        if (err.status === 401) return expireSession();
        if (err.fieldErrors) setServerErrors(err.fieldErrors);
        toast.error(err.message);
      } else {
        toast.error('Não foi possível salvar. Tente novamente.');
      }
    }
  };

  if (loading && !client) return <LoadingState />;
  if (error || !client) return <ErrorState message={error?.message ?? 'Cliente não encontrada.'} onRetry={reload} />;

  return (
    <div className="mx-auto max-w-3xl">
      <BackLink to={backTo}>{client.name}</BackLink>
      <SheetFrame floral className="mt-4">
        <SheetHeader
          badge={client.name}
          title="Ficha de Anamnese e Diagnóstico Capilar"
          subtitle="Avaliação para entender o estado do cabelo e orientar o melhor procedimento." />
        
        <EvaluationForm onSubmit={handleSubmit} submitting={submitting} serverErrors={serverErrors} cancelTo={backTo} />
      </SheetFrame>
    </div>);

}