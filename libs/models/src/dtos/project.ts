import { IProject } from "../schemas";

export type IProjectDto = Omit<IProject, 'secrets'>;
export type ISecretsDto = IProject['secrets'];

export interface IGetSecretsDto {
  id: string;
  password: string;
}

export interface IUpdateSecretsDto {
  secrets: IProject['secrets'];
}
