import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Username or email address',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty({ message: 'Username or email is required.' })
  identifier: string;

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
