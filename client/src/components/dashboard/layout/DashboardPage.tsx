import DashboardHeader from '@/components/dashboard/layout/DashboardHeader';
import Section from '@/components/ui/base/Section';
import EmptyState from './EmptyState';
import EmptyWithFilters from './EmptyWithFilters';
import { useItemsRQ } from '@/hooks/data/useItemsRQ';
import { useItemFilters } from '@/store/useItemFiltersStore';
import ItemCard from '../items/ItemCard';
import ItemCardSkeleton from '../items/ItemCardSkeleton';
import { filtersAreActive } from '@/lib/utils/isFiltersActive';

const DashboardPage = () => {
  const { items, loading } = useItemsRQ();
  const { filters } = useItemFilters();
  const hasActiveFilters = filtersAreActive(filters);

  const renderSkeletonGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ItemCardSkeleton key={i} />
      ))}
    </div>
  );

  const renderEmptyState = () =>
    hasActiveFilters ? <EmptyWithFilters /> : <EmptyState />;

  const renderItemGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );

  return (
    <section className="space-y-6">
      <DashboardHeader />
      <Section>
        {loading
          ? renderSkeletonGrid()
          : items.length === 0
          ? renderEmptyState()
          : renderItemGrid()}
      </Section>
    </section>
  );
};

export default DashboardPage;
