import type { AxiosPromise, AxiosRequestConfig } from 'axios';
import axios from 'axios';

function http(config: AxiosRequestConfig): AxiosPromise {
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
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  return instance(config);
}

export default http;
