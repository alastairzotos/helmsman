import { Button } from "antd";
import React from "react";
import { useForm, FieldValues, Resolver, DeepPartial, FieldErrors, Control, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { FormBase, FormBaseProps } from "@/components/_core/form/form-base";

interface ChildrenProps<T extends FieldValues> {
  errors: FieldErrors<T>;
  control: Control<T, any>;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
}

export interface ResourceFormProps<T extends FieldValues> extends FormBaseProps<T> {
  resource: DeepPartial<T>;
  resolver?: Resolver<T>;
  savePrompt?: string;
  children: (props: ChildrenProps<T>) => React.ReactNode;
}

export function ResourceForm<T extends FieldValues>(props: ResourceFormProps<T>) {
  const {
    resource,
    resolver,
    onSave,
    savePrompt = 'Save',
    children,
  } = props;

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<T>({ defaultValues: resource, resolver, mode: 'onChange' });

  return (
    <FormBase
      {...props}
      onSave={handleSubmit(onSave)}
    >
      {children({ errors, control, getValues, setValue })}

      <Button
        type="primary"
        htmlType="submit"
        disabled={!isValid}
      >
        {savePrompt}
      </Button>
    </FormBase>
  )
}
