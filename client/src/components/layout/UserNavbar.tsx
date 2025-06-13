import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { logoutUserApi } from '@/lib/api/auth';
import { Button } from '../ui/shadcn/button';
import { toast } from 'sonner';

const UserNavbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUserApi();
    } catch (err) {
      console.warn('❌ Failed to logout from backend:', err);
    } finally {
      logout();
      navigate('/login');
      toast.success('You’ve been logged out.'); // TODO: use the component
    }
  };

  return (
    <nav className="w-full border-b px-6 py-3 flex items-center justify-between bg-background">
      <span className="font-bold text-3xl text-primary">ShelfSpace</span>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{user?.username}</span>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default UserNavbar;
