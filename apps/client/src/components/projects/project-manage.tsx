import { Form, Input } from "antd";
import { IProjectDto, ProjectSchema } from "models";
import React from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResourceForm } from "@/components/_core/resource-form";
import { FetchStatus } from "@bitmetro/create-query";

interface Props {
  title: string;
  project: IProjectDto;
  saveStatus: FetchStatus | undefined;
  onSave: SubmitHandler<IProjectDto>;
}

export const ProjectManage: React.FC<Props> = ({ title, project, saveStatus, onSave }) => {
  return (
    <ResourceForm
      title={title}
      resolver={zodResolver(ProjectSchema.omit({ secrets: true }))}
      resource={project}
      saveStatus={saveStatus}
      onSave={onSave}
    >
      {({ errors, control }) => (
        <>
          <Form.Item
            label="Name"
            validateStatus={errors.name && "error"}
            help={errors.name && errors.name.message}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Namespace"
            validateStatus={errors.namespace && "error"}
            help={errors.namespace && errors.namespace.message}
          >
            <Controller
              name="namespace"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Helm repo URL"
            validateStatus={errors.helmRepoUrl && "error"}
            help={errors.helmRepoUrl && errors.helmRepoUrl.message}
          >
            <Controller
              name="helmRepoUrl"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Helm Release"
            validateStatus={errors.helmRelease && "error"}
            help={errors.helmRelease && errors.helmRelease.message}
          >
            <Controller
              name="helmRelease"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Helm Project Path"
            validateStatus={errors.path && "error"}
            help={errors.path && errors.path.message}
          >
            <Controller
              name="path"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Helm Values Path"
            validateStatus={errors.valuesPath && "error"}
            help={errors.valuesPath && errors.valuesPath.message}
          >
            <Controller
              name="valuesPath"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Repo URL"
            validateStatus={errors.repoUrl && "error"}
            help={errors.repoUrl && errors.repoUrl.message}
          >
            <Controller
              name="repoUrl"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </>
      )}
    </ResourceForm>
  )
}
