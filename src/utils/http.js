import axios from "axios";
import { message } from "antd";
import baseUrl from "./index";

let http = null;
http = async (method, url, request) => {
  try {
    const { status, data } = await axios({
      method,
      url,
      data: request ? request.data : null,
      params: request ? request.params : null,
      timeout: 10000,
      baseURL: baseUrl,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      validateStatus: () => {
        return true;
      },
    });
    if (status === 200) {
      const { code, msg } = data;
      code !== 200 && message.error(msg);
      return { ...data };
    } else if (status === 404) {
      message.error("api地址不存在");
      return {
        code: -1,
      };
    } else {
      message.error(data.message);
      return {
        code: -1,
      };
    }
  } catch (e) {
    message.error(e.toString());
    return {
      code: -1,
      result: null,
      msg: e.toString(),
    };
  }
};
// axios.interceptors.response.use(
//   function (response) {
//     console.log(response);
//     // console.log(response)
//     // Do something with response data
//     if (response.data && response.data.code === 401) {
//       // 401, token失效
//       // sessionStorage.clear();
//       // router.replace({name: 'login'})
//     }
//     return response;
//   },
//   function (error) {
//     // console.log(error)
//     // window.location.href = window.document.location.origin;
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
export default http;
