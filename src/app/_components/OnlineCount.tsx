'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../atoms/userAtoms';

const OnlineCount = () => {
  const userId = useAtomValue(userAtom);
  const [count, setCount] = useState(0);
  const socket = useRef<WebSocket | null>(null); // 使用 null 初始化 ref
  function initSocket() {
    socket.current = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/v1/ws?userId=${userId}`);
    socket.current.onmessage = (event) => {
      const message = event.data;
      setCount(message);
    };
  }

  useEffect(() => {
    userId && initSocket()
    return () => {
      socket.current?.close();
    };
  }, [userId]);

  return (
    <div>
      在线人数 <span className='font-mono'>{count}</span>
    </div>
  );
};

export default OnlineCount;
