import { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import Section from '@/components/ui/base/Section';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/shadcn/select';
import MotionDiv from '@/components/ui/animated/MotionDiv';
import { useCategories } from '@/hooks/useCategories';
import { useCategoryModal } from '@/hooks/useCategoryModal';
import { useItemModal } from '@/hooks/useItemModal';
import { blurThen } from '@/lib/utils/dom';

const DashboardHeader = () => {
  const [sort, setSort] = useState('recent');
  const { categories } = useCategories();
  const { open: openCategoryModal } = useCategoryModal();
  const { open: openItemModal } = useItemModal();

  return (
    <Section>
      <MotionDiv variant="fadeInDown" className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">My Collection</h2>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          {/* Left section */}
          <Input
            placeholder="Search items..."
            className="h-12 sm:w-[300px] flex-1"
          />

          {/* Right controls */}
          <div className="flex flex-wrap gap-3 justify-end">
            <Select>
              <SelectTrigger className="h-12 w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.length === 0 ? (
                  <div className="px-3 py-2 text-muted-foreground text-sm">
                    No categories yet
                  </div>
                ) : (
                  <>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </>
                )}
                <div className="border-t my-1" />
                <Button
                  variant="ghost"
                  onClick={() => openCategoryModal('add')}
                  className="w-full justify-start px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Plus className="mr-2 size-4" />
                  Manage Categories
                </Button>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              className="h-12"
              onClick={() => openCategoryModal('add')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage Categories
            </Button>

            <Button
              variant="default"
              size="sm"
              className="h-12 px-5"
              onClick={(e) => {
                openItemModal('add');
                blurThen(e);
              }}
            >
              + Add New Item
            </Button>
          </div>
        </div>
      </MotionDiv>
    </Section>
  );
};

export default DashboardHeader;
