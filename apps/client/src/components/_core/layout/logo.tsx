import { HEADER_HEIGHT } from "@/components/_core/layout/sizes";
import { urls } from "@/urls";
import { Space, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const { Title } = Typography;

export const Logo: React.FC = () => {
  return (
    <Link href={urls.projects.home()}>
      <Space style={{ display: 'flex', justifyContent: 'center', height: HEADER_HEIGHT - 1 }}>
        <Image
          src="/bm-logo.png"
          width={50}
          height={50}
          alt="BitMetro Logo"
          style={{ paddingTop: 7 }}
        />
        <Title level={4} style={{ marginTop: 20, marginLeft: 4, fontSize: '1.4em' }}>
          Mission Control
        </Title>
      </Space>
    </Link>
  )
}
