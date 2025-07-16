import { IsString, Matches, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Electronics',
    maxLength: 30,
  })
  @IsString()
  @MaxLength(30)
  name: string;

  @ApiProperty({
    description: 'Category color in hex format',
    example: '#FF5733',
    pattern: '^#(?:[0-9a-fA-F]{3}){1,2}$',
  })
  @IsString()
  @Matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
    message: 'Color must be a valid hex code (e.g., #AABBCC)',
  })
  color: string;
}
