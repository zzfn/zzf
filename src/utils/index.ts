const baseUrl = (): string => {
  // return 'https://api.keep.annyyy.com';
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8060"
    : "https://api.keep.annyyy.com";
};
export default baseUrl();
export const fileUrl: string = baseUrl() + "/oss/upload";
