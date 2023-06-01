import { create } from 'zustand';
import * as jwt from 'jsonwebtoken';
import { IUser } from 'user-shared';

export interface IAuthStateValues {
  initialised: boolean;
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
  initialised: false,
  accessToken: undefined,

  init(localStorageKey: string) {
    const accessToken = localStorage.getItem(localStorageKey);

    if (accessToken) {
      set({
        initialised: true,
        accessToken,
        loggedInUser: jwt.decode(accessToken) as IUser
      });
    } else {
      set({ initialised: true });
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

