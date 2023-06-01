import { Progress, Space, Typography } from "antd";
import { IDeployMessageDto } from "models";
import React from "react";

const { Text } = Typography;

interface Props {
  log: IDeployMessageDto;
}

export const DeployLogsItem: React.FC<Props> = ({ log }) => {
  switch (log.type) {
    case "text":
      return <Text style={{ marginLeft: 10 }}>{log.textMessage}</Text>;

    case "progress":
      return (
        <Space style={{ marginLeft: 10 }}>
          <Text>{log.progressMessage?.phase}</Text>
          <Progress size={14} type="circle" strokeWidth={10} percent={log.progressMessage?.progress} />
        </Space>
      )
  }

  return null;
}
