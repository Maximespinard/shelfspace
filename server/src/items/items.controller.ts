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
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { FormDataBody } from './dto/form-data-body.dto';
import { Item } from './item.schema';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { ApiResponse as ApiResponseType } from 'src/interfaces/api-response.interface';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import {
  ItemResponseDto,
  ItemsResponseDto,
} from '../common/dto/item-response.dto';
import { ValidationErrorDto } from '../common/dto/error-response.dto';
import {
  UnauthorizedErrorDto,
  NotFoundErrorDto,
  BadRequestErrorDto,
  InternalServerErrorDto,
} from '../common/dto/common-error-responses.dto';

@ApiTags('Items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all items',
    description:
      'Returns paginated list of items with optional filtering, sorting, and search',
  })
  @ApiResponse({
    status: 200,
    description: 'List of items',
    type: ItemsResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid query parameters',
    type: BadRequestErrorDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedErrorDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: InternalServerErrorDto,
  })
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
  @ApiOperation({
    summary: 'Get item by ID',
    description: 'Returns a single item by its ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Get a single item',
    type: ItemResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: UnauthorizedErrorDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Item not found',
    type: NotFoundErrorDto,
  })
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
  @ApiConsumes('multipart/form-data', 'application/json')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: 'Create a new item',
    description: 'Creates a new item with optional image upload',
  })
  @ApiResponse({
    status: 201,
    description: 'Create a new item',
    type: ItemResponseDto,
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
    @Body() body: CreateItemDto | FormDataBody,
    @UploadedFile() file: Express.Multer.File | undefined,
    @CurrentUser('id') userId: string,
  ): Promise<ApiResponseType<Item>> {
    let createItemDto: CreateItemDto;

    // Check if we received FormData with 'data' field or direct JSON
    if ('data' in body && typeof body.data === 'string') {
      // FormData case - parse the JSON from 'data' field
      createItemDto = JSON.parse(body.data) as CreateItemDto;
    } else {
      // Direct JSON case
      createItemDto = body as CreateItemDto;
    }

    const item = await this.itemsService.create(createItemDto, userId, file);

    return {
      message: 'Item created successfully',
      data: item,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data', 'application/json')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: 'Update an item',
    description: 'Updates an existing item with optional image upload',
  })
  @ApiResponse({
    status: 200,
    description: 'Update an item',
    type: ItemResponseDto,
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
    description: 'Item not found',
    type: NotFoundErrorDto,
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateItemDto | FormDataBody,
    @UploadedFile() file: Express.Multer.File | undefined,
    @CurrentUser('id') userId: string,
  ): Promise<ApiResponseType<Item>> {
    let updateItemDto: UpdateItemDto;

    // Check if we received FormData with 'data' field or direct JSON
    if ('data' in body && typeof body.data === 'string') {
      // FormData case - parse the JSON from 'data' field
      updateItemDto = JSON.parse(body.data) as UpdateItemDto;
    } else {
      // Direct JSON case
      updateItemDto = body as UpdateItemDto;
    }

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
  @ApiOperation({
    summary: 'Delete an item',
    description: 'Deletes an item and its associated image',
  })
  @ApiResponse({ status: 204, description: 'Delete an item' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  async remove(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ): Promise<void> {
    await this.itemsService.remove(id, userId);
    return;
  }

  @Post(':id/image')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: 'Upload item image',
    description: 'Uploads or updates an image for an existing item',
  })
  @ApiResponse({ status: 200, description: 'Upload or update item image' })
  @ApiResponse({ status: 400, description: 'Invalid file or missing image' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  @ApiBody({
    description: 'Image file',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File | undefined,
    @CurrentUser('id') userId: string,
  ): Promise<ApiResponseType<Item>> {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }
    const item = await this.itemsService.updateImage(id, userId, file);
    return {
      message: 'Image uploaded successfully',
      data: item,
    };
  }

  @Delete(':id/image')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete item image',
    description: 'Removes the image from an existing item',
  })
  @ApiResponse({ status: 200, description: 'Delete item image' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  async deleteImage(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ): Promise<ApiResponseType<Item>> {
    const item = await this.itemsService.deleteImage(id, userId);
    return {
      message: 'Image deleted successfully',
      data: item,
    };
  }
}
