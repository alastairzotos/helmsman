import { IConnStatus } from "@/hooks/ws";
import { Space, Typography } from "antd";
import React from "react";
import styled from 'styled-components';

const { Text } = Typography;

interface Props {
  status: IConnStatus;
}

const Dot = styled.div<{ colour: string }>(({ colour }) => (`
  height: 12px;
  width: 12px;
  background-color: ${colour};
  border-radius: 50%;
  display: inline-block;
`))

export const ConnStatus: React.FC<Props> = ({ status }) => {
  switch (status) {
    case null:
      return null;

    case 'connected':
      return (
        <Space>
          <Dot colour="#00ff00" />
          <Text>Connected</Text>
        </Space>
      )

    case 'disconnected':
      return (
        <Space>
          <Dot colour="#bbb" />
          <Text>Disconnected</Text>
        </Space>
      )

    case 'error':
      return (
        <Space>
          <Dot colour="#0000ff" />
          <Text>Error</Text>
        </Space>
      )
  }
}
