import { useState } from 'react';
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

const DashboardHeader = () => {
  const [sort, setSort] = useState('recent');

  return (
    <Section className="flex flex-col gap-6">
      {/* Title + Add button */}
      <MotionDiv variant="fadeInUp" delay={0.1}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            My Collection
          </h2>
          <Button className="w-full sm:w-auto">+ Add New Item</Button>
        </div>
      </MotionDiv>

      {/* Filters */}
      <MotionDiv variant="fadeInUp" delay={0.2}>
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          <div className="flex-1">
            <Input placeholder="Search items..." className="h-10" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Select>
              <SelectTrigger className="h-10 w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {/* Dynamic categories later */}
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recently Added</SelectItem>
                <SelectItem value="name-asc">Name A–Z</SelectItem>
                <SelectItem value="name-desc">Name Z–A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </MotionDiv>
    </Section>
  );
};

export default DashboardHeader;
