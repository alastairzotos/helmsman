
import { getProjectById } from "@/clients/projects.client";
import { Breadcrumb, Spin } from "antd";
import { LoadingOutlined, CheckOutlined, WarningOutlined } from '@ant-design/icons';
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

interface BreadcrumbLink {
  href: string;
  title: string;
}

const LOADING_BREADCRUMB = "{LOADING}";
const extractKey = (key: string) => key.substring(1, key.length - 1);
const removeHyphens = (text = "") => text.split("-").join(" ");
const capitalise = (text = "") => text[0]?.toLocaleUpperCase() + text.substring(1);

const paramResolvers: Record<string, (id: string) => Promise<string>> = {
  "[projectId]": async (id) => (await getProjectById(id)).name,
};

const buildBreadcrumbsFromParts = async (
  parts: string[],
  params: Record<string, string>,
  resolveTitle: (part: string, id: string) => Promise<string>
): Promise<BreadcrumbLink[]> => {
  const links: BreadcrumbLink[] = [];

  const linkBuild = [];

  for (const part of parts) {
    let title: string | undefined;

    if (part in paramResolvers) {
      const key = extractKey(part);
      const id = params[key];
      linkBuild.push(id);
      title = await resolveTitle(part, id);
    } else {
      linkBuild.push(part);
    }

    links.push({
      title: title || capitalise(removeHyphens(part)),
      href: "/" + linkBuild.join("/"),
    });
  }


  return links;
};

const loadingIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

export const AutoBreadcrumbs: React.FC = () => {
  const router = useRouter();

  const path = router.pathname.substring(1);
  const parts = path.split("/");

  const [crumbs, setCrumbs] = useState<BreadcrumbLink[]>([]);

  useEffect(() => {
    const params = router.query as Record<string, string>;

    buildBreadcrumbsFromParts(
      parts,
      params,
      async () => LOADING_BREADCRUMB
    )
      .then(setCrumbs)
      .then(() =>
        buildBreadcrumbsFromParts(
          parts,
          params,
          async (part, id) => paramResolvers[part](id)
        )
      )
      .then(setCrumbs);
  }, [router.route]);

  if (!crumbs.length || router.pathname === "/") {
    return null;
  }

  return (
    <Breadcrumb
      items={
        crumbs.map((crumb, index) => ({
          title: index === crumbs.length - 1
            ? (
              crumb.title === LOADING_BREADCRUMB
                ? loadingIcon
                : crumb.title
            )
            : <Link href={crumb.href}>{crumb.title}</Link>
        }))
      }
    />
  );
};
