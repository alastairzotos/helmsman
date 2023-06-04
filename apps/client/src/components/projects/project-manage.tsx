import { Input } from "antd";
import { IProjectDto, ProjectSchema } from "models";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResourceForm } from "@/components/_core/resource-form";
import { FetchStatus } from "@bitmetro/create-query";
import { FormItem } from "@/components/_core/form-item";

interface Props {
  project: IProjectDto;
  saveStatus: FetchStatus | undefined;
  onSave: SubmitHandler<IProjectDto>;
}

export const ProjectManage: React.FC<Props> = ({ project, saveStatus, onSave }) => {
  return (
    <ResourceForm
      resolver={zodResolver(ProjectSchema.omit({ secrets: true }))}
      resource={project}
      saveStatus={saveStatus}
      onSave={onSave}
    >
      {({ errors, control }) => (
        <>
          <FormItem
            label="Name"
            field="name"
            control={control}
            errors={errors}
            render={(field) => <Input {...field} />}
          />

          <FormItem
            label="Namespace"
            field="namespace"
            control={control}
            errors={errors}
            render={(field) => <Input {...field} />}
          />

          <FormItem
            label="Help repo URL"
            field="helmRepoUrl"
            control={control}
            errors={errors}
            render={(field) => <Input {...field} />}
          />

          <FormItem
            label="Help release"
            field="helmRelease"
            control={control}
            errors={errors}
            render={(field) => <Input {...field} />}
          />

          <FormItem
            label="Helm project path"
            field="path"
            control={control}
            errors={errors}
            render={(field) => <Input {...field} addonBefore="<REPO_PATH>" />}
          />

          <FormItem
            label="Helm values path"
            field="valuesPath"
            control={control}
            errors={errors}
            render={(field) => <Input {...field} addonBefore="<REPO_PATH>" />}
          />

          <FormItem
            label="Repo URL"
            field="repoUrl"
            control={control}
            errors={errors}
            render={(field) => <Input {...field} />}
          />
        </>
      )}
    </ResourceForm>
  )
}
