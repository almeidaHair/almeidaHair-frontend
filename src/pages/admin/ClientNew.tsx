import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import { SheetFrame } from '../../components/brand/SheetFrame';
import { SheetHeader } from '../../components/brand/SheetHeader';
import { ClientForm } from '../../components/client/ClientForm';
import { BackLink } from '../../components/ui/BackLink';
import { api } from '../../utils/api';
import { ApiError } from '../../utils/apiError';
import type { FieldErrors } from '../../utils/validation';
import type { ClientInput } from '../../types/models';

export function ClientNew() {
  const { token, expireSession } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState<FieldErrors>();

  const handleSubmit = async (input: ClientInput) => {
    setSubmitting(true);
    try {
      const client = await api.createClient(token, input);
      toast.success('Cliente cadastrada', {
        description: `O acesso de ${client.email} já está disponível.`
      });
      navigate(`/admin/clientes/${client.id}`, { replace: true });
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

  return (
    <div className="mx-auto max-w-3xl">
      <BackLink to="/admin">Clientes</BackLink>
      <SheetFrame floral className="mt-4">
        <SheetHeader
          badge="Novo cadastro"
          title="Ficha de Cadastro da Cliente"
          subtitle="Cadastro inicial para organizar dados, preferências e histórico da cliente." />
        
        <ClientForm onSubmit={handleSubmit} submitting={submitting} serverErrors={serverErrors} cancelTo="/admin" />
      </SheetFrame>
    </div>);

}