import { useAuthStore } from '@/store/authStore';

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="p-6 text-xl">
      Welcome to your dashboard,{' '}
      <span className="font-bold">{user?.username}</span> 👋
    </div>
  );
};

export default DashboardPage;
