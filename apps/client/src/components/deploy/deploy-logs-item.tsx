import { DeployLogsProgress } from "@/components/deploy/deploy-logs-progress";
import { DeployLogsText } from "@/components/deploy/deploy-logs-text";
import { IDeployMessageDto } from "models";
import React from "react";

interface Props {
  log: IDeployMessageDto;
}

export const DeployLogsItem: React.FC<Props> = ({ log }) => {
  switch (log.type) {
    case "text":
      return <DeployLogsText text={log.textMessage!} />;

    case "progress":
      return <DeployLogsProgress progressMessage={log.progressMessage!} />;
  }

  return null;
}
