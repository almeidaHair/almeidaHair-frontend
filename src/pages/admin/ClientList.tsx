import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, XIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAsync } from '../../hooks/useAsync';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { ClientResults } from '../../components/client/ClientResults';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { api } from '../../utils/api';
import { buttonClasses } from '../../utils/buttonStyles';

export function ClientList() {
  const { token } = useAuth();
  const [query, setQuery] = useState('');
  const debounced = useDebouncedValue(query.trim(), 250);
  const { data, error, loading, reload } = useAsync(() => api.listClients(token, debounced), [token, debounced]);

  const countLabel = data ?
  debounced ?
  `${data.length} ${data.length === 1 ? 'resultado' : 'resultados'} para “${debounced}”` :
  `${data.length} ${data.length === 1 ? 'cliente cadastrada' : 'clientes cadastradas'}` :
  'Carregando clientes…';

  return (
    <div>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-[1.75rem] font-bold leading-tight text-ink sm:text-3xl">Clientes</h1>
          <p className="mt-1 text-sm text-ink-muted" aria-live="polite">
            {countLabel}
          </p>
        </div>
        <Link to="/admin/clientes/nova" className={buttonClasses('primary', 'md', 'self-start sm:self-auto')}>
          <PlusIcon className="h-4 w-4" aria-hidden="true" />
          Nova cliente
        </Link>
      </header>

      <div className="relative mt-6">
        <label htmlFor="client-search" className="sr-only">
          Buscar cliente pelo nome
        </label>
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
        <input
          id="client-search"
          type="search"
          autoComplete="off"
          placeholder="Buscar pelo nome"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 w-full rounded-full border border-petal-border bg-white pl-11 pr-11 text-[15px] text-ink placeholder:text-ink-muted transition-[border-color,box-shadow] duration-150 focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/15 [&::-webkit-search-cancel-button]:hidden" />
        
        {query &&
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label="Limpar busca"
          className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-ink-muted transition-colors duration-150 hover:bg-petal/60 hover:text-wine">
          
            <XIcon className="h-4 w-4" />
          </button>
        }
      </div>

      <div className="mt-5">
        {error ?
        <ErrorState message={error.message} onRetry={reload} /> :
        !data ?
        <div className="space-y-2" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) =>
          <div key={i} className="h-16 animate-pulse rounded-xl bg-white/80" />
          )}
          </div> :
        data.length === 0 ?
        debounced ?
        <EmptyState
          title="Nenhuma cliente encontrada"
          description={`Não encontramos clientes com “${debounced}” no nome. Confira a grafia ou cadastre uma nova cliente.`} /> :


        <EmptyState
          title="Nenhuma cliente cadastrada"
          description="Cadastre a primeira cliente para começar a organizar fichas e avaliações."
          action={
          <Link to="/admin/clientes/nova" className={buttonClasses('primary')}>
                  <PlusIcon className="h-4 w-4" aria-hidden="true" />
                  Nova cliente
                </Link>
          } /> :



        <ClientResults clients={data} refreshing={loading} />
        }
      </div>
    </div>);

}