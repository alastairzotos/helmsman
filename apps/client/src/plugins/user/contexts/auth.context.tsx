import { useAuthState } from "@/plugins/user/state/auth";
import React, { useEffect } from "react";

interface IAuthContext {
  localStorageKey: string;
  apiUrl: string;
}

const AuthContext = React.createContext<IAuthContext>({
  localStorageKey: '@bitmetro:auth-storage-key',
  apiUrl: '',
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren<IAuthContext>> = ({ children, ...props }) => {
  const { init } = useAuthState();

  useEffect(() => {
    init(props.localStorageKey);
  }, []);

  return (
    <AuthContext.Provider value={props}>
      {children}
    </AuthContext.Provider>
  )
}
