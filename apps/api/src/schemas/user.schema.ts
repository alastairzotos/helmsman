import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'users', timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } })
export class User {
  _id: string;

  @Prop({ type: String, trim: true })
  email?: string;

  @Prop({ type: String, trim: true })
  username?: string;

  @Prop({ type: String, select: false })
  hashedPassword?: string;

  @Prop({ type: Date })
  createdOn: Date;

  @Prop({ type: Date })
  updatedOn: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
