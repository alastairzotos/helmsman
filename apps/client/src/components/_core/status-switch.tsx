import { FetchStatus } from "@bitmetro/create-query";
import { Alert, Spin } from "antd";
import React from "react";

interface Props {
  status: FetchStatus | undefined;
  loading?: React.ReactNode;
  error?: React.ReactNode;
}

export const StatusSwitch: React.FC<React.PropsWithChildren<Props>> = ({
  status,
  loading = <Spin />,
  error = <Alert type="warning" message="There was an unexpected error" />,
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
