import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import Monitor from './monitor';

async function http<T>(config: AxiosRequestConfig): Promise<Res<T>> {
  let visitorId = '';
  if (typeof window !== 'undefined') {
    const monitor = new Monitor();
    visitorId = await monitor.getVisitor();
  }
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    validateStatus: function () {
      return true;
    },
  });
  instance.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        const Authorization = localStorage.getItem('uid')
          ? `Bearer ${localStorage.getItem('uid')}`
          : null;
        Reflect.set(config.headers, 'visitorId', visitorId);
        Reflect.set(config.headers, 'nonce', visitorId + Date.now());
        Reflect.set(config.headers, 'Authorization', Authorization);
        Reflect.set(config.headers, 'timestamp', Date.now());
      }
      Reflect.set(config.headers, 'System', 'blog');
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  const { data } = await instance.request<Res<T>>(config);
  return data;
}

export default http;
