import { DeployLogsItem } from "@/components/deploy/deploy-logs-item";
import { Collapse, Space } from "antd";
import { IDeployMessageDto, IDeployMessagePhase, deployPhaseTitles } from "models";
import React from "react";

const { Panel } = Collapse;

export interface IDeployLogsSection {
  phase: IDeployMessagePhase;
  logs: IDeployMessageDto[];
}

interface Props {
  section: IDeployLogsSection;
}

export const DeployLogsSection: React.FC<Props> = ({ section }) => {
  return (
    <Collapse activeKey="1">
      <Panel header={deployPhaseTitles[section.phase]} key="1">
        <Space direction="vertical">
          {section.logs.map((log, index) => (
            <DeployLogsItem key={index} log={log} />
          ))}
        </Space>
      </Panel>
    </Collapse>
  )
}
