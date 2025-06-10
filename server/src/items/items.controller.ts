import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './item.schema';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { ApiResponse as ApiResponseType } from 'src/interfaces/api-response.interface';

@ApiTags('Items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'List of items' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'minPrice', required: false, type: String })
  @ApiQuery({ name: 'maxPrice', required: false, type: String })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'ISO format date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'ISO format date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 12)',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    enum: ['price', 'acquisitionDate', 'title'],
    description: 'Sort field',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    type: String,
    enum: ['asc', 'desc'],
    description: 'Sort direction',
  })
  async findAll(
    @Query() query: Record<string, any>,
  ): Promise<ApiResponseType<any>> {
    const result = await this.itemsService.findAll(query);
    return {
      message: 'Items retrieved successfully',
      data: result,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Get a single item' })
  async findOne(@Param('id') id: string): Promise<ApiResponseType<Item>> {
    const item = await this.itemsService.findById(id);
    return {
      message: 'Item retrieved successfully',
      data: item,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'Create a new item' })
  async create(
    @Body() createItemDto: CreateItemDto,
  ): Promise<ApiResponseType<Item>> {
    const item = await this.itemsService.create(createItemDto);
    return {
      message: 'Item created successfully',
      data: item,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Update an item' })
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<ApiResponseType<Item>> {
    const item = await this.itemsService.update(id, updateItemDto);
    return {
      message: 'Item updated successfully',
      data: item,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Delete an item' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.itemsService.remove(id);
    return;
  }
}
