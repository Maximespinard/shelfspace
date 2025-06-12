import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { logoutUser } from '@/lib/auth.api';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/shadcn/button';

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.warn('❌ Failed to logout from backend:', err);
    } finally {
      logout();
      navigate('/login');
      toast.success('You’ve been logged out.');
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
