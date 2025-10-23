'use client';
import React, { useEffect, useRef, useState } from 'react';
import AnimatedNumber from '@/components/AnimatedNumber';
import { useSession, SessionProvider } from 'next-auth/react';
const OnlineCount = () => {
  const { data: session } = useSession();
  const [count, setCount] = useState(0);
  const socket = useRef<WebSocket | null>(null); // 使用 null 初始化 ref
  useEffect(() => {
    if (!session?.user?.name) {
      return undefined;
    }

    const socketInstance = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/v1/ws?userId=${session.user.name}`,
    );

    socketInstance.onmessage = (event) => {
      setCount(Number(event.data) || 0);
    };

    socket.current = socketInstance;

    return () => {
      socket.current?.close();
      socket.current = null;
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
