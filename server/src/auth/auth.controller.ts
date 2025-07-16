import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiResponse as ApiResponseType } from 'src/interfaces/api-response.interface';
import { SafeUser } from 'src/interfaces/safe-user.interface';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { AuthThrottlerGuard } from './guards/auth-throttler.guard';
import {
  AuthResponseDto,
  RegisterResponseDto,
  UserInfoResponseDto,
} from '../common/dto/auth-response.dto';
import {
  ErrorResponseDto,
  ValidationErrorDto,
} from '../common/dto/error-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(AuthThrottlerGuard)
  @Throttle({ short: { ttl: 60000, limit: 3 } })
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Creates a new user account with email, username, and password',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: RegisterResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ValidationErrorDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Email or username already exists',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Rate limit exceeded',
    type: ErrorResponseDto,
  })
  async register(@Body() dto: RegisterDto): Promise<ApiResponseType<any>> {
    const user = await this.authService.register(dto);
    return {
      message: 'Registration successful',
      data: user,
    };
  }

  @Post('login')
  @UseGuards(AuthThrottlerGuard)
  @Throttle({ short: { ttl: 60000, limit: 5 } })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticates user and returns access and refresh tokens',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful with tokens',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ValidationErrorDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 429,
    description: 'Rate limit exceeded',
    type: ErrorResponseDto,
  })
  async login(@Body() dto: LoginDto): Promise<ApiResponseType<any>> {
    const tokens = await this.authService.login(dto);
    return {
      message: 'Login successful',
      data: tokens,
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User logout',
    description: 'Invalidates the current refresh token',
  })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(
    @Request() req: { user: { id: string } },
  ): Promise<ApiResponseType<null>> {
    await this.authService.logout(req.user.id);
    return {
      message: 'Logout successful',
      data: null,
    };
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Refresh access token',
    description:
      'Generates new access and refresh tokens using the current refresh token',
  })
  @ApiResponse({ status: 200, description: 'Refresh token successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Invalid refresh token' })
  async refresh(
    @Request() req: { user: { id: string } },
    @Body() dto: RefreshTokenDto,
  ): Promise<ApiResponseType<any>> {
    const tokens = await this.authService.refreshTokens(
      req.user.id,
      dto.refreshToken,
    );
    return {
      message: 'Token refreshed successfully',
      data: tokens,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current user info',
    description: 'Returns the authenticated user information',
  })
  @ApiResponse({
    status: 200,
    description: 'Authenticated user info',
    type: UserInfoResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async getMe(
    @Request() req: { user: { id: string } },
  ): Promise<ApiResponseType<SafeUser>> {
    const user = await this.authService.getMe(req.user.id);
    return {
      message: 'Authenticated user retrieved',
      data: user,
    };
  }
}
