import { Button } from 'antd';
import React from 'react';
import { useRouter } from 'next/router';
import { getEnv } from '@/utils/env';

export const LoginForm: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = async () => {
    router.push(`${getEnv().idServerUrl}/login?propertyId=bitmetro.mission-control&fwd=${encodeURIComponent(router.query.fwd as string)}`);
  }

  return (
    <Button onClick={handleLoginClick}>
      Login
    </Button>
  )
}
