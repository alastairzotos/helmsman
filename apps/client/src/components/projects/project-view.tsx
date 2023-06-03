import { StatusSwitch } from "@/components/_core/status-switch";
import { Deploy } from "@/components/deploy/deploy";
import { ProjectManage } from "@/components/projects/project-manage";
import { SecretsManage } from "@/components/projects/secrets-manage";
import { useGetProjectById, useUpdateProject } from "@/state/projects.state";
import { Tabs } from "antd";
import { IProject } from "models";
import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

interface Props {
  id: string;
}

export const ProjectView: React.FC<Props> = ({ id }) => {
  const [getProjectStatus, getProject, project] = useGetProjectById(s => [s.status, s.request, s.value]);

  const [updateStatus, updateProject] = useUpdateProject(s => [s.status, s.request]);

  useEffect(() => {
    if (!!id) {
      getProject(id);
    }
  }, [id]);

  const onSubmit: SubmitHandler<IProject> = async (data) => {
    await updateProject(project!._id, data);
  }

  return (
    <StatusSwitch status={getProjectStatus}>
      {project && (
        <Tabs
          defaultActiveKey="deploy"
          items={[
            {
              key: "deploy",
              label: "Deploy",
              children: <Deploy project={project} />
            },
            {
              key: "edit",
              label: "Edit",
              children: (
                <ProjectManage
                  project={project}
                  saveStatus={updateStatus}
                  onSave={onSubmit}
                />
              )
            },
            {
              key: "secrets",
              label: "Secrets",
              children: (
                <SecretsManage project={project} />
              )
            }
          ]}
        />
      )}
    </StatusSwitch>
  )
}
