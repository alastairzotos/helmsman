export interface IRegisterDto {
  email: string;
  password: string;
}

export interface ILoginDto {
  email: string;
  password: string;
}

export interface IAccessTokenDto {
  accessToken: string;
}
