import { ResourceForm } from '@/components/_core/resource-form';
import { Form, Input } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useLoginUser } from '@/plugins/user/state/user';
import { useRouter } from 'next/router';
import { urls } from '@/urls';

const LoginSchema =
  z.object({
    email: z.string(),
    password: z.string().min(8),
  })

type ILoginProps = z.infer<typeof LoginSchema>;

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [loginStatus, loginUser] = useLoginUser(s => [s.status, s.request]);

  const handleLoginClick = async ({ email, password }: ILoginProps) => {
    await loginUser(email, password);
    router.push(urls.projects.home());
  }

  return (
    <ResourceForm
      title='Login'

      resource={{
        email: '',
        password: '',
      } as ILoginProps}

      resolver={zodResolver(LoginSchema)}

      saveStatus={loginStatus}
      onSave={handleLoginClick}
      savePrompt="Login"
    >
      {({ errors, control }) => (
        <>
          <Form.Item
            label="Email"
            validateStatus={errors.email && "error"}
            help={errors.email && errors.email.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={errors.password && "error"}
            help={errors.password && errors.password.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input type="password" {...field} />}
            />
          </Form.Item>
        </>
      )}
    </ResourceForm>
  )
}
