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

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().sort({ name: 1 }).exec();
  }

  async findOne(id: string): Promise<Category> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid category ID format');
    }

    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = new this.categoryModel(createCategoryDto);
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
  ): Promise<Category> {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async remove(id: string): Promise<Category> {
    const category = await this.categoryModel.findByIdAndDelete(id);

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }
}
