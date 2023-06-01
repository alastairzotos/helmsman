import { ProjectsList } from "@/components/projects/projects-list";
import { NextPage } from "next";

const ProjectsPage: NextPage = () => {
  return <ProjectsList />;
}

ProjectsPage.getInitialProps = () => ({});

export default ProjectsPage;
