import type {
  Client,
  ClientInput,
  ClientSummary,
  Evaluation,
  EvaluationInput,
  EvaluationWithClient,
  Session
} from '../types/models';
import { request } from './httpClient';

function jsonBody(value: unknown): RequestInit {
  return { method: 'POST', body: JSON.stringify(value) };
}

export const api = {
  login(email: string, password: string): Promise<Session> {
    return request<Session>('auth/login', jsonBody({ email, password }));
  },

  getSession(token: string | null): Promise<Session> {
    return request<Session>('auth/session', {}, token);
  },

  logout(token: string | null): Promise<void> {
    return request<void>('auth/logout', { method: 'POST' }, token);
  },

  listClients(token: string | null, query: string): Promise<ClientSummary[]> {
    return request<ClientSummary[]>(`clients?query=${encodeURIComponent(query)}`, {}, token);
  },

  createClient(token: string | null, input: ClientInput): Promise<Client> {
    return request<Client>('clients', jsonBody(input), token);
  },

  getMe(token: string | null): Promise<Client> {
    return request<Client>('clients/me', {}, token);
  },

  getClient(token: string | null, clientId: string): Promise<Client> {
    return request<Client>(`clients/${encodeURIComponent(clientId)}`, {}, token);
  },

  listEvaluations(token: string | null, clientId: string): Promise<Evaluation[]> {
    return request<Evaluation[]>(
      `clients/${encodeURIComponent(clientId)}/evaluations`,
      {},
      token
    );
  },

  createEvaluation(
    token: string | null,
    clientId: string,
    input: EvaluationInput
  ): Promise<Evaluation> {
    return request<Evaluation>(
      `clients/${encodeURIComponent(clientId)}/evaluations`,
      jsonBody(input),
      token
    );
  },

  getEvaluation(token: string | null, evaluationId: string): Promise<EvaluationWithClient> {
    return request<EvaluationWithClient>(
      `evaluations/${encodeURIComponent(evaluationId)}`,
      {},
      token
    );
  }
};
