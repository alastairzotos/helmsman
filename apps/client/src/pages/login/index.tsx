import { getEnv } from "@/utils/env";
import { Button } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";

const LoginPage: NextPage = () => {
  const router = useRouter();

  const handleLoginClick = async () => {
    router.push(`${getEnv().idServerUrl}/login?propertyId=bitmetro.mission-control&fwd=${encodeURIComponent(router.query.fwd as string)}`);
  }

  return (
    <Button onClick={handleLoginClick}>
      Login
    </Button>
  )
}

LoginPage.getInitialProps = () => ({});

export default LoginPage;
