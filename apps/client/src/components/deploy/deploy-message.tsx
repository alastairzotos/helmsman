import { Alert, Progress, Space, Typography } from "antd";
import { IDeployMessageDto, deployPhaseTitles } from "models";
import React from "react";

const { Text } = Typography;

interface Props {
  message: IDeployMessageDto;
}

export const DeployMessage: React.FC<Props> = ({ message }) => {
  switch (message.type) {
    case 'phase':
      return (
        <Alert
          style={{ marginTop: 20 }}
          message={deployPhaseTitles[message.phase!]}
          type={message.phase === "finished" ? "success" : "info"}
        />
      );

    case 'git':
      if (message.gitMessage?.progress !== undefined) {
        return (
          <Space style={{ marginLeft: 10 }}>
            <Text>{message.gitMessage?.phase}</Text>
            <Progress size={14} type="circle" percent={message.gitMessage?.progress} />
          </Space>
        )
      }

      return <Text style={{ marginLeft: 10 }}>{message.gitMessage?.phase}</Text>;
  }

  return null;
}
