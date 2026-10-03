import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingSpinner } from '../ui';
import useAuthStore from '../../store/useAuthStore';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

