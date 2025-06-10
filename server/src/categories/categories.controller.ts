import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.schema';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { ApiResponse as ApiResponseType } from 'src/interfaces/api-response.interface';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'List of all categories' })
  async findAll(): Promise<ApiResponseType<Category[]>> {
    const categories = await this.categoriesService.findAll();
    return {
      message: 'Categories retrieved successfully',
      data: categories,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'Category created' })
  async create(
    @Body() dto: CreateCategoryDto,
  ): Promise<ApiResponseType<Category>> {
    const category = await this.categoriesService.create(dto);
    return {
      message: 'Category created successfully',
      data: category,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Category updated' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ): Promise<ApiResponseType<Category>> {
    const updated = await this.categoriesService.update(id, dto);
    return {
      message: 'Category updated successfully',
      data: updated,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Category deleted' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoriesService.remove(id);
    return;
  }
}
