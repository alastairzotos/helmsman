import { projectsClient } from "@/clients/projects.client";
import { createQuery } from "@bitmetro/create-query";

export const useCreateProject = createQuery(projectsClient.create);
export const useGetAllProjects = createQuery(projectsClient.getAll);
export const useGetProjectById = createQuery(projectsClient.getById);
export const useGetProjectByName = createQuery(projectsClient.getByName);
export const useUpdateProject = createQuery(projectsClient.update);
export const useDeleteProject = createQuery(projectsClient.delete);
