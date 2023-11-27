import { useRefreshToken } from "@/hooks/refresh";
import { getEnv } from "@/utils/env";
import { useEffect, useState } from "react";

export type IConnStatus = 'connecting' | 'connected' | 'disconnected' | 'error' | null;
type IReconnectFn = () => void;

export const useWebSockets = <T extends Object>(
  handle: string,
  onReceiveMessage: (data: T) => void
): [IConnStatus, IReconnectFn] => {
  const [token, refreshToken] = useRefreshToken();
  const [connStatus, setConnStatus] = useState<IConnStatus>(null);

  const connect = () => {
    setConnStatus('connecting');

    setTimeout(() => {
      const ws = new WebSocket(getEnv().wsUrl + `/ws?handle=${handle}`);

      ws.onmessage = (e) => onReceiveMessage(JSON.parse(e.data));
      ws.onopen = () => setConnStatus('connected');
      ws.onerror = () => setConnStatus('error');
      ws.onclose = () => {
        setConnStatus('disconnected');

        connect();
      }
    }, 500);
  }

  useEffect(() => {
    connect();
  }, [token]);

  return [connStatus, refreshToken];
}
