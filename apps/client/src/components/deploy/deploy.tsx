import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Space } from "antd";
import { getEnv } from "@/utils/env";
import { v4 } from 'uuid';
import { useDeploy } from "@/state/deploy.state";
import {  IDeployMessageDto, IProject, WithId } from "models";
import { DeployMessage } from "@/components/deploy/deploy-message";

const getWsUrl = () => {
  const url = new URL(getEnv().apiUrl);
  let host = url.host;
  if (host.includes(':')) {
    host = host.split(':')[0];
  }

  return `ws://${host}:3004`;
}

interface Props {
  project: WithId<IProject>;
}

export const Deploy: React.FC<Props> = ({ project }) => {
  const endRef = useRef<HTMLDivElement>(null);
  const [connId, setConnId] = useState<string | null>();

  const [deployStatus, deploy] = useDeploy(s => [s.status, s.request]);

  const [content, setContent] = useState<IDeployMessageDto[]>([]);

  const receiveMessage = (message: IDeployMessageDto) => {
    setContent((curContent) => {
      const lastMessage = curContent.at(-1);
      if (!lastMessage) {
        return [...curContent, message];
      }

      if (lastMessage.type === message.type) {
        switch (message.type) {
          case 'git':
            if (message.gitMessage?.phase === lastMessage.gitMessage?.phase) {
              const newContent = [...curContent];
              newContent[newContent.length - 1] = message;
              return newContent;
            }

            return [...curContent, message];
        }
      }

      return [...curContent, message];
    })
  }

  useEffect(() => {
    const ws = new WebSocket(getWsUrl());

    ws.onopen = () => {
      const id = v4();
      setConnId(id);
      ws.send(id);

      console.log('Connected'); // TODO:
    };

    ws.onerror = () => console.log('There was an error'); // TODO:
    ws.onclose = () => {
      console.log('Connection closed'); // TODO:
      setConnId(null);
    }

    ws.onmessage = (e) => receiveMessage(JSON.parse(e.data));
  }, []);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [content.length]);

  const handleDeployClick = () => {
    if (connId) {
      deploy(project._id, connId);
    }
  }

  return (
    <Space direction="vertical">
      <Card style={{ width: 600, overflowY: 'scroll', maxHeight: 300 }}>
        {content.map((message, index) => (
          <div key={index}>
            <DeployMessage message={message} />
            <br />
          </div>
        ))}

        <div ref={endRef} />
      </Card>

      <Button
        onClick={handleDeployClick}
        disabled={deployStatus === 'fetching' || !connId}
      >
        Deploy
      </Button>
    </Space>
  )
}
