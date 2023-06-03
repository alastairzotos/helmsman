import { ProjectView } from "@/components/projects/project-view";
import { NextPage } from "next";
import { useRouter } from "next/router";

const ProjectViewPage: NextPage = () => {
  const router = useRouter();
  
  return <ProjectView id={router.query.projectId as string} />;
}

ProjectViewPage.getInitialProps = () => ({});

export default ProjectViewPage;
