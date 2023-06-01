import { HEADER_HEIGHT } from "@/components/_core/sizes";
import { Col, Layout, Row, Typography } from "antd";
import Image from "next/image";
import React from "react";

const { Header } = Layout;
const { Title } = Typography;

const headerStyle: React.CSSProperties = {
  height: HEADER_HEIGHT,
  paddingInline: 50,
  lineHeight: '64px',
  zIndex: 10000,
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)'
};

export const AppBar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Header style={headerStyle}>
      <Row>
        <Col span={24} style={{ display: 'flex' }}>
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
      </Row>
    </Header>
  )
}
