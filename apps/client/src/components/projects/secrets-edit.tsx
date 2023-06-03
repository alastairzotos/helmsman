import { FormBase } from "@/components/_core/form-base";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FetchStatus } from "@bitmetro/create-query";
import { Button, Form, Input, Space } from "antd";
import { ISecretsDto, IUpdateSecretsDto } from "models";
import React from "react";
import { SubmitHandler } from "react-hook-form";

interface Props {
  secrets: ISecretsDto;
  saveStatus: FetchStatus | undefined;
  onSave: SubmitHandler<IUpdateSecretsDto>;
}

interface ISecret {
  key: string;
  value: string;
}

export const SecretsEdit: React.FC<Props> = ({ secrets, saveStatus, onSave }) => {
  return (
    <FormBase
      title="Edit secrets"
      onSave={(data: { secrets: ISecret[] }) => {
        const secrets = data.secrets
          .reduce((acc, cur) => ({
            ...acc,
            [cur.key]: cur.value
          }), {} as Record<string, string>);

        onSave({ secrets })
      }}
      saveStatus={saveStatus}
      fixColumns={false}
    >
      <Form.List
        name="secrets"
        initialValue={
          Object.entries(secrets || { })
            .map(entry => ({ key: entry[0], value: entry[1] }))
        }
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'key']}
                  rules={[{ required: true, message: 'Missing key' }]}
                  style={{ width: 220 }}
                >
                  <Input placeholder="Key" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'value']}
                  rules={[{ required: true, message: 'Missing value' }]}
                  style={{ width: 350 }}
                >
                  <Input placeholder="Value" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add({ key: 'Key', value: 'Value' })} block icon={<PlusOutlined />}>
                Add secret
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </FormBase>
  )
}
