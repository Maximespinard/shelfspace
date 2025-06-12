import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { Category, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(userId: string): Promise<Category[]> {
    return this.categoryModel.find({ user: userId }).sort({ name: 1 }).exec();
  }

  async findOne(id: string, userId: string): Promise<Category> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid category ID format');
    }

    const category = await this.categoryModel.findOne({
      _id: id,
      user: userId,
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async create(
    createCategoryDto: CreateCategoryDto,
    userId: string,
  ): Promise<Category> {
    try {
      const category = new this.categoryModel({
        ...createCategoryDto,
        user: userId,
      });
      return await category.save();
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        throw new ConflictException('Entity already exists');
      }
      throw err;
    }
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    userId: string,
  ): Promise<Category> {
    const category = await this.categoryModel.findOneAndUpdate(
      { _id: id, user: userId },
      updateCategoryDto,
      { new: true, runValidators: true },
    );

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.categoryModel.deleteOne({
      _id: id,
      user: userId,
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
