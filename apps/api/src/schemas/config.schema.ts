import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IConfig } from 'models';

@Schema({ collection: 'config' })
export class Config implements IConfig {
  @Prop()
  ownerId: string;
  
  @Prop()
  githubUsername: string;

  @Prop()
  githubToken: string;

  @Prop()
  k8sConfig: string;

  @Prop()
  predeployScript: string;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
