import { httpClient } from '@/clients/http.client';
import { IProject, UpdateProps, WithId } from 'models';

export const projectsClient = {
  create: async (project: IProject) => {
    await httpClient.post<IProject>('/api/v1/projects', project);
  },

  getAll: async () => {
    const { data } = await httpClient.get<WithId<IProject>[]>('/api/v1/projects');

    return data;
  },

  getById: async (id: string) => {
    const { data } = await httpClient.get<WithId<IProject>>(`/api/v1/projects/${id}`);

    return data;
  },

  getByName: async (name: string) => {
    const { data } = await httpClient.get<WithId<IProject>>(`/api/v1/projects/by-name/${name}`);

    return data;
  },

  update: async (id: string, values: Partial<IProject>) => {
    await httpClient.patch<UpdateProps<IProject>>('/api/v1/projects', { id, values });
  },

  delete: async (id: string) => {
    await httpClient.delete(`/api/v1/projects/${id}`);
  }
}

