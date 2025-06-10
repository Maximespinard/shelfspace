import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Username or email is required.' })
  identifier: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  @MaxLength(100, { message: 'Password must be no more than 100 characters.' })
  password: string;
}
