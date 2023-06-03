import { Typography } from "antd"
import { NextPage } from "next";

const { Title } = Typography;

const Page404: NextPage = () => {
  return <Title>Not found</Title>
}

Page404.getInitialProps = () => ({});

export default Page404;