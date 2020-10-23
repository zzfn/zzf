const baseUrl = (): string => {
  return "https://api.zzfzzf.com";
  // return process.env.NODE_ENV === "development"
  //   ? "http://localhost:8060"
  //   : 'https://api.zzfzzf.com';;
};
export default baseUrl();
export const fileUrl: string = baseUrl() + "/oss/upload";
