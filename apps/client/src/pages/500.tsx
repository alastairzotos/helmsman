import { Typography } from "antd"
import { NextPage } from "next";

const { Title } = Typography;

const Page500: NextPage = () => {
  return <Title>Internal Server Error</Title>
}

export default Page500;