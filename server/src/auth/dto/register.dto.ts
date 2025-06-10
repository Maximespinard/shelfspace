import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email must be a valid address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required.' })
  @Matches(/^[a-zA-Z0-9_-]{3,20}$/, {
    message:
      'Username must be 3–20 characters, using letters, numbers, "-" or "_".',
  })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  @MaxLength(100, { message: 'Password must be no more than 100 characters.' })
  password: string;
}
