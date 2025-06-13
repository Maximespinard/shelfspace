import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { fetchMe } from '@/lib/auth.api';
import { handleApiError } from '@/lib/api-error';

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
        const response = await fetchMe();
        const user = response.data;
        login(user, token);
      } catch (err) {
        logout();
        handleApiError(err);
      } finally {
        setHasCheckedAuth(true);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return null;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
