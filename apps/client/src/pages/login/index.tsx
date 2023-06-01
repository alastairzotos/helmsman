import { LoginForm } from "@/components/auth/login";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
  return <LoginForm />;
}

LoginPage.getInitialProps = () => ({});

export default LoginPage;
