import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Wrapper } from "@/components/_core/wrapper"
import { AuthProvider, useCheckAuthState } from "@/plugins/user";
import { getEnv } from "@/utils/env";
import { useRouter } from "next/router";
import { urls } from "@/urls";

const Inner = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useCheckAuthState(({ accessToken }) => {
    if (!accessToken) {
      router.push(urls.login());
    }
  }, [router.pathname])

  return <Component {...pageProps} />;
}

const AppPage = (props: AppProps) => {
  return (
    <AuthProvider
      localStorageKey="@mission-control:access-token"
      apiUrl={getEnv().apiUrl + '/api/v1'}
    >
      <Wrapper>
        <Inner {...props} />
      </Wrapper>
    </AuthProvider>
  )
}

export default AppPage;
