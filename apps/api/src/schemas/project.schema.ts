import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IProject } from 'models';

@Schema({ collection: 'projects' })
export class Project implements IProject {
  @Prop()
  name: string;

  @Prop()
  namespace: string;

  @Prop()
  helmRelease: string;

  @Prop()
  path: string;

  @Prop()
  valuesPath: string;

  @Prop()
  githubUrl: string;

  @Prop({ type: Object })
  secrets: Record<string, string>;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
