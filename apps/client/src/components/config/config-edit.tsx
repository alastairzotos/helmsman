import { Form, Input } from "antd";
import { ConfigSchema, IConfig } from "models";
import React from "react";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResourceForm } from "@/components/_core/resource-form";
import { useUpdateConfig } from "@/state/config.state";

interface Props {
  config: IConfig;
}

export const ConfigEdit: React.FC<Props> = ({ config }) => {
  const [updateConfigStatus, updateConfig] = useUpdateConfig(s => [s.status, s.request]);

  return (
    <ResourceForm
      title="Manage Config"
      resolver={zodResolver(ConfigSchema)}
      resource={config}
      saveStatus={updateConfigStatus}
      onSave={updateConfig}
    >
      {({ errors, control }) => (
        <>
          <Form.Item
            label="Github Username"
            validateStatus={errors.githubUsername && "error"}
            help={errors.githubUsername && errors.githubUsername.message}
          >
            <Controller
              name="githubUsername"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Github Token"
            validateStatus={errors.githubToken && "error"}
            help={errors.githubToken && errors.githubToken.message}
          >
            <Controller
              name="githubToken"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </>
      )}
    </ResourceForm>
  );
}
