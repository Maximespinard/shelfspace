import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
    required: false,
  })
  category?: Types.ObjectId;

  @Prop()
  price?: number;

  @Prop()
  acquisitionDate?: Date;

  @Prop()
  imageUrl?: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
