import { AppBar } from "@/components/_core/app-bar";
import { Navigation } from "@/components/_core/navigation";
import { NAVIGATION_WIDTH } from "@/components/_core/sizes";
import { Layout, Space } from "antd";
import React from "react";
import { ConfigProvider, theme, Card } from "antd";
import Head from "next/head";
import { AutoBreadcrumbs } from "@/components/_core/auto-breadcrumbs";

const { Sider, Content } = Layout;
const { darkAlgorithm } = theme;

const contentStyle: React.CSSProperties = {
  padding: 12,
}

export const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider theme={{
      algorithm: darkAlgorithm
    }}>
      <Head>
        <title>BitMetro | Mission Control</title>
      </Head>
      <Layout>
        <AppBar />
        <Layout hasSider>
          <Sider width={NAVIGATION_WIDTH}>
            <Navigation />
          </Sider>
          <Content style={contentStyle}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <AutoBreadcrumbs />

              <Card>
                {children}
              </Card>
            </Space>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
