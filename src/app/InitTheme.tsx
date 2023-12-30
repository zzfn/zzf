'use client';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { ThemeProviderProps } from './types';
import { useSetAtom,useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtoms';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { Input, Modal } from "@oc/design";
import SearchArticleCard from "../components/SearchArticleCard";
import useDebouncedCallback from "../hooks/useDebouncedCallback";
import { useSearch } from "../models/search";
import { searchAtom } from "../atoms/searchAtoms";

const colorSchemes = ['light', 'dark'];
const MEDIA = '(prefers-color-scheme: dark)';

const defaultThemes = ['light', 'dark'];

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  storageKey = 'theme',
  themes = defaultThemes,
  defaultTheme = 'system',
  attribute = 'data-color-mode',
  children,
}) => {
  const setUser = useSetAtom(userAtom);
  const [theme, setThemeState] = useState(() => getTheme(storageKey, defaultTheme));
  const [searchVisible, setSearchVisible] = useAtom(searchAtom);
  async function getVisitorId() {
    const { get } = await FingerprintJS.load();
    const { visitorId } = await get();
    setUser(visitorId);
  }
  useEffect(() => {
    // Handler to call on window keydown
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.code === 'KeyK') {
        event.preventDefault();
        setSearchVisible(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  useEffect(() => {
    getVisitorId();
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

  const setTheme = useCallback(
    (theme: any) => {
      const newTheme = typeof theme === 'function' ? theme(theme) : theme;
      setThemeState(newTheme);

      // Save to storage
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch (e) {
        // Unsupported
      }
    },
    [],
  );

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      if (theme === 'system') {
        applyTheme('system');
      }
    },
    [theme],
  );

  // Always listen to System preference
  useEffect(() => {
    const media = window.matchMedia(MEDIA);

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addEventListener('change',handleMediaQuery);
    handleMediaQuery(media);

    return () => media.removeEventListener('change',handleMediaQuery);
  }, [handleMediaQuery]);

  // localStorage event handling
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
        return;
      }

      // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
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
    if(searchVisible){
      setTimeout(()=>{
        inputRef.current?.focus()
      })
    } else{
      setKeyword('')
    }
  },[searchVisible])
  return (
    <>
      <Modal onCancel={()=>setSearchVisible(false)} visible={searchVisible}>
        <div className='p-6'>
        <Input ref={inputRef} onChange={handleInputChange} placeholder='elasticsearch强力驱动' />
        <div className='h-[50vh] overflow-y-auto my-6'>
          {data?.map((item) => (
            <SearchArticleCard dataSource={item} key={item.id} />
          ))}
        </div>
        </div>
      </Modal>
      <ThemeScript
        {...{
          storageKey,
          themes,
          defaultTheme,
          attribute,
          children,
        }}
      />
      {children}
    </>
  );
};

const ThemeScript = memo(
  ({
     storageKey,
     attribute,
     defaultTheme,
   }: ThemeProviderProps & { defaultTheme: string }) => {
    const hasValidFallback = colorSchemes.includes(defaultTheme);
    const scriptSrc = `!function(){try{
      var d=document.documentElement,c='${attribute}',m=localStorage.getItem('${storageKey}');
      if(!m){m=window.matchMedia('${MEDIA}').matches?'dark':'light';}
      ${`d.style.colorScheme=(m==='light'||m==='dark')`}
      d.setAttribute(c, ${`(m||'')`});
    }catch(e){}}();`;

    return <script dangerouslySetInnerHTML={{ __html: scriptSrc }} />;
  },
  () => true,
);


// Helpers
const getTheme = (key: string, fallback?: string) => {
  let theme;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return theme || fallback;
};
