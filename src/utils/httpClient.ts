import { ApiError } from './apiError';
import type { FieldErrors } from './validation';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');

interface ErrorPayload {
  status?: number;
  statusCode?: number;
  message?: string | string[];
  fieldErrors?: FieldErrors;
}

function errorMessage(payload: ErrorPayload | null, fallback: string): string {
  if (Array.isArray(payload?.message)) return payload.message.join(' ');
  if (typeof payload?.message === 'string') return payload.message;
  return fallback;
}

export async function request<T>(
  path: string,
  options: RequestInit = {},
  token: string | null = null
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  if (options.body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) headers.set('Authorization', `Bearer ${token}`);

  let response: Response;
  try {
    response = await fetch(`${API_URL}/${path.replace(/^\//, '')}`, { ...options, headers });
  } catch {
    throw new ApiError(0, 'Não foi possível conectar ao servidor. Tente novamente.');
  }

  const text = response.status === 204 ? '' : await response.text();
  let payload: unknown = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      if (response.ok) {
        throw new ApiError(response.status, 'O servidor retornou uma resposta inválida.');
      }
    }
  }

  if (!response.ok) {
    const error = payload && typeof payload === 'object' ? payload as ErrorPayload : null;
    throw new ApiError(
      error?.status ?? error?.statusCode ?? response.status,
      errorMessage(error, response.statusText || 'Não foi possível concluir a solicitação.'),
      error?.fieldErrors
    );
  }

  if (!text) return undefined as T;
  return payload as T;
}
