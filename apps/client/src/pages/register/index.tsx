import { RegisterForm } from "@bitmetro/persona-react";
import { NextPage } from "next";
import styled from "styled-components";

const Wrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  flexGrow: 1,
}))

const RegisterPage: NextPage = () => {
  return (
    <Wrapper>
      <RegisterForm />
    </Wrapper>
  )
}

RegisterPage.getInitialProps = () => ({});

export default RegisterPage;
