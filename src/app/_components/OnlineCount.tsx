'use client';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import Monitor from '../../utils/monitor';

const OnlineCount = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  async function getUserId() {
    const monitor = new Monitor();
    const _ = await monitor.getVisitor()
    setUserId(_)
  }
  useEffect(() => {
    getUserId()
    if (!userId) return;
    const socket = io('wss://api.zzfzzf.com', {
      query: {
        userId: userId,
      },
    });
    socket.on('connect', () => {
      console.log('connect success', socket.id);
    });
    socket.on('online', (data) => {
      setCount(data);
    });
    return () => {
      socket.off('connect');
      socket.off('online');
      socket.close();
    };
  }, [userId]);
  return <div>在线人数 {count}</div>;
};
export default OnlineCount;
