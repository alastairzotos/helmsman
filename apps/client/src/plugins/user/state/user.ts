import { loginUser, registerUser } from "@/plugins/user/clients/user";
import { useAuthState } from "@/plugins/user/state/auth";
import { createQuery } from "@bitmetro/create-query";

export const useRegisterUser = createQuery(registerUser);
export const useLoginUser = createQuery(async (email: string, password: string) => {
  const accessToken = await loginUser(email, password);
  useAuthState.getState().setAccessToken(accessToken);
})
