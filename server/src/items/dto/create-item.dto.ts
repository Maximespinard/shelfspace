import {
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsUrl,
  Min,
  Max,
  MaxLength,
  Length,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: 'Item title',
    example: 'Vintage Guitar',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @Length(2, 100, { message: 'Title must be between 2 and 100 characters.' })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the item',
    example: 'A beautiful vintage acoustic guitar from 1975',
    maxLength: 5000,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(5000, { message: 'Description must be 5000 characters max.' })
  description?: string;

  @ApiProperty({
    description: 'Category ID for the item',
    example: '507f1f77bcf86cd799439011',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsMongoId({ message: 'Category ID must be a valid Mongo ObjectId' })
  category?: string;

  @ApiProperty({
    description: 'Price of the item',
    example: 1250.50,
    minimum: 0,
    maximum: 100000,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a valid number.' },
  )
  @Min(0, { message: 'Price must be at least 0.' })
  @Max(100000, { message: 'Price cannot exceed 100000.' })
  price?: number;

  @ApiProperty({
    description: 'Date when the item was acquired',
    example: '2023-12-01',
    format: 'date',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Acquisition date must be a valid ISO date.' })
  acquisitionDate?: string;

  @ApiProperty({
    description: 'URL of the item image',
    example: 'https://example.com/image.jpg',
    format: 'url',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'Image URL must be a valid URL.' })
  imageUrl?: string;
}
