import { StatusSwitch } from "@/components/_core/layout/status-switch";
import { useUninstall } from "@/state/deploy.state";
import { WithId } from "@bitmetro/auth-react";
import { Alert, Button, Popconfirm, Space } from "antd";
import { IProject } from "models";
import React from "react";

interface Props {
  project: WithId<IProject>;
}

export const ProjectUninstall: React.FC<Props> = ({ project }) => {
  const alertText = `This will uninstall ${project.name} and make it unavailable`;

  const [uninstalStatus, uninstall] = useUninstall(s => [s.status, s.request]);

  const handleUninstallClick = async () => {
    await uninstall(project._id);
  }

  return (
    <Space direction="vertical">
      <Alert type="warning" showIcon message={alertText} />

      <Popconfirm
        title={`Uninstall ${project.name}`}
        description={alertText}
        onConfirm={handleUninstallClick}
        okText="Uninstall"
        cancelText="Cancel"
        placement="right"
        disabled={uninstalStatus === "fetching"}
        cancelButtonProps={{ disabled: uninstalStatus === "fetching" }}
      >
        <Button
          type="primary"
          danger
          disabled={uninstalStatus === "fetching"}
        >
          Uninstall
        </Button>
      </Popconfirm>

      <StatusSwitch status={uninstalStatus} />
    </Space>
  )
}