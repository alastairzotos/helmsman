import { FetchStatus } from "@bitmetro/create-query";
import { Button, Input, Space } from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import React, { useState } from "react";

interface Props {
  createStatus: FetchStatus | undefined;
  onCreate: (name: string) => Promise<void>;
}

export const ApiKeysCreate: React.FC<Props> = ({ createStatus, onCreate }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');

  const isDisabled = createStatus === 'fetching';

  const handleCreateClick = async () => {
    await onCreate(name);

    setName("");
    setIsCreating(false);
  }

  const handleCancelClick = () => {
    setName("");
    setIsCreating(false);
  }

  return (
    <>
      {!isCreating && (
        <Button type="dashed" onClick={() => setIsCreating(true)} block icon={<PlusOutlined />}>
          Create API Key
        </Button>
      )}

      {isCreating && (
        <Space>
          <Input
            disabled={isDisabled}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button type="primary" disabled={isDisabled} onClick={handleCreateClick} block icon={<PlusOutlined />}>
            Create
          </Button>

          <Button type="dashed" disabled={isDisabled} onClick={handleCancelClick} block icon={<CloseOutlined />}>
            Cancel
          </Button>
        </Space>
      )}
    </>
  )
}