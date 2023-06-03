import { ConfigManage } from "@/components/config/config-manage";
import { NextPage } from "next";

const ConfigPage: NextPage = () => {
  return <ConfigManage />;
}

ConfigPage.getInitialProps = () => ({});

export default ConfigPage;
