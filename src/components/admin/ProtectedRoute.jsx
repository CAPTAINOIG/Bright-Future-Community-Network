import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '../ui';
import useAuthStore from '../../store/useAuthStore';

export default function ProtectedRoute({ children }) {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user || !isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

