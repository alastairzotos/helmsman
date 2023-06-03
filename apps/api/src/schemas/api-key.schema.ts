import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IApiKey } from 'models';

@Schema({ collection: 'api-keys' })
export class ApiKey implements IApiKey {
  @Prop()
  ownerId: string;
  
  @Prop()
  name: string;

  @Prop({ select: false })
  hashedKey?: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
