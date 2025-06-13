import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ItemGallery from '@/components/dashboard/ItemGallery';

const DashboardPage = () => {
  return (
    <section className="space-y-6">
      <DashboardHeader />
      <ItemGallery />
    </section>
  );
};

export default DashboardPage;
