import { Input } from "antd";
import { ConfigSchema, IConfig } from "models";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResourceForm } from "@/components/_core/form/resource-form";
import { useUpdateConfig } from "@/state/config.state";
import { FormItem } from "@/components/_core/form/form-item";

interface Props {
  config: IConfig;
}

export const ConfigEdit: React.FC<Props> = ({ config }) => {
  const [updateConfigStatus, updateConfig] = useUpdateConfig(s => [s.status, s.request]);

  return (
    <ResourceForm
      resolver={zodResolver(ConfigSchema)}
      resource={config}
      saveStatus={updateConfigStatus}
      onSave={updateConfig}
    >
      {({ errors, control }) => (
        <>
          <FormItem
            label="Github Username"
            field="githubUsername"
            control={control}
            errors={errors}
            render={(field) => <Input {...field} />}
          />

          <FormItem
            label="Github Token"
            field="githubToken"
            control={control}
            errors={errors}
            render={(field) => <Input {...field} />}
          />
        </>
      )}
    </ResourceForm>
  );
}
