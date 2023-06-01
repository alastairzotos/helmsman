import { HEADER_HEIGHT } from "@/components/_core/sizes";
import { useLoggedInUser, useLogout } from "@/plugins/user";
import { Button, Col, Layout, Row, Space, Typography } from "antd";
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

export const AppBar: React.FC = () => {
  const handleLogout = useLogout();
  const loggedInUser = useLoggedInUser();

  return (
    <Header style={headerStyle}>
      <Row>
        <Col span={18} style={{ display: 'flex' }}>
          <Image
            src="/bm-logo.png"
            width={50}
            height={50}
            alt="BitMetro Logo"
            style={{ paddingTop: 10 }}
          />
          <Title level={5} style={{ marginTop: 20, marginLeft: 10, fontSize: '1.4em' }}>
            Mission Control
          </Title>
        </Col>

        <Col span={6}>
          {loggedInUser && (
            <div style={{ display: 'flex' }}>
              <Space>
                <Text>Logged in as {loggedInUser.email}</Text>
                <Button onClick={handleLogout}>Logout</Button>
              </Space>
            </div>
          )}
        </Col>
      </Row>
    </Header>
  )
}
