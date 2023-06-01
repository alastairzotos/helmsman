import { IProject } from "models";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useCreateProject } from "@/state/projects.state";
import { useRouter } from "next/router";
import { urls } from "@/urls";
import { ProjectManage } from "@/components/projects/project-manage";

const defaultValues: IProject = {
  name: '',
  namespace: '',
  githubUrl: '',
  helmRelease: '',
  path: '',
  valuesPath: '',
}

export const ProjectCreate: React.FC = () => {
  const router = useRouter();

  const [createStatus, createProject] = useCreateProject(s => [s.status, s.request]);

  const onSubmit: SubmitHandler<IProject> = async (data) => {
    await createProject({ ...data, secrets: {} });

    router.push(urls.projects.home());
  }

  return (
    <ProjectManage
      title="Create project"
      project={defaultValues}
      saveStatus={createStatus}
      onSave={onSubmit}
    />
  )
}
