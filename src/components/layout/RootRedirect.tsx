import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { homeFor } from '../../utils/routes';
import { LoadingState } from '../ui/LoadingState';

export function RootRedirect() {
  const { session, status } = useAuth();
  if (status === 'loading') return <LoadingState />;
  return <Navigate to={session ? homeFor(session.role) : '/login'} replace />;
}