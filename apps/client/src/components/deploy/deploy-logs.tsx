import { ScrollToBottom } from "@/components/_core/scroll-to-bottom";
import { ConnStatus } from "@/components/deploy/conn-status";
import { DeployLogsSection, IDeployLogsSection } from "@/components/deploy/deploy-logs-section";
import { useWebSockets } from "@/hooks/ws";
import { replaceIndex } from "@/utils/misc";
import { Card, Space, Typography, theme } from "antd";
import { IDeployMessageDto, IDeployMessageStatus, IProject, WithId } from "models";
import React, { useCallback, useEffect, useState } from "react";

const { Text } = Typography;

interface Props {
  project: WithId<IProject>;
}

export const DeployLogs: React.FC<Props> = ({ project }) => {
  const {
    token: {
      colorBgMask: bgColour
    },
  } = theme.useToken();

  const [status, setStatus] = useState<IDeployMessageStatus | null>(null);
  const [sections, setSections] = useState<IDeployLogsSection[]>([]);

  const handleReceiveMessage = useCallback((message: IDeployMessageDto) => {
    switch (message.type) {
      case "status":
        setStatus(message.status!);

        if (message.status === "started") {
          setSections([]);
        } else if (message.status === "error") {
          setSections((curSections) =>
            replaceIndex(curSections, -1, (section) => ({
              ...section!,
              error: true,
            }))
          );
        }

        break;

      case "phase":
        setSections((curSections) => [
          ...curSections,
          {
            phase: message.phase!,
            logs: [],
            error: false,
          }
        ])
        break;

      default:
        setSections((curSections) =>
          replaceIndex(
            curSections,
            -1,
            (section) => ({
              ...section!,
              logs: message.replaceLast
                ? replaceIndex(section?.logs!, -1, message)
                : [...section?.logs!, message]
            })
          )
        );
    }
  }, []);

  const [connStatus, reconnect] = useWebSockets(project.name, handleReceiveMessage);

  useEffect(() => {
    setSections([]);
  }, [project._id]);

  return (
    <Space direction="vertical">
      <Card
        style={{
          width: 800,
          overflowY: 'scroll',
          maxHeight: 500,
          backgroundColor: bgColour,
        }}
      >
        {!status && <Text type="secondary">Waiting for deployment</Text>}

        <ScrollToBottom>
          <Space direction="vertical" style={{ width: '100%' }}>
            {sections.map((section, index) => (
              <DeployLogsSection
                key={index}
                section={section}
                isActive={status === "started" && index === sections.length - 1}
              />
            ))}
          </Space>
        </ScrollToBottom>
      </Card>

      <ConnStatus status={connStatus} onReconnect={reconnect} />
    </Space>
  )
}