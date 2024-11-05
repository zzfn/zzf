'use client';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ThemeProviderProps } from './types';
import { useSetAtom, useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtoms';
import { Modal } from '@oc/design';
import SearchArticleCard from '../components/SearchArticleCard';
import useDebouncedCallback from '../hooks/useDebouncedCallback';
import { useSearch } from '../models/search';
import { searchAtom } from '../atoms/searchAtoms';
import { fetchData } from '../models/api';
import { Search } from 'lucide-react';
const colorSchemes = ['light', 'dark'];
const MEDIA = '(prefers-color-scheme: dark)';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  storageKey = 'theme',
  defaultTheme = 'system',
  attribute = 'data-color-mode',
  children,
}) => {
  const setUser = useSetAtom(userAtom);
  const [theme, setThemeState] = useState(() => getTheme(storageKey, defaultTheme));
  const [searchVisible, setSearchVisible] = useAtom(searchAtom);
  useEffect(() => {
    if (!localStorage.getItem('uid')) {
      fetchData({
        endpoint: '/v1/app-users/finger',
      }).then((res: string) => {
        localStorage.setItem('uid', res);
        setUser(res);
      });
    } else {
      setUser(localStorage.getItem('uid'));
    }
    // Handler to call on window keydown
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.code === 'KeyK') {
        event.preventDefault();
        setSearchVisible(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const applyTheme = useCallback((theme: any) => {
    let resolved = theme;
    if (!resolved) return;

    // If theme is system, resolve it before setting theme
    if (theme === 'system') {
      const isDark = window.matchMedia(MEDIA).matches;
      resolved = isDark ? 'dark' : 'light';
    }

    const name = resolved;
    const d = document.documentElement;

    if (name) {
      d.setAttribute(attribute, name);
    } else {
      d.removeAttribute(attribute);
    }

    const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null;
    d.style.colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;
  }, []);

  const setTheme = useCallback((theme: any) => {
    const newTheme = typeof theme === 'function' ? theme(theme) : theme;
    setThemeState(newTheme);

    // Save to storage
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (e) {
      // Unsupported
    }
  }, []);

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      if (theme === 'system') {
        applyTheme('system');
      }
    },
    [theme],
  );

  useEffect(() => {
    const media = window.matchMedia(MEDIA);

    media.addEventListener('change', handleMediaQuery);
    handleMediaQuery(media);

    return () => media.removeEventListener('change', handleMediaQuery);
  }, [handleMediaQuery]);

  // localStorage event handling
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
        return;
      }
      const theme = e.newValue || defaultTheme;
      setTheme(theme);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [setTheme]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
  const [keyword, setKeyword] = useState('');
  const handleInputChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value.trim());
  }, 200);
  const { data } = useSearch({ keyword });
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (searchVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      });
    } else {
      setKeyword('');
    }
  }, [searchVisible]);
  const scriptSrc = useMemo(
    () => `!function(){try{
      var d=document.documentElement,c='${attribute}',m=localStorage.getItem('${storageKey}');
      if(!m){m=window.matchMedia('${MEDIA}').matches?'dark':'light';}
      ${`d.style.colorScheme=(m==='light'||m==='dark')`}
      d.setAttribute(c, ${`(m||'')`});
    }catch(e){}}();`,
    [attribute, MEDIA],
  );
  return (
    <>
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
      <script dangerouslySetInnerHTML={{ __html: scriptSrc }} />
      {children}
    </>
  );
};
const getTheme = (key: string, fallback?: string) => {
  let theme;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return theme || fallback;
};
