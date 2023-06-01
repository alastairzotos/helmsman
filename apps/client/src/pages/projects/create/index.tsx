import { ProjectCreate } from "@/components/projects/project-create";
import { NextPage } from "next";

const ProjectCreatePage: NextPage = () => {
  return <ProjectCreate />;
}

ProjectCreatePage.getInitialProps = () => ({});

export default ProjectCreatePage;
