import { PasswordReveal } from "@/components/_core/password-reveal";
import { StatusSwitch } from "@/components/_core/status-switch";
import { SecretsEdit } from "@/components/projects/secrets-edit";
import { useGetSecrets, useUpdateSecrets } from "@/state/projects.state";
import { IProject, IUpdateSecretsDto, WithId } from "models";
import React from "react";
import { SubmitHandler } from "react-hook-form";

interface Props {
  project: WithId<IProject>;
}

export const SecretsManage: React.FC<Props> = ({ project }) => {
  const [updateSecretsStatus, updateSecrets] = useUpdateSecrets(s => [s.status, s.request]);
  const getSecretsState = useGetSecrets();
  const {
    status: getSecretsStatus,
    value: secrets
  } = getSecretsState;

  const handleUpdateSecrets: SubmitHandler<IUpdateSecretsDto> = (data) => {
    updateSecrets(project._id, { secrets: data.secrets });
  }

  if (!secrets) {
    return (
      <PasswordReveal
        resourceName="secrets"
        state={getSecretsState}
        getArgs={(password) => [project._id!, password] as [string, string]}
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
