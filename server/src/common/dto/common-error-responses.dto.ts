import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedErrorDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 401,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Unauthorized',
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the error',
    example: '2023-12-01T10:30:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/api/items',
  })
  path: string;
}

export class ForbiddenErrorDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 403,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Forbidden resource',
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the error',
    example: '2023-12-01T10:30:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/api/items/123',
  })
  path: string;
}

export class NotFoundErrorDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Item not found',
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the error',
    example: '2023-12-01T10:30:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/api/items/507f1f77bcf86cd799439011',
  })
  path: string;
}

export class ConflictErrorDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 409,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Email already exists',
  })
  message: string;

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

export class TooManyRequestsErrorDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 429,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Too Many Requests',
  })
  message: string;

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

export class BadRequestErrorDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Invalid file format',
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the error',
    example: '2023-12-01T10:30:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/api/items/123/image',
  })
  path: string;
}

export class InternalServerErrorDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 500,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Internal server error',
  })
  message: string;

  @ApiProperty({
    description: 'Timestamp of the error',
    example: '2023-12-01T10:30:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/api/items',
  })
  path: string;
}
