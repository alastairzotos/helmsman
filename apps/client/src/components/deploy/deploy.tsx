import React, { useState } from "react";
import { Alert, AlertProps, Button, Space } from "antd";
import { CloudUploadOutlined } from '@ant-design/icons';
import { useDeploy } from "@/state/deploy.state";
import { IProject, WithId } from "models";
import { DeployLogs } from "@/components/deploy/deploy-logs";
import { FetchStatus } from "@bitmetro/create-query";
import { useRefreshToken } from "@/hooks/refresh";

interface Props {
  project: WithId<IProject>;
}

const deployStatusText: Record<FetchStatus, string> = {
  "fetching": "Started",
  "error": "Error",
  "success": "Finished",
}

const deployStatusAlertType: Record<FetchStatus, AlertProps['type']> = {
  "fetching": "info",
  "error": "error",
  "success": "success",
}

export const Deploy: React.FC<Props> = ({ project }) => {
  const [deployStatus, deploy] = useDeploy(s => [s.status, s.request]);
  const [deployToken, refreshDeployToken] = useRefreshToken();

  const handleDeployClick = () => {
    deploy(project.name);
    refreshDeployToken();
  }

  return (
    <Space direction="vertical">
      <Space>
        <Button
          type="primary"
          onClick={handleDeployClick}
          disabled={deployStatus === "fetching"}
          block
          icon={<CloudUploadOutlined />}
        >
          Deploy
        </Button>

        {!!deployStatus && (
          <Alert
            showIcon
            message={deployStatusText[deployStatus]}
            type={deployStatusAlertType[deployStatus]}
          />
        )}
      </Space>

      <DeployLogs key={deployToken} project={project} />
    </Space>
  )
}
