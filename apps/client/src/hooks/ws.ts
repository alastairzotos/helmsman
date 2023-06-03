import { useRefreshToken } from "@/hooks/refresh";
import { useEffect, useState } from "react";

export type IConnStatus = 'connecting' | 'connected' | 'disconnected' | 'error' | null;
type IReconnectFn = () => void;

const getWsUrl = (apiUrl: string, port: number) => {
  const url = new URL(apiUrl);
  let host = url.host;
  if (host.includes(':')) {
    host = host.split(':')[0];
  }

  return `ws://${host}:${port}`;
}

export const useWebSockets = <T extends Object>(
  handle: string,
  url: string,
  port: number,
  onReceiveMessage: (data: T) => void
): [IConnStatus, IReconnectFn] => {
  const [token, refreshToken] = useRefreshToken();
  const [connStatus, setConnStatus] = useState<IConnStatus>(null);

  useEffect(() => {
    setConnStatus('connecting');
    const ws = new WebSocket(getWsUrl(url, port) + `?handle=${handle}`);

    ws.onopen = () => setConnStatus('connected');
    ws.onerror = () => setConnStatus('error');
    ws.onclose = () => setConnStatus('disconnected');
    ws.onmessage = (e) => onReceiveMessage(JSON.parse(e.data));
  }, [token]);

  return [connStatus, refreshToken];
}
