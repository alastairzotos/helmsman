import { loginUser, registerUser } from "@/plugins/user/clients/user";
import { useAuthState } from "@/plugins/user/state/auth";
import { createQuery } from "@bitmetro/create-query";

export const useRegisterUser = createQuery(registerUser);
export const useLoginUser = createQuery(async (localStorageKey: string, url: string, email: string, password: string) => {
  const accessToken = await loginUser(url, email, password);
  useAuthState.getState().setAccessToken(localStorageKey, accessToken);
})
