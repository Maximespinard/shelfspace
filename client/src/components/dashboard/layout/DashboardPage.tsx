import DashboardHeader from '@/components/dashboard/layout/DashboardHeader';
import Section from '@/components/ui/base/Section';
import EmptyState from './EmptyState';
import EmptyWithFilters from './EmptyWithFilters';
import { useItems } from '@/hooks/useItems';
import { useItemFilters } from '@/store/useItemFiltersStore';
import ItemCard from '../items/ItemCard';
import { filtersAreActive } from '@/lib/utils/isFiltersActive';

const DashboardPage = () => {
  const { items } = useItems();
  const { filters } = useItemFilters();
  const hasActiveFilters = filtersAreActive(filters);

  return (
    <section className="space-y-6">
      <DashboardHeader />
      <Section>
        {items.length === 0 ? (
          hasActiveFilters ? (
            <EmptyWithFilters />
          ) : (
            <EmptyState />
          )
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
