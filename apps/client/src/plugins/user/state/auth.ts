import { create } from 'zustand';
import * as jwt from 'jsonwebtoken';
import { IUser } from 'user-shared';
import { useAuthContext } from '@/plugins/user/contexts/auth.context';

interface IAuthStateValues {
  accessToken?: string;
  loggedInUser?: IUser;
}

interface IAuthStateActions {
  init(localStorageKey: string): void;
  setAccessToken(localStorageKey: string, accessToken: string): void;
  logout: (localStorageKey: string) => void;
}

type IAuthState = IAuthStateValues & IAuthStateActions;

export const useAuthState = create<IAuthState>((set) => ({
  accessToken: undefined,

  init(localStorageKey: string) {
    const accessToken = localStorage.getItem(localStorageKey);

    if (accessToken) {
      set({
        accessToken,
        loggedInUser: jwt.decode(accessToken) as IUser
      });
    }
  },

  setAccessToken(localStorageKey: string, accessToken: string) {
    localStorage.setItem(localStorageKey, accessToken);
    set({
      accessToken,
      loggedInUser: jwt.decode(accessToken) as IUser
    });
  },

  logout(localStorageKey: string) {
    set({ accessToken: undefined, loggedInUser: undefined });
    localStorage.removeItem(localStorageKey);
  },
}))

