import { AppBar } from "@/components/_core/app-bar";
import { Navigation } from "@/components/_core/navigation";
import { NAVIGATION_WIDTH } from "@/components/_core/sizes";
import { Layout } from "antd";
import React from "react";
import { ConfigProvider, theme, Card } from "antd";
import Head from "next/head";

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
            <Card>
              {children}
            </Card>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
