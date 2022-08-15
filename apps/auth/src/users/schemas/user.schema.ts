import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    transform(_doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    },
  },
})
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['client', 'admin'], default: 'client' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
