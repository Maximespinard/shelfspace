import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import LogoutButton from '@/components/auth/LogoutButton';

const PrivateLayout = () => {
  const hasCheckedAuth = useAuthStore((state) => state.hasCheckedAuth);
  const user = useAuthStore((state) => state.user);

  if (!hasCheckedAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-muted-foreground text-sm">
          Loading your space...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">
          Welcome back, <span className="text-primary">{user?.username}</span>
        </h1>
        <LogoutButton />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
