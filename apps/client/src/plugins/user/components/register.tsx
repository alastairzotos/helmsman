import { ResourceForm } from '@/components/_core/resource-form';
import { Form, Input } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { useRouter } from 'next/router';
import { useRegisterUser } from '@/plugins/user/state/user';
import { urls } from '@/urls';

const RegisterSchema =
  z.object({
    email: z.string(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8),
  })
  .refine(({ password, repeatPassword }) => password === repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"]
  });

type IRegisterProps = z.infer<typeof RegisterSchema>;

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [registerStatus, registerUser] = useRegisterUser(s => [s.status, s.request]);

  const handleRegisterClick = async ({ email, password }: IRegisterProps) => {
    await registerUser(email, password);
    router.push(urls.login());
  }

  return (
    <ResourceForm
      title='Register'

      resource={{
        email: '',
        password: '',
        repeatPassword: '',
      } as IRegisterProps}

      resolver={zodResolver(RegisterSchema)}

      saveStatus={registerStatus}
      onSave={handleRegisterClick}
      savePrompt="Register"
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

          <Form.Item
            label="Repeat password"
            validateStatus={errors.repeatPassword && "error"}
            help={errors.repeatPassword && errors.repeatPassword.message}
          >
            <Controller
              name="repeatPassword"
              control={control}
              render={({ field }) => <Input type="password" {...field} />}
            />
          </Form.Item>
        </>
      )}
    </ResourceForm>
  )
}
