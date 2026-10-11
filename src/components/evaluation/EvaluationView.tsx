import React from 'react';
import { FormSection } from '../ui/FormSection';
import { InfoRow } from '../ui/InfoRow';
import { historyItems } from '../../data/hairOptions';
import type { Evaluation } from '../../types/models';

function Tags({ items }: {items: string[];}) {
  const values = items.filter(Boolean);
  if (values.length === 0) return null;
  return (
    <span className="flex flex-wrap gap-1.5">
      {values.map((v) =>
      <span key={v} className="rounded-md bg-petal px-2 py-0.5 text-sm font-medium text-wine">
          {v}
        </span>
      )}
    </span>);

}

function withNote(value: string, note: string) {
  if (!value && !note) return null;
  return (
    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {value && <Tags items={[value]} />}
      {note && <span className="text-sm text-ink-muted">{note}</span>}
    </span>);

}

export function EvaluationView({ evaluation }: {evaluation: Evaluation;}) {
  const { hair, scalp, history, professional } = evaluation;
  const doneHistory = historyItems.filter((item) => history[item.key]?.done);

  return (
    <div className="mt-8 space-y-7">
      <div className="rounded-xl bg-wine p-5 text-white sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-soft">Diagnóstico</p>
        <p className="mt-2 font-serif text-lg leading-relaxed sm:text-xl">{professional.diagnosis}</p>
        {professional.recommendedProcedure &&
        <div className="mt-5 border-t border-white/20 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold-soft">Procedimento recomendado</p>
            <p className="mt-1 text-[15px] font-medium">{professional.recommendedProcedure}</p>
          </div>
        }
      </div>

      <FormSection number={1} title="Dados do cabelo">
        <dl>
          <InfoRow label="Tipo de cabelo">{hair.types.length ? <Tags items={hair.types} /> : null}</InfoRow>
          <InfoRow label="Curvatura">{hair.curvatures.length ? <Tags items={hair.curvatures} /> : null}</InfoRow>
          <InfoRow label="Espessura">{hair.thickness ? <Tags items={[hair.thickness]} /> : null}</InfoRow>
          <InfoRow label="Densidade">{hair.density ? <Tags items={[hair.density]} /> : null}</InfoRow>
          <InfoRow label="Porosidade">{hair.porosity ? <Tags items={[hair.porosity]} /> : null}</InfoRow>
          <InfoRow label="Elasticidade">{withNote(hair.elasticity, hair.elasticityNotes)}</InfoRow>
          <InfoRow label="Estado atual">
            {hair.states.length || hair.stateOther ? <Tags items={[...hair.states, hair.stateOther]} /> : null}
          </InfoRow>
        </dl>
      </FormSection>

      <FormSection number={2} title="Couro cabeludo">
        <dl>
          <InfoRow label="Condição">{scalp.types.length ? <Tags items={scalp.types} /> : null}</InfoRow>
          <InfoRow label="Descamação">{scalp.flaking ? <Tags items={[scalp.flaking]} /> : null}</InfoRow>
          <InfoRow label="Outras observações">{scalp.notes}</InfoRow>
        </dl>
      </FormSection>

      <FormSection number={3} title="Histórico">
        {doneHistory.length === 0 ?
        <p className="py-2 text-sm italic text-ink-muted">Nenhum procedimento químico informado.</p> :

        <dl>
            {doneHistory.map((item) =>
          <InfoRow key={item.key} label={item.label}>
                {history[item.key].detail || 'Realizado'}
              </InfoRow>
          )}
          </dl>
        }
      </FormSection>

      <FormSection number={4} title="Avaliação profissional">
        <dl>
          <InfoRow label="Objetivo da cliente">{professional.goal}</InfoRow>
          <InfoRow label="Teste de mecha">{withNote(professional.strandTest, professional.strandResult)}</InfoRow>
          <InfoRow label="Observações">{professional.notes}</InfoRow>
        </dl>
      </FormSection>
    </div>);

}