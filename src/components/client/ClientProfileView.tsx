import React from 'react';
import { FormSection } from '../ui/FormSection';
import { InfoRow } from '../ui/InfoRow';
import { formatDate } from '../../utils/date';
import type { Client } from '../../types/models';

interface ClientProfileViewProps {
  client: Client;
  audience: 'admin' | 'client';
}

export function ClientProfileView({ client, audience }: ClientProfileViewProps) {
  return (
    <div className="grid gap-7 lg:grid-cols-2 lg:gap-x-8">
      <FormSection number={1} title={audience === 'admin' ? 'Dados da cliente' : 'Seus dados'}>
        <dl>
          <InfoRow label="Nome completo">{client.name}</InfoRow>
          <InfoRow label="Data de nascimento">{formatDate(client.birthDate)}</InfoRow>
          <InfoRow label="Telefone / WhatsApp">{client.phone}</InfoRow>
        </dl>
      </FormSection>

      <FormSection number={2} title="Contato">
        <dl>
          <InfoRow label="Instagram">{client.instagram}</InfoRow>
          <InfoRow label="E-mail">{client.email}</InfoRow>
          <InfoRow label="Endereço">{client.address}</InfoRow>
        </dl>
      </FormSection>

      <FormSection number={3} title="Perfil e preferências">
        <dl>
          <InfoRow label="Como conheceu o salão">{client.howFound}</InfoRow>
          <InfoRow label="Procedimentos que costuma realizar">{client.usualProcedures}</InfoRow>
          <InfoRow label="Preferências">{client.preferences}</InfoRow>
        </dl>
      </FormSection>

      <FormSection number={4} title={audience === 'admin' ? 'Observações' : 'Atendimento'}>
        <dl>
          {audience === 'admin' && <InfoRow label="Observações importantes">{client.notes}</InfoRow>}
          <InfoRow label="Primeiro atendimento">{formatDate(client.firstVisit)}</InfoRow>
          <InfoRow label="Consentimento LGPD">
            {client.lgpdConsentAt ? `Registrado em ${formatDate(client.lgpdConsentAt.slice(0, 10))}` : ''}
          </InfoRow>
        </dl>
      </FormSection>
    </div>);

}