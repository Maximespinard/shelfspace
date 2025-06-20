import { useState } from 'react';
import { Settings, SlidersHorizontal } from 'lucide-react';
import Section from '@/components/ui/base/Section';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import MotionDiv from '@/components/ui/animated/MotionDiv';
import { useCategoryModal } from '@/hooks/useCategoryModal';
import { useItemModal } from '@/hooks/useItemModal';
import { useItemFilters } from '@/store/useItemFiltersStore';
import { blurThen } from '@/lib/utils/dom';
import ItemFiltersDrawer from '../items/ItemFiltersDrawer';
import { useMediaQuery } from 'usehooks-ts';
import { useActiveFilterCount } from '@/hooks/useActiveFilterCount';

const DashboardHeader = () => {
  const { open: openCategoryModal } = useCategoryModal();
  const { open: openItemModal } = useItemModal();
  const { filters, setFilter } = useItemFilters();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const activeFilterCount = useActiveFilterCount();

  return (
    <Section>
      <MotionDiv variant="fadeInDown" className="flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center text-primary">
          My Collection
        </h2>

        {isMobile ? (
          <div className="flex flex-col gap-3 w-full">
            <Button
              className="h-12 w-full"
              onClick={(e) => {
                openItemModal('add');
                blurThen(e);
              }}
            >
              + Add New Item
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-12 w-full min-w-0 truncate"
                onClick={() => openCategoryModal('add')}
              >
                <Settings className="w-4 h-4 mr-2 shrink-0" />
                <span className="truncate">Manage Categories</span>
              </Button>
              <Button
                variant="outline"
                className="h-12 w-full justify-start min-w-0 truncate"
                onClick={() => setDrawerOpen(true)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2 shrink-0" />
                <span className="truncate">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="ml-2 text-xs text-muted-foreground whitespace-nowrap">
                    ({activeFilterCount})
                  </span>
                )}
              </Button>
            </div>

            <Input
              placeholder="Search items..."
              className="h-12 w-full"
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end gap-4 flex-wrap">
              <div className="flex gap-3 flex-wrap">
                <Button
                  variant="outline"
                  className="h-12"
                  onClick={(e) => {
                    openCategoryModal('add');
                    blurThen(e);
                  }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Categories
                </Button>

                <Button
                  variant="outline"
                  className="h-12 justify-start"
                  onClick={() => setDrawerOpen(true)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({activeFilterCount})
                    </span>
                  )}
                </Button>
              </div>

              <Button
                className="h-12 px-5"
                onClick={(e) => {
                  openItemModal('add');
                  blurThen(e);
                }}
              >
                + Add New Item
              </Button>
            </div>

            <div className="w-full max-w-xl mx-auto mt-10">
              <Input
                placeholder="Search items..."
                className="h-12 w-full"
                value={filters.search}
                onChange={(e) => setFilter('search', e.target.value)}
              />
            </div>
          </div>
        )}

        <ItemFiltersDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </MotionDiv>
    </Section>
  );
};

export default DashboardHeader;
