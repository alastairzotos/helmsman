import React from 'react';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import { HEADER_HEIGHT, NAVIGATION_WIDTH } from '@/components/_core/sizes';
import { urls } from '@/urls';
import { useRouter } from 'next/router';

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
  getItem("Projects", "projects", <AppstoreOutlined />),
]

const urlMappings: Record<string, string> = {
  projects: urls.projects.home(),
}

export const Navigation: React.FC = () => {
  const router = useRouter();

  const onClick: MenuProps['onClick'] = (e) =>
    router.push(urlMappings[e.key]);

  return (
    <Menu
      onClick={onClick}
      style={{ width: NAVIGATION_WIDTH, height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};
