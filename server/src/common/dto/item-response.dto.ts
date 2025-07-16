import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @ApiProperty({
    description: 'Item ID',
    example: '507f1f77bcf86cd799439011',
  })
  _id: string;

  @ApiProperty({
    description: 'Item title',
    example: 'Vintage Guitar',
  })
  title: string;

  @ApiProperty({
    description: 'Item description',
    example: 'A beautiful vintage acoustic guitar from 1975',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Category ID',
    example: '507f1f77bcf86cd799439012',
    required: false,
  })
  category?: string;

  @ApiProperty({
    description: 'Item price',
    example: 1250.5,
    required: false,
  })
  price?: number;

  @ApiProperty({
    description: 'Acquisition date',
    example: '2023-12-01',
    required: false,
  })
  acquisitionDate?: string;

  @ApiProperty({
    description: 'Image URL',
    example: 'http://localhost:9000/shelfspace/image.jpg',
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    description: 'User ID who owns the item',
    example: '507f1f77bcf86cd799439013',
  })
  userId: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-12-01T10:30:00.000Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-12-01T10:30:00.000Z',
  })
  updatedAt: string;
}

export class PaginationMetaDto {
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  currentPage: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Total number of items',
    example: 120,
  })
  totalItems: number;

  @ApiProperty({
    description: 'Items per page',
    example: 12,
  })
  itemsPerPage: number;

  @ApiProperty({
    description: 'Whether there is a next page',
    example: true,
  })
  hasNextPage: boolean;

  @ApiProperty({
    description: 'Whether there is a previous page',
    example: false,
  })
  hasPreviousPage: boolean;
}

export class PaginatedItemsDto {
  @ApiProperty({
    description: 'Array of items',
    type: [ItemDto],
  })
  items: ItemDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  pagination: PaginationMetaDto;
}

export class ItemResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Item retrieved successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Item data',
    type: ItemDto,
  })
  data: ItemDto;
}

export class ItemsResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Items retrieved successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Paginated items data',
    type: PaginatedItemsDto,
  })
  data: PaginatedItemsDto;
}
