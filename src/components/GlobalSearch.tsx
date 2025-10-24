'use client';
import { IconButton, Modal, Tooltip } from '@/components/ui';
import { useAtom } from 'jotai/index';
import { searchAtom } from '../atoms/searchAtoms';
import { Search, Clock, TrendingUp, X } from 'lucide-react';
import SearchArticleCard from './SearchArticleCard';
import useDebouncedCallback from '../hooks/useDebouncedCallback';
import { useEffect, useRef, useState } from 'react';
import { useSearch } from '../services/search';

const GlobalSearch = () => {
  const [searchVisible, setSearchVisible] = useAtom(searchAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState('');
  const { data } = useSearch({ keyword });

  // 模拟热门搜索和搜索历史
  const hotSearches = ['React', 'TypeScript', 'Node.js', 'Next.js'];
  const searchHistory = ['JavaScript 基础', 'CSS Grid', 'API 设计'];

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

  const clearSearch = () => {
    setKeyword('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <>
      <Tooltip placement='bottom-end' content='搜索 (⌘K)'>
        <IconButton
          onClick={() => {
            setSearchVisible(!searchVisible);
          }}
        >
          <Search className='text-fg-default hover:text-fg-accent transition-all duration-200 hover:scale-110' />
        </IconButton>
      </Tooltip>

      <Modal
        onCancel={() => setSearchVisible(false)}
        visible={searchVisible}
        className='!max-w-4xl !p-0'
      >
        <div className='flex h-[80vh] flex-col'>
          {/* 搜索头部 */}
          <div className='relative p-6 pb-4'>
            <div className='flex items-center gap-4'>
              <div className='relative flex-1'>
                <Search className='text-fg-muted absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2' />
                <input
                  ref={inputRef}
                  onChange={handleInputChange}
                  placeholder='搜索你感兴趣的内容...'
                  className='placeholder:text-fg-muted h-14 w-full rounded-2xl border-0 bg-bg-muted pr-12 pl-12 text-lg transition-all duration-200 focus:bg-bg-white focus:outline-none focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--color-border-accent-emphasis)_20%,transparent)]'
                />
                {keyword && (
                  <button
                    onClick={clearSearch}
                    className='absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-bg-neutral-muted'
                  >
                    <X className='text-fg-muted h-4 w-4' />
                  </button>
                )}
              </div>
              <kbd className='text-fg-muted hidden items-center gap-1 rounded-lg bg-bg-neutral-muted px-3 py-2 font-mono text-xs sm:flex'>
                ESC
              </kbd>
            </div>
          </div>

          {/* 搜索内容区域 */}
          <div className='flex-1 overflow-hidden'>
            {!keyword ? (
              /* 默认状态 - 显示热门搜索和历史记录 */
              <div className='space-y-8 p-6'>
                {/* 热门搜索 */}
                <div>
                  <div className='mb-4 flex items-center gap-2'>
                    <TrendingUp className='text-fg-accent h-4 w-4' />
                    <h3 className='text-fg-default font-medium'>热门搜索</h3>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {hotSearches.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setKeyword(item);
                          if (inputRef.current) {
                            inputRef.current.value = item;
                          }
                        }}
                        className='hover:bg-bg-accent rounded-full bg-bg-neutral-muted px-4 py-2 text-sm transition-all duration-200 hover:scale-105 hover:text-fg-onEmphasis'
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 搜索历史 */}
                <div>
                  <div className='mb-4 flex items-center gap-2'>
                    <Clock className='text-fg-muted h-4 w-4' />
                    <h3 className='text-fg-default font-medium'>最近搜索</h3>
                  </div>
                  <div className='space-y-2'>
                    {searchHistory.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setKeyword(item);
                          if (inputRef.current) {
                            inputRef.current.value = item;
                          }
                        }}
                        className='group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors duration-200 hover:bg-bg-neutral-muted'
                      >
                        <Clock className='text-fg-muted group-hover:text-fg-accent h-4 w-4 transition-colors' />
                        <span className='text-fg-default'>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 搜索提示 */}
                <div className='py-8 text-center'>
                  <div className='bg-bg-accent/10 text-fg-accent inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm'>
                    <Search className='h-4 w-4' />
                    <span>开始输入关键词进行搜索</span>
                  </div>
                </div>
              </div>
            ) : (
              /* 搜索结果状态 */
              <div className='flex h-full flex-col'>
                {/* 结果统计 */}
                {data && data.length > 0 && (
                  <div className='border-b border-border-muted px-6 py-3'>
                    <span className='text-fg-muted text-sm'>
                      为 &quot;<span className='text-fg-accent font-medium'>{keyword}</span>&quot; 找到
                      <span className='text-fg-accent mx-1 font-medium'>{data.length}</span>
                      个结果
                    </span>
                  </div>
                )}

                {/* 结果列表 */}
                <div className='flex-1 overflow-y-auto px-6 py-4'>
                  {data && data.length > 0 ? (
                    <div className='space-y-6'>
                      {data.map((item) => (
                        <div key={item.id} className='group'>
                          <SearchArticleCard dataSource={item} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='flex h-full flex-col items-center justify-center space-y-4 text-center'>
                      <div className='flex h-16 w-16 items-center justify-center rounded-full bg-bg-neutral-muted'>
                        <Search className='text-fg-muted h-6 w-6' />
                      </div>
                      <div>
                        <h3 className='text-fg-default mb-1 font-medium'>未找到相关内容</h3>
                        <p className='text-fg-muted text-sm'>试试其他关键词，或查看热门搜索</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GlobalSearch;
