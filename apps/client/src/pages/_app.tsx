import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Wrapper } from "@/components/_core/wrapper"
import { useEffect } from "react";
import { useAuthState } from "@/plugins/user/state/auth";

const AppPage = ({ Component, pageProps }: AppProps) => {
  const { init } = useAuthState();

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  )
}

export default AppPage;
