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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './item.schema';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { ApiResponse as ApiResponseType } from 'src/interfaces/api-response.interface';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

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
    @CurrentUser('id') userId: string,
  ): Promise<ApiResponseType<any>> {
    const result = await this.itemsService.findAll(query, userId);
    return {
      message: 'Items retrieved successfully',
      data: result,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Get a single item' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ): Promise<ApiResponseType<Item>> {
    const item = await this.itemsService.findById(id, userId);
    return {
      message: 'Item retrieved successfully',
      data: item,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 201, description: 'Create a new item' })
  async create(
    @Body('data') rawData: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('id') userId: string,
  ): Promise<ApiResponseType<Item>> {
    const createItemDto = JSON.parse(rawData) as CreateItemDto;

    const item = await this.itemsService.create(createItemDto, userId, file);

    return {
      message: 'Item created successfully',
      data: item,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 200, description: 'Update an item' })
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('data') rawData: string,
    @CurrentUser('id') userId: string,
  ): Promise<ApiResponseType<Item>> {
    const updateItemDto = JSON.parse(rawData) as UpdateItemDto;

    const item = await this.itemsService.update(
      id,
      updateItemDto,
      userId,
      file,
    );

    return {
      message: 'Item updated successfully',
      data: item,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Delete an item' })
  async remove(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ): Promise<void> {
    await this.itemsService.remove(id, userId);
    return;
  }
}
