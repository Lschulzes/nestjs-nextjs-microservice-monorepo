import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'apps/auth/src/users/schemas/user.schema';
import mongoose, { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({
  toJSON: {
    transform(_doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
    },
  },
})
export class Post {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ ref: 'User', type: mongoose.Schema.Types.ObjectId })
  userId: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
