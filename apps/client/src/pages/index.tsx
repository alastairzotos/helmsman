import { getEnv } from "@/utils/env";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  return <p>{getEnv().apiUrl}</p>;
}

HomePage.getInitialProps = () => ({});

export default HomePage;
