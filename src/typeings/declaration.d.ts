/**
 * api返回值
 */
interface Res<T> {
  code: number;
  data: T;
  message: string;
}

/**
 * 字典
 */
interface Dict {
  code: string;
  id: string;
  name: string;
}

interface Page<T> {
  current: number;
  total: number;
  size: number;
  records: T[];
}

interface NextProps<T> {
  serverProps: T;
}
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
