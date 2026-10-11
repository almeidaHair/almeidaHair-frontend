import { DependencyList, useCallback, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ApiError } from '../utils/apiError';

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export function useAsync<T>(fn: () => Promise<T>, deps: DependencyList) {
  const { expireSession } = useAuth();
  const [nonce, setNonce] = useState(0);
  const [state, setState] = useState<AsyncState<T>>({ data: null, error: null, loading: true });

  useEffect(() => {
    let active = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    fn().
    then((data) => {
      if (active) setState({ data, error: null, loading: false });
    }).
    catch((error: Error) => {
      if (!active) return;
      if (error instanceof ApiError && error.status === 401) expireSession();
      setState({ data: null, error, loading: false });
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  return { ...state, reload };
}