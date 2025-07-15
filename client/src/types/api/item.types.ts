// Base item data structure
export interface ItemBase {
  title: string;
  description?: string | null;
  price?: number | null;
  acquisitionDate?: string | null;
  category?: string | null;
}

// Item as stored in database
export interface Item extends ItemBase {
  _id: string;
  imageUrl?: string | null;
  user: string;
  createdAt: string;
  updatedAt: string;
}

// Item with populated category
export interface ItemWithCategory extends Omit<Item, 'category'> {
  category?: {
    _id: string;
    name: string;
    color: string;
  } | null;
}

// Form data for creating an item
// Image will be handled separately via multipart upload
export type CreateItemData = ItemBase;

// Form data for updating an item
export interface UpdateItemData extends Partial<ItemBase> {
  removeImage?: boolean;
}

// Response types
export interface ItemsResponse {
  items: ItemWithCategory[];
  total: number;
  page: number;
  limit: number;
}

// Query parameters for fetching items
export interface ItemsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'createdAt' | 'title' | 'price' | 'acquisitionDate';
  order?: 'asc' | 'desc';
}