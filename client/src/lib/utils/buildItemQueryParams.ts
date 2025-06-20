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
  if (minPrice && minPrice > 0) query.minPrice = String(minPrice);
  if (maxPrice && maxPrice > 0) query.maxPrice = String(maxPrice);
  if (startDate) query.startDate = startDate;
  if (endDate) query.endDate = endDate;

  return query;
}
