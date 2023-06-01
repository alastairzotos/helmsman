import { useAuthContext } from "@/plugins/user/contexts/auth.context";
import { useAuthState } from "@/plugins/user/state/auth";
import { useLoginUser, useRegisterUser } from "@/plugins/user/state/user";
import { FetchStatus } from "@bitmetro/create-query";

type LoginFn = (email: string, password: string) => Promise<void>;
type RegisterFn = (email: string, password: string) => Promise<void>;

export const useLogin = (): [FetchStatus | undefined, LoginFn] => {
  const { localStorageKey, apiUrl } = useAuthContext();
  const [loginStatus, loginUser] = useLoginUser(s => [s.status, s.request]);

  return [
    loginStatus,
    async (email: string, password: string) => await loginUser(localStorageKey, apiUrl, email, password),
  ]
}

export const useRegister = (): [FetchStatus | undefined, RegisterFn] => {
  const { apiUrl } = useAuthContext();
  const [loginStatus, registerUser] = useRegisterUser(s => [s.status, s.request]);

  return [
    loginStatus,
    async (email: string, password: string) => await registerUser(apiUrl, email, password),
  ]
}

export const useLogout = () => {
  const { localStorageKey } = useAuthContext();
  return () => useAuthState.getState().logout(localStorageKey);
}

export const useLoggedInUser = () => {
  return useAuthState(s => s.loggedInUser);
}

export const useAccessToken = () => {
  return useAuthState(s => s.accessToken);
}
