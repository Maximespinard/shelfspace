import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, ItemDocument } from './item.schema';
import { buildItemFilterQuery } from 'src/utils/buildItemFilterQuery';
import { IPaginatedItems } from '../interfaces/paginated-item.interface';
import { CategoriesService } from 'src/categories/categories.service';
import { UploadService } from 'src/upload/upload.service';

const ALLOWED_SORT_FIELDS = ['price', 'acquisitionDate', 'title'] as const;
type SortableItemField = (typeof ALLOWED_SORT_FIELDS)[number] | 'createdAt';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
    private readonly categoriesService: CategoriesService,
    private readonly uploadService: UploadService,
  ) {}

  async findAll(
    query: Record<string, any>,
    userId: string,
  ): Promise<IPaginatedItems> {
    const filter = buildItemFilterQuery(query);
    const userScopedFilter = { ...filter, user: userId };

    const page = parseInt(String(query.page), 10) || 1;
    const limit = parseInt(String(query.limit), 10) || 12;
    const skip = (page - 1) * limit;

    const sortBy: SortableItemField =
      typeof query.sortBy === 'string' &&
      (ALLOWED_SORT_FIELDS as readonly string[]).includes(query.sortBy)
        ? (query.sortBy as SortableItemField)
        : 'createdAt';

    const order: 1 | -1 = String(query.order).toLowerCase() === 'asc' ? 1 : -1;

    const [items, total] = await Promise.all([
      this.itemModel
        .find(userScopedFilter)
        .populate('category')
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.itemModel.countDocuments(userScopedFilter),
    ]);

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async findById(id: string, userId: string): Promise<Item> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid item ID format');
    }

    const item = await this.itemModel
      .findOne({ _id: id, user: userId })
      .populate('category');
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return item;
  }

  async create(
    data: CreateItemDto,
    userId: string,
    file?: Express.Multer.File,
  ): Promise<Item> {
    if (data.category) {
      await this.categoriesService.findOne(data.category, userId);
    }

    let imageUrl: string | undefined;

    console.log(file);

    if (file) {
      imageUrl = await this.uploadService.uploadFile(
        file.buffer,
        file.originalname,
        file.mimetype,
      );
    }

    const newItem = new this.itemModel({ ...data, user: userId, imageUrl });
    const savedItem = await newItem.save();

    const populatedItem = await this.itemModel
      .findById(savedItem._id)
      .populate('category')
      .lean();

    if (!populatedItem) {
      throw new InternalServerErrorException('Failed to populate created item');
    }

    return populatedItem;
  }

  async update(
    id: string,
    updates: UpdateItemDto,
    userId: string,
  ): Promise<Item> {
    if (updates.category) {
      await this.categoriesService.findOne(updates.category, userId);
    }

    const item = await this.itemModel
      .findOneAndUpdate({ _id: id, user: userId }, updates, {
        new: true,
        runValidators: true,
      })
      .populate('category')
      .lean();

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return item;
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.itemModel.deleteOne({ _id: id, user: userId });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }
}
