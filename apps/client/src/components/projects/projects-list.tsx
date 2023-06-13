import { StatusSwitch } from "@/components/_core/status-switch";
import { useGetAllProjects } from "@/state/projects.state";
import { urls } from "@/urls";
import { Button, Col, Menu, Row, Space } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IProjectDto, WithId } from "models";
import { createNavMenuItem } from "@bitmetro/app-layout-antd";
import { useRouter } from "next/router";

type NamespacesWithProjects = Record<string, WithId<IProjectDto>[]>;

export const ProjectsList: React.FC = () => {
  const router = useRouter();

  const [loadStatus, loadProjects, projects] = useGetAllProjects(s => [s.status, s.request, s.value]);
  const [selectedNs, setSelectedNs] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const namespacesWithProjects: NamespacesWithProjects = (projects || []).reduce(
    (acc, cur) => ({
      ...acc,
      [(cur.namespace.trim() === '') ? "none" : cur.namespace]: [
        ...(acc[cur.namespace] || []),
        cur
      ]
    }),
    {} as NamespacesWithProjects,
  )

  return (
    <StatusSwitch status={loadStatus}>
      <Space direction="vertical" style={{ width: 400 }}>
        <Row>
          <Col span={12}>
            <Menu
              items={
                Object.keys(namespacesWithProjects).map((ns) => (
                  createNavMenuItem(ns, ns)
                ))
              }
              onSelect={(e) => setSelectedNs(e.key)}
            />
          </Col>

          {!!selectedNs && (
            <Col span={12}>
              <Menu
                items={namespacesWithProjects[selectedNs].map((proj) => (
                  createNavMenuItem(proj.name, proj._id)
                ))}
                onSelect={(e) => router.push(urls.projects.project(e.key))}
              />
            </Col>
          )}
        </Row>

        <Link href={urls.projects.create()}>
          <Button type="dashed" block icon={<PlusOutlined />}>
            Create
          </Button>
        </Link>
      </Space>
    </StatusSwitch>
  )
}
