import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, ItemDocument } from './item.schema';
import { buildItemFilterQuery } from 'src/utils/buildItemFilterQuery';
import { IPaginatedItems } from '../interfaces/paginated-item.interface';

const ALLOWED_SORT_FIELDS = ['price', 'acquisitionDate', 'title'] as const;
type SortableItemField = (typeof ALLOWED_SORT_FIELDS)[number] | 'createdAt';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
  ) {}

  async findAll(query: Record<string, any>): Promise<IPaginatedItems> {
    const filter = buildItemFilterQuery(query);

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
        .find(filter)
        .populate('category')
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.itemModel.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async findById(id: string): Promise<Item> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid item ID format');
    }

    const item = await this.itemModel.findById(id).populate('category');
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return item;
  }

  async create(data: CreateItemDto): Promise<Item> {
    const newItem = new this.itemModel(data);
    return newItem.save();
  }

  async update(id: string, updates: UpdateItemDto): Promise<Item> {
    const item = await this.itemModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return item;
  }

  async remove(id: string): Promise<Item> {
    const item = await this.itemModel.findByIdAndDelete(id);

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return item;
  }
}
