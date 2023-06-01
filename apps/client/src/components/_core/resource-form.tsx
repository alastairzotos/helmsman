import { Button, Form, Typography } from "antd";
import React from "react";
import { SubmitHandler, useForm, FieldValues, Resolver, DeepPartial, FieldError, FieldErrors, Control, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { FetchStatus } from "@bitmetro/create-query";
import { FormBase, FormBaseProps } from "@/components/_core/form-base";

const { Title } = Typography;

interface ChildrenProps<T extends FieldValues> {
  errors: FieldErrors<T>;
  control: Control<T, any>;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
}

export interface ResourceFormProps<T extends FieldValues> extends FormBaseProps<T> {
  resource: DeepPartial<T>;
  resolver?: Resolver<T>;
  children: (props: ChildrenProps<T>) => React.ReactNode;
}

export function ResourceForm<T extends FieldValues>(props: ResourceFormProps<T>) {
  const {
    resource,
    resolver,
    onSave,
    children,
  } = props;

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<T>({ defaultValues: resource, resolver });

  return (
    <FormBase
      {...props}
      onSave={handleSubmit(onSave)}
    >
      {children({ errors, control, getValues, setValue })}

      <Button type="primary" htmlType="submit">Save</Button>
    </FormBase>
  )
}
