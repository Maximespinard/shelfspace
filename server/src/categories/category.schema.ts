import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop()
  color?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  user: Types.ObjectId;
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.index({ name: 1, user: 1 }, { unique: true });
