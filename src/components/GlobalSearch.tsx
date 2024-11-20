'use client';
import { IconButton, Modal, Tooltip } from '@oc/design';
import { useAtom } from 'jotai/index';
import { searchAtom } from '../atoms/searchAtoms';
import { Search } from 'lucide-react';
import SearchArticleCard from './SearchArticleCard';
import useDebouncedCallback from '../hooks/useDebouncedCallback';
import { useEffect, useRef, useState } from 'react';
import { useSearch } from '../services/search';
const GlobalSearch = () => {
  const [searchVisible, setSearchVisible] = useAtom(searchAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState('');
  const { data } = useSearch({ keyword });
  useEffect(() => {
    if (searchVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      });
    } else {
      setKeyword('');
    }
  }, [searchVisible]);
  const handleInputChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value.trim());
  }, 200);
  return (
    <>
      <Tooltip placement='bottom-end' content='command/control + k'>
        <IconButton
          onClick={() => {
            setSearchVisible(!searchVisible);
          }}
        >
          <Search className='text-default transition-colors hover:text-accent' />
        </IconButton>
      </Tooltip>
      <Modal onCancel={() => setSearchVisible(false)} visible={searchVisible}>
        {/* 搜索框区域 */}
        <div className='relative mb-6'>
          <div className='pointer-events-none absolute inset-y-0 left-3 flex items-center'>
            <Search className='h-5 w-5 text-muted' />
          </div>
          <input
            ref={inputRef}
            onChange={handleInputChange}
            placeholder='搜索文章...'
            className='bg-opacity h-12 w-full rounded-xl border-2 pl-12 pr-4 text-default
                        focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'
          />
          <div className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted'>
            <kbd className='rounded border border-muted bg-neutral-muted px-1.5 py-0.5 font-mono'>
              ESC
            </kbd>
          </div>
        </div>

        {/* 搜索结果区域 */}
        <div className='bg-opacity relative h-[60vh] overflow-hidden rounded-xl border border-default'>
          {/* 搜索结果计数 */}
          {data && data.length > 0 && (
            <div className='bg-opacity/80 sticky top-0 border-b border-default px-6 py-3 backdrop-blur-sm'>
              <span className='text-sm text-muted'>
                找到 <span className='font-mono text-accent'>{data.length}</span> 个结果
              </span>
            </div>
          )}

          {/* 结果列表 */}
          <div className='h-full overflow-y-auto px-6 py-4'>
            {data && data.length > 0 ? (
              <div className='space-y-4'>
                {data.map((item) => (
                  <SearchArticleCard dataSource={item} key={item.id} />
                ))}
              </div>
            ) : (
              <div className='flex h-full items-center justify-center text-muted'>
                <span>开始输入以搜索文章...</span>
              </div>
            )}
          </div>

          {/* 滚动渐变效果 */}
          <div className='pointer-events-none absolute bottom-0 left-0 h-8 w-full bg-gradient-to-t from-[var(--bgColor-muted)] to-transparent'></div>
        </div>
      </Modal>
    </>
  );
};
export default GlobalSearch;
