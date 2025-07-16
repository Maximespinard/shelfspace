import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;
}

export class UserDto {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011',
  })
  _id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Username',
    example: 'john_doe',
  })
  username: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Login successful',
  })
  message: string;

  @ApiProperty({
    description: 'Authentication tokens',
    type: TokensDto,
  })
  data: TokensDto;
}

export class RegisterResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Registration successful',
  })
  message: string;

  @ApiProperty({
    description: 'User information',
    type: UserDto,
  })
  data: UserDto;
}

export class UserInfoResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Authenticated user retrieved',
  })
  message: string;

  @ApiProperty({
    description: 'User information',
    type: UserDto,
  })
  data: UserDto;
}
