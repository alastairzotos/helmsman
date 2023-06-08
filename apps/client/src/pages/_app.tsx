import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Wrapper } from "@/components/_core/layout/wrapper"
import { useRouter } from "next/router";
import { AuthProvider, useCheckAuthState } from "@bitmetro/auth-react";
import { urls } from "@/urls";

const Inner = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useCheckAuthState(({ accessToken }) => {
    if (!accessToken && !router.pathname.startsWith('/login')) {
      router.push(urls.login(router.asPath.split('?')[0]));
    }
  }, [router.pathname])

  return <Component {...pageProps} />;
}

const AppPage = (props: AppProps) => {
  return (
    <AuthProvider localStorageKey="@mission-control:access-token">
      <Wrapper>
        <Inner {...props} />
      </Wrapper>
    </AuthProvider>
  )
}

export default AppPage;
