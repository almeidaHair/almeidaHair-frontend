export type Role = 'admin' | 'client';
export type ClientStatus = 'ativo' | 'inativo';
export type YesNo = '' | 'Sim' | 'Não';

export interface Session {
  token: string;
  userId: string;
  name: string;
  email: string;
  role: Role;
  clientId?: string;
  expiresAt: number;
}

export interface ProfileInput {
  name: string;
  email: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface Client {
  id: string;
  name: string;
  birthDate: string;
  phone: string;
  email: string;
  instagram: string;
  address: string;
  howFound: string;
  usualProcedures: string;
  preferences: string;
  notes: string;
  firstVisit: string;
  status: ClientStatus;
  lgpdConsentAt: string;
  createdAt: string;
}

export interface ClientEditableInput {
  name: string;
  birthDate: string;
  phone: string;
  email: string;
  instagram: string;
  address: string;
  howFound: string;
  usualProcedures: string;
  preferences: string;
  notes: string;
  firstVisit: string;
  status: ClientStatus;
}

export interface ClientInput extends ClientEditableInput {
  password: string;
  lgpdConsent: boolean;
}

export interface ClientSummary {
  id: string;
  name: string;
  email: string;
  status: ClientStatus;
  lastEvaluationDate: string | null;
}

export type HistoryKey =
'coloracao' |
'descoloracao' |
'progressiva' |
'relaxamento' |
'hena' |
'outros';

export interface HistoryEntry {
  done: boolean;
  detail: string;
}

export interface HairData {
  types: string[];
  curvatures: string[];
  thickness: string;
  density: string;
  porosity: string;
  elasticity: string;
  elasticityNotes: string;
  states: string[];
  stateOther: string;
}

export interface ScalpData {
  types: string[];
  flaking: YesNo;
  notes: string;
}

export interface ProfessionalData {
  goal: string;
  diagnosis: string;
  recommendedProcedure: string;
  strandTest: YesNo;
  strandResult: string;
  notes: string;
}

export interface EvaluationInput {
  date: string;
  sharedWithClient: boolean;
  hair: HairData;
  scalp: ScalpData;
  history: Record<HistoryKey, HistoryEntry>;
  professional: ProfessionalData;
}

export interface Evaluation extends EvaluationInput {
  id: string;
  clientId: string;
  authorName: string;
  createdAt: string;
}

export interface EvaluationWithClient extends Evaluation {
  clientName: string;
}
