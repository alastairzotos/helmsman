import { httpClient } from '@/clients/http.client';
import { IProjectDto, IProject, UpdateProps, WithId, IGetSecretsDto, ISecretsDto, IUpdateSecretsDto } from 'models';

export const createProject = async (project: IProject) => {
  await httpClient.post<IProject>('/projects', project);
};

export const getAllProjects = async () => {
  const { data } = await httpClient.get<WithId<IProjectDto>[]>('/projects');

  return data;
};

export const getProjectById = async (id: string) => {
  const { data } = await httpClient.get<WithId<IProjectDto>>(`/projects/${id}`);

  return data;
};

export const getProjectByName = async (name: string) => {
  const { data } = await httpClient.get<WithId<IProjectDto>>(`/projects/by-name/${name}`);

  return data;
};

export const updateProject = async (id: string, values: Partial<IProject>) => {
  await httpClient.patch<UpdateProps<IProject>>('/projects', { id, values });
};

export const deleteProject = async (id: string) => {
  await httpClient.delete(`/projects/${id}`);
};

export const getSecrets = async (id: string, password: string) => {
  const { data } = await httpClient.post<IGetSecretsDto, { data: ISecretsDto }>('/projects/get-secrets', { id, password });

  return data;
}

export const updateSecrets = async (id: string, values: IUpdateSecretsDto) => {
  await httpClient.patch<UpdateProps<IUpdateSecretsDto>>('/projects/update-secrets', { id, values });
}
