'use client';
import React, { useEffect, useRef, useState } from 'react';
import AnimatedNumber from '../../components/AnimatedNumber';
import { useSession, SessionProvider } from 'next-auth/react';
const OnlineCount = () => {
  const { data: session } = useSession();
  const [count, setCount] = useState(0);
  const socket = useRef<WebSocket | null>(null); // 使用 null 初始化 ref
  function initSocket() {
    socket.current = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/v1/ws?userId=${session?.user?.name}`,
    );
    socket.current.onmessage = (event) => {
      const message = event.data;
      setCount(message);
    };
  }

  useEffect(() => {
    session?.user?.name && initSocket();
    return () => {
      socket.current?.close();
    };
  }, [session?.user?.name]);

  return (
    <div>
      在线人数 <AnimatedNumber number={count} />
    </div>
  );
};

const OnlineCountWithSessionProvider = () => (
  <SessionProvider>
    <OnlineCount></OnlineCount>
  </SessionProvider>
);
export default OnlineCountWithSessionProvider;
