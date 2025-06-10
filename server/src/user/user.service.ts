import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(id: string): Promise<UserDocument> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID format');
    }

    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username });
  }

  async findByEmailOrUsername(
    identifier: string,
  ): Promise<UserDocument | null> {
    return this.userModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
  }

  async create(data: {
    email: string;
    username: string;
    password: string;
  }): Promise<UserDocument> {
    return this.userModel.create(data);
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: hashed,
    });
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: null,
    });
  }
}
