import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Email must be a valid address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @ApiProperty({
    description: 'Unique username for the account',
    example: 'john_doe',
    minLength: 3,
    maxLength: 20,
    pattern: '^[a-zA-Z0-9_-]{3,20}$',
  })
  @IsString()
  @IsNotEmpty({ message: 'Username is required.' })
  @Matches(/^[a-zA-Z0-9_-]{3,20}$/, {
    message:
      'Username must be 3–20 characters, using letters, numbers, "-" or "_".',
  })
  username: string;

  @ApiProperty({
    description: 'Account password',
    example: 'securePassword123',
    minLength: 6,
    maxLength: 100,
    format: 'password',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  @MaxLength(100, { message: 'Password must be no more than 100 characters.' })
  password: string;
}
