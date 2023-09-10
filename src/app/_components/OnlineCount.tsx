'use client';
import React, { useEffect, useRef, useState } from 'react';
import Monitor from 'utils/monitor';

const OnlineCount = () => {
  const [count, setCount] = useState(0);
  const socket = useRef<WebSocket | null>(null); // 使用 null 初始化 ref
  async function initSocket() {
    const monitor = new Monitor();
    const userId = await monitor.getVisitor();

    socket.current = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/v1/ws?userId=${userId}`);
    socket.current.onmessage = (event) => {
      const message = event.data;
      setCount(message);
    };
  }

  useEffect(() => {
    initSocket().then();
    return () => {
      socket.current?.close();
    };
  }, []);

  return (
    <div>
      在线人数 <span className='font-mono'>{count}</span>
    </div>
  );
};

export default OnlineCount;
