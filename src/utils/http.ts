import axios, { AxiosRequestConfig, Method } from 'axios';
import envConfig from 'env';
const instance = axios.create({
  baseURL: envConfig.baseUrl,
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
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default async function http(
  method: Method,
  url: string,
  config?: AxiosRequestConfig,
): Promise<Res<any>> {
  const { data } = await instance(url, { ...config, method });
  return data;
}
