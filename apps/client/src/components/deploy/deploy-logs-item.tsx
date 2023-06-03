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
      return <Text>{log.textMessage}</Text>;
    
    case "array":
      return (
        <>
          {log.arrayMessage?.map((line, index) => (
            <div key={index}>
              <Text>{line}</Text>
            </div>
          ))}
        </>
      );

    case "progress":
      return (
        <Space>
          <Text>{log.progressMessage?.phase}</Text>
          <Progress size={14} type="circle" strokeWidth={10} percent={log.progressMessage?.progress} />
        </Space>
      )
  }

  return null;
}
