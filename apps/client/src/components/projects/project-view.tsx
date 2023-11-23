import { StatusSwitch } from "@/components/_core/status-switch";
import { Deploy } from "@/components/deploy/deploy";
import { ProjectDelete } from "@/components/projects/project-delete";
import { ProjectManage } from "@/components/projects/project-manage";
import { ProjectUninstall } from "@/components/projects/project-uninstall";
import { SecretsManage } from "@/components/projects/secrets-manage";
import { useProjectState } from "@/state/projects.state";
import { Card, Tabs } from "antd";
import { IProject, IProjectDto, WithId } from "models";
import React from "react";
import { SubmitHandler } from "react-hook-form";

interface Props {
  project: WithId<IProjectDto>;
}

export const ProjectView: React.FC<Props> = ({ project }) => {
  const { updateProject, updateProjectsStatus, selectNs } = useProjectState();

  const onSubmit: SubmitHandler<IProject> = async (data) => {
    await updateProject(project!._id, data);

    if (project.namespace !== data.namespace) {
      selectNs(data.namespace)
    }
  }

  return (
    <Card type="inner" title={project.name}>
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
                saveStatus={updateProjectsStatus}
                onSave={onSubmit}
              />
            )
          },
          {
            key: "secrets",
            label: "Secrets",
            children: <SecretsManage project={project} />
          },
          {
            key: "uninstall",
            label: "Uninstall",
            children: <ProjectUninstall project={project} />
          },
          {
            key: "delete",
            label: "Delete",
            children: <ProjectDelete project={project} />
          }
        ]}
      />
    </Card>
  )
}
