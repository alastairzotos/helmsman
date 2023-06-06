import { StatusSwitch } from "@/components/_core/layout/status-switch";
import { useGetAllProjects } from "@/state/projects.state";
import { urls } from "@/urls";
import { Button, List, Space } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Link from "next/link";
import React, { useEffect } from "react";

export const ProjectsList: React.FC = () => {
  const [loadStatus, loadProjects, projects] = useGetAllProjects(s => [s.status, s.request, s.value]);

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <StatusSwitch status={loadStatus}>
      <Space direction="vertical" style={{ width: 400 }}>
        {projects && (
          <List
            dataSource={projects}
            renderItem={project => (
              <Link href={urls.projects.project(project._id)}>
                <List.Item>
                  {project.name}
                </List.Item>
              </Link>
            )}
          />
        )}

        <Link href={urls.projects.create()}>
          <Button type="dashed" block icon={<PlusOutlined />}>
            Create
          </Button>
        </Link>
      </Space>
    </StatusSwitch>
  )
}
