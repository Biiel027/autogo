import React from 'react';
import { Navigate } from 'react-router-dom';

export const Cars: React.FC = () => {
  return <Navigate to="/admin/leads" replace />;
};
