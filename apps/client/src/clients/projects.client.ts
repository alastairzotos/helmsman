import { httpClient } from '@/clients/http.client';
import { IProject, UpdateProps, WithId } from 'models';

export const createProject = async (project: IProject) => {
  await httpClient.post<IProject>('/projects', project);
};

export const getAllProjects = async () => {
  const { data } = await httpClient.get<WithId<IProject>[]>('/projects');

  return data;
};

export const getProjectById = async (id: string) => {
  const { data } = await httpClient.get<WithId<IProject>>(`/projects/${id}`);

  return data;
};

export const getProjectByName = async (name: string) => {
  const { data } = await httpClient.get<WithId<IProject>>(`/projects/by-name/${name}`);

  return data;
};

export const updateProject = async (id: string, values: Partial<IProject>) => {
  await httpClient.patch<UpdateProps<IProject>>('/projects', { id, values });
};

export const deleteProject = async (id: string) => {
  await httpClient.delete(`/projects/${id}`);
};


