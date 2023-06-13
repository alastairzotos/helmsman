import { PasswordReveal } from "@/components/_core/password-reveal";
import { StatusSwitch } from "@/components/_core/status-switch";
import { ConfigEdit } from "@/components/config/config-edit";
import { useGetConfig } from "@/state/config.state";
import React from "react";

export const ConfigManage: React.FC = () => {
  const getConfigState = useGetConfig();
  const {
    status: getConfigStatus,
    request: getConfig,
    value: config,
  } = getConfigState;

  if (!config) {
    return (
      <PasswordReveal
        resourceName="config"
        state={getConfigState}
        handleRequest={(password) => getConfig(password)}
      />
    )
  }

  return (
    <StatusSwitch status={getConfigStatus}>
      {config && <ConfigEdit config={config} />}
    </StatusSwitch>
  )
}
