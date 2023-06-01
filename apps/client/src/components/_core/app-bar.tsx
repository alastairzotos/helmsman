import { HEADER_HEIGHT } from "@/components/_core/sizes";
import { useAuthState } from "@/plugins/user/state/auth";
import { Col, Layout, Row, Typography } from "antd";
import Image from "next/image";
import React from "react";

const { Header } = Layout;
const { Title, Text } = Typography;

const headerStyle: React.CSSProperties = {
  height: HEADER_HEIGHT,
  paddingInline: 50,
  lineHeight: '64px',
  zIndex: 10000,
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)'
};

export const AppBar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const loggedInUser = useAuthState(s => s.loggedInUser);

  return (
    <Header style={headerStyle}>
      <Row>
        <Col span={20} style={{ display: 'flex' }}>
          <Image
            src="/bm-logo-black.svg"
            width={50}
            height={50}
            alt="BitMetro Logo"
            style={{ paddingTop: 10 }}
          />
          <Title level={5} style={{ marginTop: 20, fontSize: '1.4em' }}>
            Mission Control
          </Title>
        </Col>
        <Col span={4}>
          {loggedInUser && <Text>Logged in as {loggedInUser.email}</Text>}
        </Col>
      </Row>
    </Header>
  )
}
