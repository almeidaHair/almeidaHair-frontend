import React, { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { homeFor } from '../../utils/routes';
import { LoadingState } from '../ui/LoadingState';
import type { Role } from '../../types/models';

interface ProtectedRouteProps {
  role?: Role;
  children?: ReactNode;
}

export function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const { session, status } = useAuth();
  const location = useLocation();

  if (status === 'loading') {
    return (
      <div className="min-h-screen w-full bg-blush">
        <LoadingState label="Verificando acesso…" />
      </div>);

  }
  if (!session) return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  if (role && session.role !== role) return <Navigate to={homeFor(session.role)} replace />;

  return <>{children ?? <Outlet />}</>;
}