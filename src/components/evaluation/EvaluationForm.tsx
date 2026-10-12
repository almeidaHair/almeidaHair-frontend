import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormSection } from '../ui/FormSection';
import { TextField } from '../ui/TextField';
import { TextAreaField } from '../ui/TextAreaField';
import { ChoiceGroup } from '../ui/ChoiceGroup';
import { Switch } from '../ui/Switch';
import { Button } from '../ui/Button';
import {
  curvatures,
  hairStates,
  hairTypes,
  historyItems,
  levelOptions,
  scalpTypes,
  thicknessOptions,
  yesNoOptions } from
'../../data/hairOptions';
import { emptyEvaluationInput } from '../../utils/evaluation';
import { buttonClasses } from '../../utils/buttonStyles';
import { FieldErrors, validateEvaluationInput } from '../../utils/validation';
import type { EvaluationInput, HistoryEntry, HistoryKey, YesNo } from '../../types/models';

interface EvaluationFormProps {
  onSubmit: (input: EvaluationInput) => Promise<void>;
  submitting: boolean;
  serverErrors?: FieldErrors;
  cancelTo: string;
}

type Section = 'hair' | 'scalp' | 'professional';

const inlineInput =
'min-w-[140px] flex-1 border-0 border-b border-line bg-transparent px-0 py-1 text-sm text-ink placeholder:text-ink-faint transition-colors duration-150 focus:border-wine focus:outline-none focus:ring-0';

export function EvaluationForm({ onSubmit, submitting, serverErrors, cancelTo }: EvaluationFormProps) {
  const [form, setForm] = useState<EvaluationInput>(emptyEvaluationInput);
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (serverErrors) setErrors(serverErrors);
  }, [serverErrors]);

  function patch<S extends Section>(section: S, value: Partial<EvaluationInput[S]>) {
    setForm((f) => ({ ...f, [section]: { ...f[section], ...value } }));
  }

  function patchHistory(key: HistoryKey, value: Partial<HistoryEntry>) {
    setForm((f) => ({ ...f, history: { ...f.history, [key]: { ...f.history[key], ...value } } }));
  }

  const clearError = (key: string) => {
    if (errors[key]) setErrors(({ [key]: _removed, ...rest }) => rest);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validateEvaluationInput(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    await onSubmit(form);
  };

  const { hair, scalp, history, professional } = form;

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-7">
      <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
        <TextField
          label="Data da avaliação"
          type="date"
          required
          className="sm:w-56"
          value={form.date}
          error={errors.date}
          onChange={(e) => {
            setForm((f) => ({ ...f, date: e.target.value }));
            clearError('date');
          }} />
        
        <div className="pb-2">
          <Switch
            checked={form.sharedWithClient}
            onChange={(v) => setForm((f) => ({ ...f, sharedWithClient: v }))}
            label="Disponibilizar para a cliente"
            description="Ela poderá consultar esta avaliação na área dela." />
          
        </div>
      </div>

      <FormSection number={1} title="Dados do cabelo">
        <ChoiceGroup multiple label="Tipo de cabelo" options={hairTypes} value={hair.types} onChange={(v: string[]) => patch('hair', { types: v })} />
        <ChoiceGroup multiple label="Curvatura" options={curvatures} value={hair.curvatures} onChange={(v: string[]) => patch('hair', { curvatures: v })} />
        <ChoiceGroup label="Espessura" options={thicknessOptions} value={hair.thickness} onChange={(v: string) => patch('hair', { thickness: v })} />
        <ChoiceGroup label="Densidade" options={levelOptions} value={hair.density} onChange={(v: string) => patch('hair', { density: v })} />
        <ChoiceGroup label="Porosidade" options={levelOptions} value={hair.porosity} onChange={(v: string) => patch('hair', { porosity: v })} />
        <ChoiceGroup
          label="Elasticidade"
          options={levelOptions}
          value={hair.elasticity}
          onChange={(v: string) => patch('hair', { elasticity: v })}
          extra={
          <input
            aria-label="Observações sobre elasticidade"
            placeholder="Obs."
            className={inlineInput}
            value={hair.elasticityNotes}
            onChange={(e) => patch('hair', { elasticityNotes: e.target.value })} />

          } />
        
        <ChoiceGroup
          multiple
          label="Estado atual"
          options={hairStates}
          value={hair.states}
          onChange={(v: string[]) => patch('hair', { states: v })}
          extra={
          <input
            aria-label="Outro estado do cabelo"
            placeholder="Outro"
            className={inlineInput}
            value={hair.stateOther}
            onChange={(e) => patch('hair', { stateOther: e.target.value })} />

          } />
        
      </FormSection>

      <FormSection number={2} title="Couro cabeludo">
        <ChoiceGroup multiple label="Condição" options={scalpTypes} value={scalp.types} onChange={(v: string[]) => patch('scalp', { types: v })} />
        <ChoiceGroup label="Descamação" options={yesNoOptions} value={scalp.flaking} onChange={(v: string) => patch('scalp', { flaking: v as YesNo })} />
        <TextField label="Outras observações" value={scalp.notes} onChange={(e) => patch('scalp', { notes: e.target.value })} />
      </FormSection>

      <FormSection number={3} title="Histórico">
        <div className="grid gap-x-8 sm:grid-cols-2">
          {historyItems.map((item) => {
            const entry = history[item.key];
            return (
              <div key={item.key} className="flex items-end gap-3 border-b border-line py-3 sm:[&:nth-last-child(-n+2)]:border-0">
                <label className="flex shrink-0 cursor-pointer items-center gap-2 pb-1 text-[13px] font-semibold text-ink">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-wine"
                    checked={entry.done}
                    onChange={(e) => patchHistory(item.key, { done: e.target.checked })} />
                  
                  {item.label}
                </label>
                <input
                  aria-label={`Detalhes — ${item.label}`}
                  placeholder="Quando / detalhes"
                  className={inlineInput}
                  value={entry.detail}
                  onChange={(e) => patchHistory(item.key, { detail: e.target.value, done: entry.done || e.target.value.length > 0 })} />
                
              </div>);

          })}
        </div>
      </FormSection>

      <FormSection number={4} title="Avaliação profissional">
        <TextField label="Objetivo da cliente" value={professional.goal} onChange={(e) => patch('professional', { goal: e.target.value })} />
        <TextAreaField
          label="Diagnóstico"
          required
          value={professional.diagnosis}
          error={errors.diagnosis}
          onChange={(e) => {
            patch('professional', { diagnosis: e.target.value });
            clearError('diagnosis');
          }} />
        
        <TextField
          label="Procedimento recomendado"
          value={professional.recommendedProcedure}
          onChange={(e) => patch('professional', { recommendedProcedure: e.target.value })} />
        
        <ChoiceGroup
          label="Teste de mecha"
          options={yesNoOptions}
          value={professional.strandTest}
          onChange={(v: string) => patch('professional', { strandTest: v as YesNo })}
          extra={
          <input
            aria-label="Resultado do teste de mecha"
            placeholder="Resultado"
            className={inlineInput}
            value={professional.strandResult}
            onChange={(e) => patch('professional', { strandResult: e.target.value })} />

          } />
        
        <TextAreaField label="Observações" value={professional.notes} onChange={(e) => patch('professional', { notes: e.target.value })} />
      </FormSection>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <Link to={cancelTo} className={buttonClasses('secondary', 'lg')}>
          Cancelar
        </Link>
        <Button type="submit" size="lg" loading={submitting}>
          Salvar avaliação
        </Button>
      </div>
    </form>);

}