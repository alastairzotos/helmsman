import { AppBar } from "@/components/_core/app-bar";
import { Navigation } from "@/components/_core/navigation";
import { Layout, Space } from "antd";
import React from "react";
import { ConfigProvider, theme, Card } from "antd";
import Head from "next/head";
import { AutoBreadcrumbs } from "@/components/_core/auto-breadcrumbs";

const { Content } = Layout;
const { darkAlgorithm } = theme;

export const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider theme={{
      algorithm: darkAlgorithm,
      token: {
        colorPrimary: "#a55eff"
      }
    }}>
      <Head>
        <title>BitMetro | Mission Control</title>
      </Head>
      <Layout>
        <Navigation />
        <Layout>
          <AppBar />

          <Content>
            <Space direction="vertical" style={{ width: '100%', padding: 12 }}>
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
