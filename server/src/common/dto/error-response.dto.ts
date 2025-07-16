import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Invalid input data',
  })
  message: string;

  @ApiProperty({
    description: 'Error type',
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    description: 'Timestamp of the error',
    example: '2023-12-01T10:30:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/api/auth/login',
  })
  path: string;
}

export class ValidationErrorDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Validation error messages',
    example: [
      'Email must be a valid address',
      'Password must be at least 6 characters',
    ],
    type: [String],
  })
  message: string[];

  @ApiProperty({
    description: 'Error type',
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    description: 'Timestamp of the error',
    example: '2023-12-01T10:30:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/api/auth/register',
  })
  path: string;
}
