import { StatusSwitch } from "@/components/_core/status-switch";
import { useProjectState } from "@/state/projects.state";
import { Alert, Button, Popconfirm, Space } from "antd";
import { IProject } from "models";
import React from "react";

interface Props {
  project: IProject & { _id: string };
}

export const ProjectDelete: React.FC<Props> = ({ project }) => {
  const alertText = `This will uninstal ${project.name} and delete it`;

  const { deleteProject, deleteProjectStatus, selectProjectId } = useProjectState();

  const handleDeleteClick = async () => {
    await deleteProject(project._id);
    selectProjectId(null);
  }

  return (
    <Space direction="vertical">
      <Alert type="warning" showIcon message={alertText} />

      <Popconfirm
        title={`Delete ${project.name}`}
        description={alertText}
        onConfirm={handleDeleteClick}
        okText="Delete"
        cancelText="Cancel"
        placement="right"
        disabled={deleteProjectStatus === "fetching"}
        cancelButtonProps={{ disabled: deleteProjectStatus === "fetching" }}
      >
        <Button
          type="primary"
          danger
          disabled={deleteProjectStatus === "fetching"}
        >
          Delete
        </Button>
      </Popconfirm>

      <StatusSwitch status={deleteProjectStatus} />
    </Space>
  )
}