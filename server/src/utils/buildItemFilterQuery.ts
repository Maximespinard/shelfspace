import { FilterQuery } from 'mongoose';
import { Item } from 'src/items/item.schema';

interface FilterParams {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  startDate?: string;
  endDate?: string;
}

export function buildItemFilterQuery(params: FilterParams): FilterQuery<Item> {
  const query: FilterQuery<Item> = {};

  if (params.search) query.title = { $regex: params.search, $options: 'i' };

  if (params.category) query.category = params.category;

  if (params.minPrice || params.maxPrice) {
    query.price = {
      ...(params.minPrice && { $gte: parseFloat(params.minPrice) }),
      ...(params.maxPrice && { $lte: parseFloat(params.maxPrice) }),
    };
  }

  if (params.startDate || params.endDate) {
    query.acquisitionDate = {
      ...(params.startDate && { $gte: new Date(params.startDate) }),
      ...(params.endDate && { $lte: new Date(params.endDate) }),
    };
  }

  return query;
}
