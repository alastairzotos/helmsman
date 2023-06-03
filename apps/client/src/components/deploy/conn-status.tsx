import { IConnStatus } from "@/hooks/ws";
import { Button, Space, Typography, theme } from "antd";
import React from "react";
import styled from 'styled-components';

const { Text } = Typography;

interface Props {
  status: IConnStatus;
  onReconnect: () => void;
}

const Dot = styled.div<{ colour: string }>(({ colour }) => (`
  height: 12px;
  width: 12px;
  background-color: ${colour};
  border-radius: 50%;
  display: inline-block;
`))

export const ConnStatus: React.FC<Props> = ({ status, onReconnect }) => {
  const {
    token: {
      colorSuccess,
      colorError,
      colorInfo,
    },
  } = theme.useToken();
  
  switch (status) {
    case null:
      return null;

    case 'connecting':
      return (
        <Space>
          <Dot colour={colorInfo} />
          <Text>Connecting...</Text>
        </Space>
      )

    case 'connected':
      return (
        <Space>
          <Dot colour={colorSuccess} />
          <Text>Connected</Text>
        </Space>
      )

    case 'disconnected':
      return (
        <Space>
          <Dot colour={colorInfo} />
          <Text>Disconnected</Text>
          <Button onClick={onReconnect}>Reconnect</Button>
        </Space>
      )

    case 'error':
      return (
        <Space>
          <Dot colour={colorError} />
          <Text>Error</Text>
        </Space>
      )
  }
}
