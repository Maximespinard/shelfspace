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
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.schema';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { ApiResponse as ApiResponseType } from 'src/interfaces/api-response.interface';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import {
  CategoryResponseDto,
  CategoriesResponseDto,
} from '../common/dto/category-response.dto';
import { ValidationErrorDto } from '../common/dto/error-response.dto';
import {
  UnauthorizedErrorDto,
  NotFoundErrorDto,
} from '../common/dto/common-error-responses.dto';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all categories',
    description: 'Returns all categories belonging to the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all categories',
    type: CategoriesResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedErrorDto,
  })
  async findAll(
    @CurrentUser('id') userId: string,
  ): Promise<ApiResponseType<Category[]>> {
    const categories = await this.categoriesService.findAll(userId);
    return {
      message: 'Categories retrieved successfully',
      data: categories,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new category',
    description: 'Creates a new category with name and color',
  })
  @ApiResponse({
    status: 201,
    description: 'Category created',
    type: CategoryResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ValidationErrorDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedErrorDto,
  })
  async create(
    @Body() dto: CreateCategoryDto,
    @CurrentUser('id') userId: string,
  ): Promise<ApiResponseType<Category>> {
    const category = await this.categoriesService.create(dto, userId);
    return {
      message: 'Category created successfully',
      data: category,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update a category',
    description: 'Updates an existing category name and/or color',
  })
  @ApiResponse({
    status: 200,
    description: 'Category updated',
    type: CategoryResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ValidationErrorDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedErrorDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
    type: NotFoundErrorDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
    @CurrentUser('id') userId: string,
  ): Promise<ApiResponseType<Category>> {
    const updated = await this.categoriesService.update(id, dto, userId);
    return {
      message: 'Category updated successfully',
      data: updated,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a category',
    description: 'Deletes a category and all its associated items',
  })
  @ApiResponse({ status: 204, description: 'Category deleted' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedErrorDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
    type: NotFoundErrorDto,
  })
  async remove(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ): Promise<void> {
    await this.categoriesService.remove(id, userId);
    return;
  }
}
