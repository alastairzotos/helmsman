import React from 'react';
import { AppstoreOutlined, SettingOutlined, ApiOutlined } from '@ant-design/icons';
import { Divider, MenuProps, theme, Layout } from 'antd';
import { Menu } from 'antd';
import { HEADER_HEIGHT, NAVIGATION_WIDTH } from '@/components/_core/layout/sizes';
import { urls } from '@/urls';
import { useRouter } from 'next/router';
import { Logo } from '@/components/_core/layout/logo';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem("Config", urls.config.home(), <SettingOutlined />),
  getItem("Projects", urls.projects.home(), <AppstoreOutlined />),
  getItem("API Keys", urls.apiKeys.home(), <ApiOutlined />),
]

export const Navigation: React.FC = () => {
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  const router = useRouter();

  const onClick: MenuProps['onClick'] = (e) =>
    router.push(e.key);

  return (
    <Sider
      width={NAVIGATION_WIDTH}
      style={{ backgroundColor: colorBgContainer, borderRight: `1px solid ${colorBorderSecondary}` }}
    >
      <Logo />

      <Divider style={{ margin: 0 }} />

      <Menu
        onClick={onClick}
        style={{ width: NAVIGATION_WIDTH, height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
        selectedKeys={['/' + router.pathname.split('/')[1]]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};
