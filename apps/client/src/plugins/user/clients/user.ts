import { IAccessTokenDto, ILoginDto, IRegisterDto } from "user-shared";

export const registerUser = async (url: string, email: string, password: string) => {
  const res = await fetch(url + '/users/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password } as IRegisterDto)
  })

  const { accessToken } = await res.json() as IAccessTokenDto;

  return accessToken;
}

export const loginUser = async (url: string, email: string, password: string) => {
  const res = await fetch(url + '/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password } as ILoginDto),
  })

  const { accessToken } = await res.json() as IAccessTokenDto;

  return accessToken;
}
