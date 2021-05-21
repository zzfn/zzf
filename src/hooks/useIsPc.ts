import useMedia from './useMedia';

function useIsPc(): boolean {
  return useMedia('(min-width: 960px)');
}

export default useIsPc;
