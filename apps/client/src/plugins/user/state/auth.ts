import { create } from 'zustand';
import * as jwt from 'jsonwebtoken';
import { IUser } from 'models';

export interface IAuthStateValues {
  accessToken?: string;
  loggedInUser?: IUser;
}

export interface IAuthStateActions {
  init(): void;
  setAccessToken(accessToken: string): void;
}

export type IAuthState = IAuthStateValues & IAuthStateActions;

const ACCESS_TOKEN_LOCAL_STORAGE_KEY = '@mission-control:access-token';

export const useAuthState = create<IAuthState>((set) => ({
  accessToken: undefined,

  init() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

    if (accessToken) {
      set({
        accessToken,
        loggedInUser: jwt.decode(accessToken) as IUser
      });
    }
  },

  setAccessToken(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, accessToken);
    set({ accessToken });
  }
}))
