import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    description: 'Category ID',
    example: '507f1f77bcf86cd799439011',
  })
  _id: string;

  @ApiProperty({
    description: 'Category name',
    example: 'Electronics',
  })
  name: string;

  @ApiProperty({
    description: 'Category color in hex format',
    example: '#FF5733',
  })
  color: string;

  @ApiProperty({
    description: 'User ID who owns the category',
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

export class CategoryResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Category retrieved successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Category data',
    type: CategoryDto,
  })
  data: CategoryDto;
}

export class CategoriesResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Categories retrieved successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Array of categories',
    type: [CategoryDto],
  })
  data: CategoryDto[];
}