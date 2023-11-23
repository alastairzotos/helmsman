import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { urls } from "@/urls";
import { getEnv } from "@/utils/env";
import { AppLayoutProvider, createNavMenuItem } from "@bitmetro/app-layout-antd";
import { Button, ConfigProvider, Space, Typography, theme } from "antd";
import { AppstoreOutlined, SettingOutlined, ApiOutlined } from '@ant-design/icons';
import { PersonaProvider, extendPersonaTheme, usePersona } from "@bitmetro/persona-react";
import { useEffect } from "react";

const { Text } = Typography;
const { darkAlgorithm } = theme;

const Inner = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { initialised, loggedInUser, logout } = usePersona<{ email: string }>();

  useEffect(() => {
    if (initialised && !loggedInUser) {
      router.push(urls.login(router.asPath.split('?')[0] || ''));
    }
  }, [initialised, loggedInUser]);

  return (
    <AppLayoutProvider
      title="Helmsman"
      logo="/bm-logo-new-white.png"
      logoAlt="BitMetro logo"
      homeUrl={urls.home()}
      navItems={[
        createNavMenuItem("Config", urls.config.home(), <SettingOutlined />),
        createNavMenuItem("Projects", urls.projects.home(), <AppstoreOutlined />),
        createNavMenuItem("API Keys", urls.apiKeys.home(), <ApiOutlined />),
      ]}
      breadcrumbResolvers={{}}
      appBar={(
        loggedInUser && (
          <Space>
            <Text>Logged in as {loggedInUser.email}</Text>
            <Button onClick={logout}>Logout</Button>
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
  const router = useRouter();

  return (
    <PersonaProvider
      apiUrl={getEnv().apiUrl}
      onLogin={() => router.push(urls.home())}
      onRegister={() => router.push(urls.login(''))}
      theme={extendPersonaTheme({
        backgroundColor: 'transparent',
        showOutline: false,
        brandColor: '#000507',
      })}
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
    </PersonaProvider>
  )
}

export default AppPage;
