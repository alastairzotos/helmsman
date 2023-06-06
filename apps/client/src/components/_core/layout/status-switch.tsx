import { FetchStatus } from "@bitmetro/create-query";
import { Spin, Typography } from "antd";
import React from "react";

const { Text } = Typography;

interface Props {
  status: FetchStatus | undefined;
  loading?: React.ReactNode;
  error?: React.ReactNode;
}

export const StatusSwitch: React.FC<React.PropsWithChildren<Props>> = ({
  status,
  loading = <Spin />,
  error = <Text type="warning">There was an unexpected error</Text>,
  children
}) => {
  return (
    <>
      {status === 'fetching' && loading}
      {status === 'error' && error}
      {status === 'success' && children}
    </>
  )
}
