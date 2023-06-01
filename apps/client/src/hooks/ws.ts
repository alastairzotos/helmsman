import { useEffect, useId, useState } from "react";

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
  url: string,
  port: number,
  onReceiveMessage: (data: T) => void
): [string, IConnStatus, IReconnectFn] => {
  const connId = useId();
  const [counter, setCounter] = useState(0);
  const [connStatus, setConnStatus] = useState<IConnStatus>(null);

  useEffect(() => {
    setConnStatus('connecting');
    const ws = new WebSocket(getWsUrl(url, port) + `?id=${connId}`);

    ws.onopen = () => setConnStatus('connected');
    ws.onerror = () => setConnStatus('error');
    ws.onclose = () => setConnStatus('disconnected');
    ws.onmessage = (e) => onReceiveMessage(JSON.parse(e.data));
  }, [counter]);

  const reconnect = () => setCounter(cur => cur + 1);

  return [connId, connStatus, reconnect];
}
