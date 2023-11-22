import { LoginForm } from "@bitmetro/persona-react";
import { NextPage } from "next";
import styled from "styled-components";

const Wrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}))

const Container = styled('div')(() => ({
  minWidth: '35%'
}))

const LoginPage: NextPage = () => {
  return (
    <Wrapper>
      <Container>
        <LoginForm />
      </Container>
    </Wrapper>
  )
}

LoginPage.getInitialProps = () => ({});

export default LoginPage;
