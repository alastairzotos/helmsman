import { QueryState } from "@bitmetro/create-query";
import { Button, Input, Space, Typography } from "antd";
import React, { useState } from "react";

const { Text } = Typography;

interface Props<R extends Promise<any>, T extends any[]> {
  resourceName: string;
  state: QueryState<R, T>;
  handleRequest: (password: string) => Promise<void>;
}

export function PasswordReveal<R extends Promise<any>, T extends any[]>({
  resourceName,
  state: { status, error },
  handleRequest,
}: Props<R, T>) {
  const [password, setPassword] = useState('');

  const handleSubmitPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRequest(password);
  }

  return (
    <form onSubmit={handleSubmitPassword}>
      <Space style={{ width: 300 }} direction="vertical">
        <Text>Enter password to reveal {resourceName}</Text>

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="primary"
          htmlType="submit"
          disabled={status === 'fetching'}
        >
          Reveal {resourceName}
        </Button>

        {(error?.response?.status === 401 || error?.response?.status === 403) && (
          <Text type="warning">Wrong password</Text>
        )}
      </Space>
    </form>
  )
}