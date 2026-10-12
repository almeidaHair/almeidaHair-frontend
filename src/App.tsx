import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AppShell } from './components/layout/AppShell';
import { RootRedirect } from './components/layout/RootRedirect';
import { Login } from './pages/Login';
import { ClientList } from './pages/admin/ClientList';
import { ClientNew } from './pages/admin/ClientNew';
import { ClientDetail } from './pages/admin/ClientDetail';
import { EvaluationNew } from './pages/admin/EvaluationNew';
import { EvaluationDetail } from './pages/EvaluationDetail';
import { MyArea } from './pages/client/MyArea';
import { Profile } from './pages/Profile';

function AppContent() {
  const { theme } = useTheme();

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AuthProvider>
          <Toaster theme={theme} position="top-center" toastOptions={{ style: { fontFamily: 'Inter, sans-serif', borderRadius: 12 } }} />
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              element={
                <ProtectedRoute>
                  <AppShell />
                </ProtectedRoute>
              }>
              <Route path="/perfil" element={<Profile />} />
            </Route>

            <Route
              element={
              <ProtectedRoute role="admin">
                  <AppShell />
                </ProtectedRoute>
              }>
              
              <Route path="/admin" element={<ClientList />} />
              <Route path="/admin/clientes/nova" element={<ClientNew />} />
              <Route path="/admin/clientes/:clientId" element={<ClientDetail />} />
              <Route path="/admin/clientes/:clientId/avaliacoes/nova" element={<EvaluationNew />} />
              <Route path="/admin/clientes/:clientId/avaliacoes/:evaluationId" element={<EvaluationDetail />} />
            </Route>

            <Route
              element={
              <ProtectedRoute role="client">
                  <AppShell />
                </ProtectedRoute>
              }>
              
              <Route path="/minha-area" element={<MyArea />} />
              <Route path="/minha-area/avaliacoes/:evaluationId" element={<EvaluationDetail />} />
            </Route>

            <Route path="*" element={<RootRedirect />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}