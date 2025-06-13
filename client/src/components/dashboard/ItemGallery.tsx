import EmptyState from '@/components/dashboard/EmptyState';
import ItemGrid from '@/components/dashboard/ItemGrid';
import Section from '@/components/ui/base/Section';

const ItemGallery = () => {
  const items = [];

  return (
    <Section>{items.length === 0 ? <EmptyState /> : <ItemGrid />}</Section>
  );
};

export default ItemGallery;
