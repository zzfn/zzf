import useMedia from './useMedia';

function useDark(): boolean {
  return useMedia('(prefers-color-scheme: dark)');
}
export default useDark;
