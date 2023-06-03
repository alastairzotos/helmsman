import React from "react";
import { Alert, AlertProps, Button, Space } from "antd";
import { CloudUploadOutlined } from '@ant-design/icons';
import { useDeploy } from "@/state/deploy.state";
import { IProject, WithId } from "models";
import { DeployLogs } from "@/components/deploy/deploy-logs";
import { FetchStatus } from "@bitmetro/create-query";

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

  return (
    <Space direction="vertical">
      <DeployLogs project={project} />

      <Space>
        <Button
          type="primary"
          onClick={() => deploy(project.name)}
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
    </Space>
  )
}
