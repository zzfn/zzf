import axios, { Method } from "axios";
import baseUrl from "./index";

/**
 * http封装请求
 * @param method
 * @param url
 * @param request
 */
const http = async (
  method: Method,
  url: string,
  request?: { data?: object; params?: object }
): Promise<Res<any>> => {
  try {
    const res = await axios({
      method,
      url,
      data: request ? request.data : null,
      params: request ? request.params : null,
      timeout: 120000,
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      validateStatus: () => {
        return true;
      },
    });
    const { status, data } = res;
    if (status === 200) {
      const { code, message: msg } = data;
      if (code !== 0) {
      }
      return data;
    } else if (status === 404) {
      return {
        code: 4004,
        data: null,
        message: "api地址不存在",
      };
    } else {
      return {
        code: 4000,
        data: null,
        message: data.message,
      };
    }
  } catch (e) {
    return {
      code: 5000,
      data: null,
      message: e.toString(),
    };
  }
};
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
export default http;
