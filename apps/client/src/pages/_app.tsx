import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AuthProvider, useCheckAuthState, useLoggedInUser, useLogout } from "@bitmetro/auth-react";
import { urls } from "@/urls";
import { getEnv } from "@/utils/env";
import { AppLayoutProvider, createNavMenuItem } from "@bitmetro/app-layout-antd";
import { Button, ConfigProvider, Space, Typography, theme } from "antd";
import { AppstoreOutlined, SettingOutlined, ApiOutlined } from '@ant-design/icons';
import { getProjectById } from "@/clients/projects.client";

const { Text } = Typography;
const { darkAlgorithm } = theme;

const Inner = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useCheckAuthState(({ accessToken }) => {
    if (!accessToken && !router.pathname.startsWith('/login')) {
      router.push(urls.login(router.asPath.split('?')[0]));
    }
  }, [router.pathname])

  const handleLogout = useLogout();
  const loggedInUser = useLoggedInUser();

  return (
    <AppLayoutProvider
      title="Mission Control"
      logo="/bm-logo-new-white.png"
      logoAlt="BitMetro logo"
      homeUrl={urls.home()}
      navItems={[
        createNavMenuItem("Config", urls.config.home(), <SettingOutlined />),
        createNavMenuItem("Projects", urls.projects.home(), <AppstoreOutlined />),
        createNavMenuItem("API Keys", urls.apiKeys.home(), <ApiOutlined />),
      ]}
      breadcrumbResolvers={{
        "[projectId]": async (id) => (await getProjectById(id)).name,
      }}
      appBar={(
        loggedInUser && (
          <Space>
            <Text>Logged in as {loggedInUser.email}</Text>
            <Button onClick={handleLogout}>Logout</Button>
          </Space>
        )
      )}
      appBarStyles={{ backgroundColor: colorBgContainer }}
    >
      <Component {...pageProps} />
    </AppLayoutProvider>
  )
}

const AppPage = (props: AppProps) => {
  return (
    <AuthProvider
      localStorageKey="@mission-control:access-token"
      propertyId="bitmetro.mission-control"
      idServiceUrl={getEnv().idServerUrl}
    >
      <ConfigProvider theme={{
        algorithm: darkAlgorithm,
        token: {
          colorPrimary: "#149c26",
          colorBgBase: "#000507",
          borderRadius: 1000,
        }
      }}>
        <Inner {...props} />
      </ConfigProvider>
    </AuthProvider>
  )
}

export default AppPage;
