import { type ItemFilters } from '../store/useItemFiltersStore';

/**
 * Builds URL query parameters from item filters, excluding default values.
 * Only includes non-default filter values to keep URLs clean.
 * 
 * @param filters - Item filters object from the store
 * @returns Record of query parameter key-value pairs
 * 
 * @example
 * ```tsx
 * const params = buildItemQueryParams({
 *   category: 'electronics',
 *   search: 'laptop',
 *   sortBy: 'price',
 *   order: 'asc',
 *   page: 2
 * });
 * // Returns: { category: 'electronics', search: 'laptop', sortBy: 'price', order: 'asc', page: '2' }
 * ```
 */
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
    page,
    limit,
  } = filters;

  const query: Record<string, string> = {};

  if (category && category !== 'all') query.category = category;
  if (search?.trim()) query.search = search.trim();
  if (sortBy && sortBy !== 'createdAt') query.sortBy = sortBy;
  if (order && order !== 'desc') query.order = order;
  if (minPrice && parseInt(minPrice) > 0) query.minPrice = String(minPrice);
  if (maxPrice && parseInt(maxPrice) > 0) query.maxPrice = String(maxPrice);
  if (startDate) query.startDate = startDate;
  if (endDate) query.endDate = endDate;
  if (page && page > 1) query.page = String(page);
  if (limit && limit !== 12) query.limit = String(limit);

  return query;
}
