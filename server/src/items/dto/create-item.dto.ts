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
  Matches,
  IsMongoId,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @Length(2, 100, { message: 'Title must be between 2 and 100 characters.' })
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000, { message: 'Description must be 5000 characters max.' })
  description?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9\s-]{2,30}$/, {
    message: 'Category must be alphanumeric (2–30 characters).',
  })
  @IsMongoId({ message: 'Category ID must be a valid Mongo ObjectId' })
  category?: string;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a valid number.' },
  )
  @Min(0, { message: 'Price must be at least 0.' })
  @Max(100000, { message: 'Price cannot exceed 100000.' })
  price?: number;

  @IsOptional()
  @IsDateString({}, { message: 'Acquisition date must be a valid ISO date.' })
  acquisitionDate?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Image URL must be a valid URL.' })
  imageUrl?: string;
}
