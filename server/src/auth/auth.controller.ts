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
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiResponse as ApiResponseType } from 'src/interfaces/api-response.interface';
import { SafeUser } from 'src/interfaces/safe-user.interface';
import { JwtAuthGuard } from './guards/jwt-auth-guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  async register(@Body() dto: RegisterDto): Promise<ApiResponseType<any>> {
    const user = await this.authService.register(dto);
    return {
      message: 'Registration successful',
      data: user,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Login successful with tokens' })
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
  @ApiResponse({ status: 200, description: 'Logout successful' })
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
  @ApiResponse({ status: 200, description: 'Refresh token successful' })
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
  @ApiResponse({ status: 200, description: 'Authenticated user info' })
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
