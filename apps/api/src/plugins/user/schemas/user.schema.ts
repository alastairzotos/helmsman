import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from 'user-shared';

@Schema({ collection: 'users' })
export class User implements IUser {
  _id: string;
  
  @Prop()
  email: string;

  @Prop({ select: false })
  hashedPassword: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
