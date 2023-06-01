import { AppBar } from "@/components/_core/app-bar";
import { Navigation } from "@/components/_core/navigation";
import { NAVIGATION_WIDTH } from "@/components/_core/sizes";
import { Layout } from "antd";
import React from "react";
import { ConfigProvider, theme, Button, Card } from "antd";

const { Sider, Content } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;

const contentStyle: React.CSSProperties = {
  padding: 12,
}

export const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider theme={{
      algorithm: darkAlgorithm
    }}>
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
