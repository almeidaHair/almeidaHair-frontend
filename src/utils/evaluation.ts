import type { ClientInput, EvaluationInput } from '../types/models';
import { todayISO } from './date';

export function emptyEvaluationInput(): EvaluationInput {
  return {
    date: todayISO(),
    sharedWithClient: true,
    hair: {
      types: [],
      curvatures: [],
      thickness: '',
      density: '',
      porosity: '',
      elasticity: '',
      elasticityNotes: '',
      states: [],
      stateOther: ''
    },
    scalp: { types: [], flaking: '', notes: '' },
    history: {
      coloracao: { done: false, detail: '' },
      descoloracao: { done: false, detail: '' },
      progressiva: { done: false, detail: '' },
      relaxamento: { done: false, detail: '' },
      hena: { done: false, detail: '' },
      outros: { done: false, detail: '' }
    },
    professional: {
      goal: '',
      diagnosis: '',
      recommendedProcedure: '',
      strandTest: '',
      strandResult: '',
      notes: ''
    }
  };
}

export function emptyClientInput(password: string): ClientInput {
  return {
    name: '',
    birthDate: '',
    phone: '',
    email: '',
    instagram: '',
    address: '',
    howFound: '',
    usualProcedures: '',
    preferences: '',
    notes: '',
    firstVisit: todayISO(),
    status: 'ativo',
    password,
    lgpdConsent: false
  };
}