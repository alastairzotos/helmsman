import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Wrapper } from "@/components/_core/wrapper"

const AppPage = ({ Component, pageProps }: AppProps) => {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  )
}

export default AppPage;
