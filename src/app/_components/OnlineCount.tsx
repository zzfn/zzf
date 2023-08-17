'use client';
import { useEffect, useLayoutEffect, useState } from "react";
import Monitor from '../../utils/monitor';
import * as process from "process";

const OnlineCount = () => {
  const [count,setCount] = useState(0)
  useEffect(() => {
    const socket = new WebSocket('wss://api.zzfzzf.com');
    socket.onopen = function () {
      socket.send('Hello Server!')
      console.log('WebSocket open');
    }
    socket.onmessage = function (event) {
      console.log('WebSocket message: ', event.data)
      setCount(event.data);
    };
    socket.onerror = function (event) {
      console.log('WebSocket error: ', event);
    }
  }, []);
  return <div>在线人数 {count}</div>;
};
export default OnlineCount;
