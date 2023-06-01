import { httpClient } from "@/clients/http.client"
import { IAccessTokenDto, ILoginDto, IRegisterDto } from "models"

export const registerUser = async (email: string, password: string) => {
  const { data } = await httpClient.post<IRegisterDto, { data: IAccessTokenDto }>('/users/register', { email, password })

  return data.accessToken;
}

export const loginUser = async (email: string, password: string) => {
  const { data } = await httpClient.post<ILoginDto, { data: IAccessTokenDto }>('/users/login', { email, password })

  return data.accessToken;
}
