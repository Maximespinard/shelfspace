import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SafeUser } from 'src/interfaces/safe-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<Partial<User>> {
    const userExists = await this.userService.findByEmail(dto.email);
    if (userExists) {
      throw new ConflictException('Email is already in use');
    }

    const usernameTaken = await this.userService.findByUsername(dto.username);
    if (usernameTaken) {
      throw new ConflictException('Username is already taken');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userService.create({
      email: dto.email,
      username: dto.username,
      password: hashedPassword,
    });

    const safeUser = newUser.toObject() as Partial<User>;
    delete safeUser.password;
    return safeUser;
  }

  async login(
    dto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const identifier = dto.identifier;
    if (!identifier) throw new UnauthorizedException('Missing identifier');

    const user = await this.userService.findByEmailOrUsername(identifier);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const userId: string = (user._id as Types.ObjectId).toString();

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.generateTokens(userId);
    await this.userService.updateRefreshToken(userId, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: string): Promise<void> {
    await this.userService.removeRefreshToken(userId);
  }

  async generateTokens(
    userId: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ sub: userId }, { expiresIn: '15m' }),
      this.jwtService.signAsync({ sub: userId }, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }

  async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) throw new ForbiddenException('Invalid refresh token');

    const tokens = await this.generateTokens(userId);
    await this.userService.updateRefreshToken(userId, tokens.refreshToken);

    return tokens;
  }

  async getMe(userId: string): Promise<SafeUser> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return {
      _id: user._id as Types.ObjectId,
      username: user.username,
      email: user.email,
    };
  }
}
