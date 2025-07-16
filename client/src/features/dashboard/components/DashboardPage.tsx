import DashboardHeader from './DashboardHeader';
import Section from '@/components/ui/base/Section';
import EmptyState from './EmptyState';
import EmptyWithFilters from './EmptyWithFilters';
import { useItemsRQ } from '../../items/hooks/useItemsRQ';
import { useItemFilters } from '../../items/store/useItemFiltersStore';
import ItemCard from '../../items/components/ItemCard';
import LoadingState from './LoadingState';
import Pagination from '@/components/ui/shadcn/pagination';
import { filtersAreActive } from '../../items/utils/isFiltersActive';
import type { ItemWithCategory } from '../../items/types/item.types';

const DashboardPage = () => {
  const { items, loading, total, page, limit } = useItemsRQ();
  const { filters, setFilter } = useItemFilters();
  const hasActiveFilters = filtersAreActive(filters);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    setFilter('page', newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const renderEmptyState = () =>
    hasActiveFilters ? <EmptyWithFilters /> : <EmptyState />;

  const renderItemGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item: ItemWithCategory, index) => (
        <ItemCard key={item._id} item={item} index={index} />
      ))}
    </div>
  );

  return (
    <section className="space-y-8">
      <DashboardHeader />
      <Section>
        {loading ? (
          <LoadingState />
        ) : items.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            {renderItemGrid()}
            {total > limit && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={total}
                itemsPerPage={limit}
                className="mt-8"
              />
            )}
          </>
        )}
      </Section>
    </section>
  );
};

export default DashboardPage;
