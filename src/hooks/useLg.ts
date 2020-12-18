import useMedia from './useMedia';

function useLg(): boolean {
  return useMedia('(min-width: 992px)');
}
export default useLg;
