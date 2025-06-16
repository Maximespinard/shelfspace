import DashboardHeader from '@/components/dashboard/layout/DashboardHeader';
import Section from '@/components/ui/base/Section';
import EmptyState from './EmptyState';
import { useItems } from '@/hooks/useItems';
import ItemCard from '../items/ItemCard';

const DashboardPage = () => {
  const { items } = useItems();
  return (
    <section className="space-y-6">
      <DashboardHeader />
      <Section>
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </Section>
    </section>
  );
};

export default DashboardPage;
