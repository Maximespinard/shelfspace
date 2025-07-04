import { IsString, Matches, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(30)
  name: string;

  @IsString()
  @Matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
    message: 'Color must be a valid hex code (e.g., #AABBCC)',
  })
  color: string;
}
