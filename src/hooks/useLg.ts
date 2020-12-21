import useMedia from './useMedia';

function useLg(): boolean {
  return useMedia('(min-width: 768px)');
}
export default useLg;
