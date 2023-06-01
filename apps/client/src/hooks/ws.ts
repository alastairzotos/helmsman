import { useEffect, useId, useState } from "react";

export type IConnStatus = 'connected' | 'disconnected' | 'error' | null;

const getWsUrl = (apiUrl: string) => {
  const url = new URL(apiUrl);
  let host = url.host;
  if (host.includes(':')) {
    host = host.split(':')[0];
  }

  return `ws://${host}:3004`;
}

export const useWebSockets = <T extends Object>(url: string, onReceiveMessage: (data: T) => void): [string, IConnStatus] => {
  const connId = useId();
  const [connStatus, setConnStatus] = useState<IConnStatus>(null);

  useEffect(() => {
    const ws = new WebSocket(getWsUrl(url) + `?id=${connId}`);

    ws.onopen = () => setConnStatus('connected');
    ws.onerror = () => setConnStatus('error');
    ws.onclose = () => setConnStatus('disconnected');
    ws.onmessage = (e) => onReceiveMessage(JSON.parse(e.data));
  }, []);

  return [connId, connStatus];
}
