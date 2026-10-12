import type {
  ChangePasswordInput,
  Client,
  ClientEditableInput,
  ClientInput,
  ClientSummary,
  Evaluation,
  EvaluationInput,
  EvaluationWithClient,
  ProfileInput,
  Session
} from '../types/models';
import { request } from './httpClient';

function jsonBody(value: unknown, method = 'POST'): RequestInit {
  return { method, body: JSON.stringify(value) };
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

  updateProfile(token: string | null, input: ProfileInput): Promise<Session> {
    return request<Session>('auth/profile', jsonBody(input, 'PATCH'), token);
  },

  changePassword(token: string | null, input: ChangePasswordInput): Promise<void> {
    return request<void>('auth/password', jsonBody(input, 'PATCH'), token);
  },

  listClients(token: string | null, query: string): Promise<ClientSummary[]> {
    return request<ClientSummary[]>(`clients?query=${encodeURIComponent(query)}`, {}, token);
  },

  createClient(token: string | null, input: ClientInput): Promise<Client> {
    return request<Client>('clients', jsonBody(input), token);
  },

  updateClient(token: string | null, clientId: string, input: ClientEditableInput): Promise<Client> {
    return request<Client>(`clients/${encodeURIComponent(clientId)}`, jsonBody(input, 'PATCH'), token);
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
