import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { SheetFrame } from '../../components/brand/SheetFrame';
import { SheetHeader } from '../../components/brand/SheetHeader';
import { ClientForm } from '../../components/client/ClientForm';
import { BackLink } from '../../components/ui/BackLink';
import { ErrorState } from '../../components/ui/ErrorState';
import { LoadingState } from '../../components/ui/LoadingState';
import { useAuth } from '../../contexts/AuthContext';
import { useAsync } from '../../hooks/useAsync';
import type { ClientEditableInput } from '../../types/models';
import { api } from '../../utils/api';
import { ApiError } from '../../utils/apiError';
import type { FieldErrors } from '../../utils/validation';

export function ClientEdit() {
  const { clientId = '' } = useParams();
  const { token, expireSession } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState<FieldErrors>();
  const { data: client, error, loading, reload } = useAsync(
    () => api.getClient(token, clientId),
    [token, clientId]
  );
  const detailPath = `/admin/clientes/${clientId}`;

  if (loading && !client) return <LoadingState label="Carregando dados da cliente…" />;
  if (error || !client) {
    return (
      <div>
        <BackLink to="/admin">Clientes</BackLink>
        <ErrorState message={error?.message ?? 'Cliente não encontrada.'} onRetry={reload} />
      </div>
    );
  }

  const initialValues: ClientEditableInput = {
    name: client.name,
    birthDate: client.birthDate,
    phone: client.phone,
    email: client.email,
    instagram: client.instagram,
    address: client.address,
    howFound: client.howFound,
    usualProcedures: client.usualProcedures,
    preferences: client.preferences,
    notes: client.notes,
    firstVisit: client.firstVisit,
    status: client.status
  };

  const handleSubmit = async (input: ClientEditableInput) => {
    setSubmitting(true);
    setServerErrors(undefined);
    try {
      const updated = await api.updateClient(token, clientId, input);
      toast.success('Dados da cliente atualizados.', {
        description: `${updated.name} foi atualizada com sucesso.`
      });
      navigate(detailPath, { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) return expireSession();
        if (err.fieldErrors) setServerErrors(err.fieldErrors);
        toast.error(err.message);
      } else {
        toast.error('Não foi possível salvar. Tente novamente.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <BackLink to={detailPath}>Voltar para a ficha</BackLink>
      <SheetFrame floral className="mt-4">
        <SheetHeader
          badge="Editar cadastro"
          title="Ficha da Cliente"
          subtitle="Atualize os dados, preferências e o status de acesso da cliente." />
        <ClientForm
          mode="edit"
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitting={submitting}
          serverErrors={serverErrors}
          cancelTo={detailPath} />
      </SheetFrame>
    </div>
  );
}
