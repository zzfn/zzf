"use client";
import { IconButton, Tooltip } from '@oc/design';
import IconSymbols from './IconSymbols';
import { useAtom } from 'jotai/index';
import { searchAtom } from '../atoms/searchAtoms';

const GlobalSearch = () => {
  const [searchVisible, setSearchVisible] = useAtom(searchAtom);
  return (
    <Tooltip placement='bottomRight' content='command/control + k'>
      <IconButton>
        <IconSymbols
          onClick={() => {
            setSearchVisible(!searchVisible);
          }}
          icon='search'
        />
      </IconButton>
    </Tooltip>
  );
};
export default GlobalSearch;
