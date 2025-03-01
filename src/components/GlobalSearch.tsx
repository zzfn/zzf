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
          <Search className='text-default hover:text-accent transition-colors' />
        </IconButton>
      </Tooltip>
      <Modal onCancel={() => setSearchVisible(false)} visible={searchVisible}>
        {/* 搜索框区域 */}
        <div className='relative mb-6'>
          <div className='pointer-events-none absolute inset-y-0 left-3 flex items-center'>
            <Search className='text-muted h-5 w-5' />
          </div>
          <input
            ref={inputRef}
            onChange={handleInputChange}
            placeholder='搜索文章...'
            className='bg-opacity text-default focus:border-accent focus:ring-accent h-12 w-full rounded-xl border-2 pr-4 pl-12 focus:ring-1 focus:outline-none'
          />
          <div className='text-muted pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs'>
            <kbd className='border-muted bg-neutral-muted rounded-sm border px-1.5 py-0.5 font-mono'>
              ESC
            </kbd>
          </div>
        </div>

        {/* 搜索结果区域 */}
        <div className='bg-opacity border-default relative h-[60vh] overflow-hidden rounded-xl border'>
          {/* 搜索结果计数 */}
          {data && data.length > 0 && (
            <div className='bg-opacity/80 border-default sticky top-0 border-b px-6 py-3 backdrop-blur-sm'>
              <span className='text-muted text-sm'>
                找到 <span className='text-accent font-mono'>{data.length}</span> 个结果
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
              <div className='text-muted flex h-full items-center justify-center'>
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
