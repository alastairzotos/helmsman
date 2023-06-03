import { createProject, deleteProject, getAllProjects, getProjectById, getProjectByName, getSecrets, updateProject, updateSecrets } from "@/clients/projects.client";
import { createQuery } from "@bitmetro/create-query";

export const useCreateProject = createQuery(createProject);
export const useGetAllProjects = createQuery(getAllProjects);
export const useGetProjectById = createQuery(getProjectById);
export const useGetProjectByName = createQuery(getProjectByName);
export const useUpdateProject = createQuery(updateProject);
export const useDeleteProject = createQuery(deleteProject);
export const useGetSecrets = createQuery(getSecrets);
export const useUpdateSecrets = createQuery(updateSecrets);
