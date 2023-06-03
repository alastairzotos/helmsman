import { PasswordReveal } from "@/components/_core/password-reveal";
import { StatusSwitch } from "@/components/_core/status-switch";
import { SecretsEdit } from "@/components/projects/secrets-edit";
import { useGetSecrets, useUpdateSecrets } from "@/state/projects.state";
import { IProject, IUpdateSecretsDto, WithId } from "models";
import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

interface Props {
  project: WithId<IProject>;
}

export const SecretsManage: React.FC<Props> = ({ project }) => {
  const [updateSecretsStatus, updateSecrets] = useUpdateSecrets(s => [s.status, s.request]);
  const getSecretsState = useGetSecrets();
  const {
    status: getSecretsStatus,
    request: getSecrets,
    value: secrets,
    clear: clearSecretsState,
  } = getSecretsState;

  useEffect(() => {
    clearSecretsState();
  }, [project._id]);

  const handleUpdateSecrets: SubmitHandler<IUpdateSecretsDto> = (data) => {
    updateSecrets(project._id, { secrets: data.secrets });
  }

  if (!secrets) {
    return (
      <PasswordReveal
        key={project._id}
        resourceName="secrets"
        state={getSecretsState}
        handleRequest={(password) => getSecrets(project._id, password)}
      />
    )
  }

  return (
    <StatusSwitch status={getSecretsStatus}>
      <SecretsEdit
        secrets={secrets}
        saveStatus={updateSecretsStatus}
        onSave={handleUpdateSecrets}
      />
    </StatusSwitch>
  )
}
