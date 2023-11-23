import { StatusSwitch } from "@/components/_core/status-switch";
import { useProjectState } from "@/state/projects.state";
import { urls } from "@/urls";
import { Button, Col, Menu, Row } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IProjectDto, WithId } from "models";
import { createNavMenuItem } from "@bitmetro/app-layout-antd";
import { ProjectView } from "@/components/projects/project-view";
import styled from "styled-components";

const CreateWrapper = styled('div')(() => ({
  padding: 12,
}))

type NamespacesWithProjects = Record<string, WithId<IProjectDto>[]>;

export const ProjectsList: React.FC = () => {
  const {
    selectProjectId,
    selectedProjectId,
    selectNs,
    selectedNs,
    loadProjects,
    loadProjectsStatus,
    projects
  } = useProjectState();

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

  useEffect(() => {
    loadProjects();
  }, []);

  const setSelectedNs = (id: string) => {
    selectProjectId(null);
    selectNs(id);
  }

  const selectedProject = selectedNs ? namespacesWithProjects[selectedNs]?.find(proj => proj._id === selectedProjectId) || null : null;

  return (
    <StatusSwitch status={loadProjectsStatus}>
      <Row gutter={12}>
        <Col span={4}>
          <Menu
            selectedKeys={selectedNs ? [selectedNs] : undefined}
            items={
              Object.keys(namespacesWithProjects).sort((a, b) => a.localeCompare(b)).map((ns) => (
                createNavMenuItem(ns, ns)
              ))
            }
            onSelect={(e) => setSelectedNs(e.key)}
          />

          <CreateWrapper>
            <Link href={urls.projects.create()}>
              <Button type="dashed" block icon={<PlusOutlined />}>
                Create
              </Button>
            </Link>
          </CreateWrapper>
        </Col>

        {!!selectedNs && (
          <Col span={4}>
            <Menu
              items={namespacesWithProjects[selectedNs]?.map((proj) => (
                createNavMenuItem(proj.name, proj._id)
              ))}
              onSelect={e => selectProjectId(e.key)}
            />
          </Col>
        )}

        {selectedProject && (
          <Col span={16}>
            <ProjectView key={selectedProject._id} project={selectedProject} />
          </Col>
        )}
      </Row>
    </StatusSwitch>
  )
}
