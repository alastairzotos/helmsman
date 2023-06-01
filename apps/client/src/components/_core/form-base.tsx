import { FetchStatus } from "@bitmetro/create-query";
import { Form, Typography } from "antd";
import React from "react";
import { FieldValues } from "react-hook-form";

const { Title } = Typography;

export interface FormBaseProps<T extends FieldValues> {
  title: string;
  onSave: (values: any) => void;
  saveStatus: FetchStatus | undefined;
  fixColumns?: boolean;
}

const fixedColumns = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  }
}

export function FormBase<T extends FieldValues>({
  title,
  saveStatus,
  onSave,
  fixColumns = true,
  children,
}: React.PropsWithChildren<FormBaseProps<T>>) {
  return (
    <>
      <Title level={4}>{title}</Title>

      <Form
        disabled={saveStatus === 'fetching'}
        onFinish={onSave}
        {...(fixColumns ? fixedColumns : {})}
        style={{ width: 600 }}
      >
        {children}
      </Form>
    </>
  )
}