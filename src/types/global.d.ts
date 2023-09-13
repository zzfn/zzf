/**
 * api返回值
 */
interface Res<T = never> {
  code: number;
  data: T;
  message: string;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
declare module 'zooming';
declare module '@multiavatar/multiavatar/esm';
// globals.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_CDN_URL: string;
    NEXT_PUBLIC_WS_URL: string;
  }
}
