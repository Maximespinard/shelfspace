import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import UserNavbar from '@/components/layout/UserNavbar';
import CategoryModal from '../dashboard/categories/CategoryModal';

const PrivateLayout = () => {
  useEffect(() => {
    document.body.classList.add('light');
    return () => document.body.classList.remove('light');
  }, []);

  const hasCheckedAuth = useAuthStore((state) => state.hasCheckedAuth);

  if (!hasCheckedAuth) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
        <div className="text-2xl font-bold text-primary mb-2">ShelfSpace</div>
        <div className="flex gap-1 text-sm text-muted-foreground">
          <span>Loading</span>
          <span className="animate-bounce">.</span>
          <span className="animate-bounce delay-150">.</span>
          <span className="animate-bounce delay-300">.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <UserNavbar />
      <main className="flex-1 px-6 py-6 max-w-7xl w-full mx-auto">
        <Outlet />
        <CategoryModal />
      </main>
    </div>
  );
};

export default PrivateLayout;
