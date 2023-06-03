import { ApiKeysManage } from "@/components/api-keys/api-keys-manage";
import { NextPage } from "next";

const ApiKeysPage: NextPage = () => {
  return <ApiKeysManage />;
}

ApiKeysPage.getInitialProps = () => ({});

export default ApiKeysPage;
