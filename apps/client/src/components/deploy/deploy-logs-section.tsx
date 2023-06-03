import { DeployLogsItem } from "@/components/deploy/deploy-logs-item";
import { Collapse, Space, theme } from "antd";
import { LoadingOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { IDeployMessageDto, IDeployMessagePhase, deployPhaseTitles } from "models";
import React, { useState } from "react";

const { Panel } = Collapse;

export interface IDeployLogsSection {
  phase: IDeployMessagePhase;
  logs: IDeployMessageDto[];
  error: boolean;
}

interface Props {
  section: IDeployLogsSection;
  isActive: boolean;
}

export const DeployLogsSection: React.FC<Props> = ({ section, isActive }) => {
  const {
    token: {
      colorSuccess,
      colorError,
      colorInfo,
    },
  } = theme.useToken();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapse
      activeKey={(isActive || isOpen) ? "1" : ""}
      onChange={(keys) => setIsOpen(keys.length > 0)}
    >
      <Panel
        header={deployPhaseTitles[section.phase]}
        extra={
          section.error ? <WarningOutlined style={{ fontSize: 20, color: colorError }} />
            : isActive
              ? <Spin indicator={<LoadingOutlined style={{ fontSize: 20, color: colorInfo }} spin />} />
              : <CheckOutlined style={{ fontSize: 20, color: colorSuccess }} />
        }
        key="1"
      >
        <Space direction="vertical" style={{ overflowX: 'scroll', whiteSpace: 'nowrap', width: '100%' }}>
          {section.logs.map((log, index) => (
            <DeployLogsItem key={index} log={log} />
          ))}
        </Space>
      </Panel>
    </Collapse>
  )
}
