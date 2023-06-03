import { Typography } from "antd"
import { NextPage } from "next";

const { Title } = Typography;

const Page500: NextPage = () => {
  return <Title>Internal Server Error</Title>
}

Page500.getInitialProps = () => ({});

export default Page500;