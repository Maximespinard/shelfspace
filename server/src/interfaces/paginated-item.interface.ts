import { ItemDocument } from 'src/items/item.schema';

export interface IPaginatedItems {
  items: ItemDocument[];
  total: number;
  page: number;
  limit: number;
}
