import { DeployLogsItem } from "@/components/deploy/deploy-logs-item";
import { Collapse, Space } from "antd";
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

const activeIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

export const DeployLogsSection: React.FC<Props> = ({ section, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapse
      activeKey={(isActive || isOpen) ? "1" : ""}
      onChange={(keys) => setIsOpen(keys.length > 0)}
    >
      <Panel
        header={deployPhaseTitles[section.phase]}
        extra={
          section.error ? <WarningOutlined style={{ fontSize: 20 }} />
            : isActive
              ? <Spin indicator={activeIcon} />
              : <CheckOutlined style={{ fontSize: 20 }} />
        }
        key="1"
      >
        <Space direction="vertical">
          {section.logs.map((log, index) => (
            <DeployLogsItem key={index} log={log} />
          ))}
        </Space>
      </Panel>
    </Collapse>
  )
}
