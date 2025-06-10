import { Types } from 'mongoose';

export interface SafeUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
}
