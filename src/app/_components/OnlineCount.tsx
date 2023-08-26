'use client';
import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import Monitor from 'utils/monitor';

const OnlineCount = () => {
  const [count, setCount] = useState(0);
  const socket = useRef<Socket>();
  async function initSocket() {
    const monitor = new Monitor();
    const userId = await monitor.getVisitor();
    socket.current = io('wss://api.zzfzzf.com', {
      query: {
        userId: userId,
      },
    });
    socket.current.on('online', (data) => {
      setCount(data);
    });
  }

  useEffect(() => {
    initSocket().then();
    return () => {
      socket.current?.off('connect');
      socket.current?.off('online');
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
