import { useAuthUrls } from "@bitmetro/auth-react";
import { Button } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { loginUrl } = useAuthUrls(router.query.fwd as string);

  const handleLoginClick = async () => {
    router.push(loginUrl);
  }

  return (
    <Button onClick={handleLoginClick}>
      Login
    </Button>
  )
}

LoginPage.getInitialProps = () => ({});

export default LoginPage;
