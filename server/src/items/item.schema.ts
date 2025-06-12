import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema'; // Corrected path assuming user schema is in user/
import { Category } from '../categories/category.schema'; // Corrected path

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  imageUrl?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Date })
  acquisitionDate?: Date;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  category?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true, index: true })
  user: Types.ObjectId;
}

export type ItemDocument = Item & Document;
export const ItemSchema = SchemaFactory.createForClass(Item);
