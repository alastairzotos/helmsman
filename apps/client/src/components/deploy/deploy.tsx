import React, { useState } from "react";
import { Button, Card, Space } from "antd";
import { getEnv } from "@/utils/env";
import { useDeploy } from "@/state/deploy.state";
import { IDeployMessageDto, IProject, WithId } from "models";
import { DeployMessage } from "@/components/deploy/deploy-message";
import { ConnStatus } from "@/components/deploy/conn-status";
import { useWebSockets } from "@/hooks/ws";
import { ScrollToBottom } from "@/components/_core/scroll-to-bottom";
import { withValue } from "@/utils/misc";

interface Props {
  project: WithId<IProject>;
}

export const Deploy: React.FC<Props> = ({ project }) => {
  const [deployStatus, deploy] = useDeploy(s => [s.status, s.request]);

  const [content, setContent] = useState<IDeployMessageDto[]>([]);

  const [connId, connStatus] = useWebSockets<IDeployMessageDto>(getEnv().apiUrl, (message) => {
    setContent((curContent) => {
      const lastMessage = curContent.at(-1);
      if (!lastMessage) {
        return [...curContent, message];
      }

      if (lastMessage.type === message.type) {
        switch (message.type) {
          case 'git':
            if (message.gitMessage?.phase === lastMessage.gitMessage?.phase) {
              return withValue(curContent, -1, message);
            }

            return [...curContent, message];
        }
      }

      return [...curContent, message];
    })
  })

  const handleDeployClick = () => {
    if (connStatus === 'connected') {
      deploy(project._id, connId);
    }
  }

  return (
    <Space direction="vertical">
      <ConnStatus status={connStatus} />

      <Card
        style={{
          width: 600,
          overflowY: 'scroll',
          maxHeight: 300,
          backgroundColor: '#101010'
        }}
      >
        <ScrollToBottom>
          {content.map((message, index) => (
            <div key={index}>
              <DeployMessage message={message} />
            </div>
          ))}
        </ScrollToBottom>
      </Card>

      <Button
        onClick={handleDeployClick}
        disabled={deployStatus === 'fetching' || connStatus !== 'connected'}
      >
        Deploy
      </Button>
    </Space>
  )
}
