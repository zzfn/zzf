'use client';
import { IconButton, Tooltip } from '@oc/design';
import { useAtom } from 'jotai/index';
import { searchAtom } from '../atoms/searchAtoms';
import { Search } from 'lucide-react';
const GlobalSearch = () => {
  const [searchVisible, setSearchVisible] = useAtom(searchAtom);
  return (
    <Tooltip placement='bottomRight' content='command/control + k'>
      <IconButton
        onClick={() => {
          setSearchVisible(!searchVisible);
        }}
      >
        <Search className='text-default transition-colors hover:text-accent' />
      </IconButton>
    </Tooltip>
  );
};
export default GlobalSearch;
