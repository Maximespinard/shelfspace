import { useState, useEffect } from 'react';
import { Settings, SlidersHorizontal } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import Section from '@/components/ui/base/Section';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import MotionDiv from '@/components/ui/animated/MotionDiv';
import { useCategoryModal } from '../../categories/hooks/useCategoryModal';
import { useItemModal } from '../../items/hooks/useItemModal';
import { useItemFilters } from '../../items/store/useItemFiltersStore';
import { blurThen } from '@/lib/utils';
import ItemFiltersDrawer from '../../items/components/ItemFiltersDrawer';
import { useActiveFilterCount } from '../hooks/useActiveFilterCount';
import { useResponsiveBreakpoints } from '@/hooks/useResponsiveBreakpoints';

const DashboardHeader = () => {
  const { open: openCategoryModal } = useCategoryModal();
  const { open: openItemModal } = useItemModal();
  const { filters, setFilter } = useItemFilters();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const [debouncedSearch] = useDebounce(searchValue, 300);

  const activeFilterCount = useActiveFilterCount();
  const { isMobile, isTablet, isDesktop } = useResponsiveBreakpoints();

  // Update filter store with debounced search value
  useEffect(() => {
    setFilter('search', debouncedSearch);
  }, [debouncedSearch, setFilter]);

  // Sync local search state with filter store when filters change externally
  useEffect(() => {
    setSearchValue(filters.search || '');
  }, [filters.search]);

  return (
    <Section className="py-6 sticky top-16 bg-background z-40">
      <MotionDiv variant="fadeInDown" className="flex flex-col gap-8">
        {/* Mobile: Vertical layout */}
        {isMobile && (
          <div className="flex flex-col gap-3 w-full">
            <Button className="h-12 w-full" onClick={(e) => {
              openItemModal('add');
              blurThen(e);
            }}>
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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        )}

        {/* Tablet: Two rows */}
        {isTablet && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center gap-4">
              <div className="flex gap-3">
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

              <Button className="h-12 px-5" onClick={(e) => {
                openItemModal('add');
                blurThen(e);
              }}>
                + Add New Item
              </Button>
            </div>

            <Input
              placeholder="Search items..."
              className="h-12 w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        )}

        {/* Desktop: Single row */}
        {isDesktop && (
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search items..."
              className="h-12 flex-1 max-w-2xl"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />

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

            <div className="ml-auto">
              <Button className="h-12 px-5" onClick={(e) => {
                openItemModal('add');
                blurThen(e);
              }}>
                + Add New Item
              </Button>
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
