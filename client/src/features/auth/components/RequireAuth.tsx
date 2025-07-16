import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { fetchMeApi } from '../api/auth';
import { handleApiError } from '@/lib/utils/handleApiError';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  const hasCheckedAuth = useAuthStore((state) => state.hasCheckedAuth);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setHasCheckedAuth = useAuthStore((state) => state.setHasCheckedAuth);

  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      if (!token || hasCheckedAuth) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetchMeApi();
        const user = response.data;
        login(user, token);
      } catch (err) {
        logout();
        handleApiError(err, undefined, 'auth');
      } finally {
        setHasCheckedAuth(true);
        setLoading(false);
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return null;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
