import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { DashboardLayout } from './pages/admin/DashboardLayout';
import { Overview } from './pages/admin/Overview';
import { Conversations } from './pages/admin/Conversations';
import { Leads } from './pages/admin/Leads';
import { Cars } from './pages/admin/Cars';
import { Settings } from './pages/admin/Settings';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacidade" element={<PrivacyPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/termos" element={<TermsOfService />} />
          <Route path="/terms" element={<TermsOfService />} />

          {/* Rotas Restritas do Painel de Controle */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="conversations" element={<Conversations />} />
              <Route path="leads" element={<Leads />} />
              <Route path="cars" element={<Cars />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Redirecionamento padrão */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
