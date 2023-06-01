import { LoginForm } from "@/plugins/user/components/login";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
  return <LoginForm />;
}

LoginPage.getInitialProps = () => ({});

export default LoginPage;
