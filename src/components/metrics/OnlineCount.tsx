'use client';
import React, { useEffect, useRef, useState } from 'react';
import AnimatedNumber from '@/components/AnimatedNumber';
import { useCurrentUser } from '@/services/auth';
const OnlineCount = () => {
  const { currentUser } = useCurrentUser();
  const [count, setCount] = useState(0);
  const socket = useRef<WebSocket | null>(null); // 使用 null 初始化 ref
  useEffect(() => {
    if (!currentUser?.username) {
      return undefined;
    }

    const socketInstance = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/v1/ws?userId=${currentUser.username}`,
    );

    socketInstance.onmessage = (event) => {
      setCount(Number(event.data) || 0);
    };

    socket.current = socketInstance;

    return () => {
      socket.current?.close();
      socket.current = null;
    };
  }, [currentUser?.username]);

  return (
    <div>
      在线人数 <AnimatedNumber number={count} />
    </div>
  );
};
export default OnlineCount;
