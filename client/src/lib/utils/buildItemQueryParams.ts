import { type ItemFilters } from '@/store/useItemFiltersStore';

export function buildItemQueryParams(
  filters: ItemFilters
): Record<string, string> {
  const {
    category,
    search,
    sortBy,
    order,
    minPrice,
    maxPrice,
    startDate,
    endDate,
  } = filters;

  const query: Record<string, string> = {};

  if (category && category !== 'all') query.category = category;
  if (search?.trim()) query.search = search.trim();
  if (sortBy && sortBy !== 'createdAt') query.sortBy = sortBy;
  if (order && order !== 'desc') query.order = order;
  if (minPrice?.trim()) query.minPrice = minPrice.trim();
  if (maxPrice?.trim()) query.maxPrice = maxPrice.trim();
  if (startDate) query.startDate = startDate;
  if (endDate) query.endDate = endDate;

  return query;
}
