import { RegisterForm } from "@/components/auth/register";
import { NextPage } from "next";

const RegisterPage: NextPage = () => {
  return <RegisterForm />;
}

RegisterPage.getInitialProps = () => ({});

export default RegisterPage;
