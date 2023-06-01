import { useAuthState } from "@/plugins/user/state/auth";

export const getAccessToken = () => useAuthState.getState().accessToken;

