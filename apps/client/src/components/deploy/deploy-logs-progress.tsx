import { Progress, Space } from "antd";
import { IDeployMessageProgressDto } from "models";
import React from "react";

interface Props {
  progressMessage: IDeployMessageProgressDto;
}

export const DeployLogsProgress: React.FC<Props> = ({ progressMessage }) => {
  return (
    <Space>
      <samp>{progressMessage.phase}</samp>
      <Progress size={14} type="circle" strokeWidth={10} percent={progressMessage.progress} />
    </Space>
  )
};
