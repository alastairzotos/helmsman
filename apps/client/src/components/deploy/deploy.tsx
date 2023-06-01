import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Space, Typography } from "antd";
import { getEnv } from "@/utils/env";
import { useDeploy } from "@/state/deploy.state";
import { IDeployMessageDto, IDeployMessageStatus, IProject, WithId, deployStatusText } from "models";
import { ConnStatus } from "@/components/deploy/conn-status";
import { useWebSockets } from "@/hooks/ws";
import { ScrollToBottom } from "@/components/_core/scroll-to-bottom";
import { replaceIndex } from "@/utils/misc";
import { DeployLogsSection, IDeployLogsSection } from "@/components/deploy/deploy-logs-section";

const { Text } = Typography;

interface Props {
  project: WithId<IProject>;
}

export const Deploy: React.FC<Props> = ({ project }) => {
  const deploy = useDeploy(s => s.request);

  const [status, setStatus] = useState<IDeployMessageStatus | null>(null);
  const [sections, setSections] = useState<IDeployLogsSection[]>([]);

  const handleReceiveMessage = useCallback((message: IDeployMessageDto) => {
    switch (message.type) {
      case "status":
        setStatus(message.status!);
        break;

      case "phase":
        setSections((curSections) => [
          ...curSections,
          {
            phase: message.phase!,
            logs: [],
          }
        ])
        break;

      default:
        setSections((curSections) => {
          return replaceIndex(
            curSections,
            -1,
            {
              ...curSections.at(-1)!,
              logs: message.replaceLast
                ? replaceIndex(curSections.at(-1)?.logs!, -1, message)
                : [...curSections.at(-1)?.logs!, message]
            }
          );
        })
    }
  }, []);

  const [connStatus, reconnect] = useWebSockets(project._id, getEnv().apiUrl, 3004, handleReceiveMessage);

  useEffect(() => {
    setSections([]);
  }, [project._id]);

  const handleDeployClick = () => {
    if (connStatus === 'connected') {
      setSections([]);
      deploy(project._id);
    }
  }

  return (
    <Space direction="vertical">
      <ConnStatus status={connStatus} onReconnect={reconnect} />

      <Card
        style={{
          width: 600,
          overflowY: 'scroll',
          maxHeight: 300,
          backgroundColor: '#101010'
        }}
      >
        <ScrollToBottom>
          <Space direction="vertical" style={{ width: '100%' }}>
            {sections.map((section, index) => (
              <DeployLogsSection key={index} section={section} />
            ))}
          </Space>
        </ScrollToBottom>
      </Card>

      <Space>
        <Button
          type="primary"
          onClick={handleDeployClick}
          disabled={status === "started" || connStatus !== 'connected'}
        >
          Deploy
        </Button>

        {!!status && (
          <Text style={{ margin: 10 }}>{deployStatusText[status]}</Text>
        )}
      </Space>
    </Space>
  )
}
