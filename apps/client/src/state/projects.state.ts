import { create } from 'zustand';
import { createProject, deleteProject, getAllProjects, getSecrets, updateProject, updateSecrets } from "@/clients/projects.client";
import { FetchStatus, createQuery } from "@bitmetro/create-query";
import { IProject, IProjectDto, WithId } from 'models';
import { uninstallProject } from '@/clients/deploy.client';

export const useCreateProject = createQuery(createProject);
export const useDeleteProject = createQuery(deleteProject);
export const useGetSecrets = createQuery(getSecrets);
export const useUpdateSecrets = createQuery(updateSecrets);

export interface ProjectStateValues {
  loadProjectsStatus?: FetchStatus;
  updateProjectsStatus?: FetchStatus;
  deleteProjectStatus?: FetchStatus;
  projects: WithId<IProjectDto>[];
  selectedProjectId: string | null;
  selectedNs: string | null;
}

export interface ProjectStateActions {
  selectProjectId: (id: string | null) => void;
  selectNs: (ns: string | null) => void;
  loadProjects: () => Promise<void>;
  updateProject: (id: string, project: IProject) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export type ProjectState = ProjectStateValues & ProjectStateActions;

const createProjectState = () =>
  create<ProjectState>((set, self) => ({
    projects: [],
    selectedProjectId: null,
    selectedNs: null,

    selectProjectId: (id: string | null) => set({ selectedProjectId: id }),
    selectNs: (ns: string | null) => set({ selectedNs: ns }),

    loadProjects: async () => {
      try {
        set({ loadProjectsStatus: 'fetching' });

        const projects = await getAllProjects();

        set({
          loadProjectsStatus: 'success',
          projects,
        });
      } catch {
        set({ loadProjectsStatus: 'error' });
      }
    },

    updateProject: async (id: string, project: IProject) => {
      try {
        set({ updateProjectsStatus: 'fetching' });

        await updateProject(id, project);

        set({
          updateProjectsStatus: 'success',
          projects: self().projects.map(proj => proj._id === id ? { _id: id, ...project } : proj),
        });
      } catch {
        set({ updateProjectsStatus: 'error' });
      }
    },

    deleteProject: async (id: string) => {
      try {
        set({ deleteProjectStatus: 'fetching' });

        try {
          await uninstallProject(id);
        } catch { }

        await deleteProject(id);

        set({
          deleteProjectStatus: 'success',
          projects: self().projects.filter(proj => proj._id !== id),
        });
      } catch {
        set({ deleteProjectStatus: 'error' });
      }
    }
  }))

export const useProjectState = createProjectState();

