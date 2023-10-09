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
  forcedTheme,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = 'theme',
  themes = defaultThemes,
  defaultTheme = enableSystem ? 'system' : 'light',
  attribute = 'data-color-mode',
  value,
  children,
  nonce,
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
    if (theme === 'system' && enableSystem) {
      resolved = getSystemTheme();
    }

    const name = value ? value[resolved] : resolved;
    const d = document.documentElement;

    if (name) {
      d.setAttribute(attribute, name);
    } else {
      d.removeAttribute(attribute);
    }

    if (enableColorScheme) {
      const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null;
      d.style.colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;
    }
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
    [forcedTheme],
  );

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      if (theme === 'system' && enableSystem && !forcedTheme) {
        applyTheme('system');
      }
    },
    [theme, forcedTheme],
  );

  // Always listen to System preference
  useEffect(() => {
    const media = window.matchMedia(MEDIA);

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handleMediaQuery);
    handleMediaQuery(media);

    return () => media.removeListener(handleMediaQuery);
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

  // Whenever theme or forcedTheme changes, apply it
  useEffect(() => {
    applyTheme(forcedTheme ?? theme);
  }, [forcedTheme, theme]);
  const [keyword, setKeyword] = useState('');
  const handleInputChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setKeyword(value);
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
          forcedTheme,
          enableSystem,
          enableColorScheme,
          storageKey,
          themes,
          defaultTheme,
          attribute,
          value,
          children,
          nonce,
        }}
      />
      {children}
    </>
  );
};

const ThemeScript = memo(
  ({
    forcedTheme,
    storageKey,
    attribute,
    enableSystem,
    enableColorScheme,
    defaultTheme,
    value,
    nonce,
  }: ThemeProviderProps & { defaultTheme: string }) => {
    const defaultSystem = defaultTheme === 'system';

    // Code-golfing the amount of characters in the script
    const optimization = (() => {
      return `var d=document.documentElement,n='${attribute}',s='setAttribute';`;
    })();

    const fallbackColorScheme = (() => {
      if (!enableColorScheme) {
        return '';
      }

      const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null;

      if (fallback) {
        return `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${defaultTheme}'`;
      } else {
        return `if(e==='light'||e==='dark')d.style.colorScheme=e`;
      }
    })();

    const updateDOM = (name: string, literal: boolean = false, setColorScheme = true) => {
      const resolvedName = value ? value[name] : name;
      const val = literal ? name + `|| ''` : `'${resolvedName}'`;
      let text = '';

      // MUCH faster to set colorScheme alongside HTML attribute/class
      // as it only incurs 1 style recalculation rather than 2
      // This can save over 250ms of work for pages with big DOM
      if (enableColorScheme && setColorScheme && !literal && colorSchemes.includes(name)) {
        text += `d.style.colorScheme = '${name}';`;
      }

      if (attribute === 'class') {
        if (literal || resolvedName) {
          text += `c.add(${val})`;
        } else {
          text += `null`;
        }
      } else {
        if (resolvedName) {
          text += `d[s](n,${val})`;
        }
      }

      return text;
    };

    const scriptSrc = (() => {
      if (forcedTheme) {
        return `!function(){${optimization}${updateDOM(forcedTheme)}}()`;
      }

      if (enableSystem) {
        return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if('system'===e||(!e&&${defaultSystem})){var t='${MEDIA}',m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDOM(
          'dark',
        )}}else{${updateDOM('light')}}}else if(e){${
          value ? `var x=${JSON.stringify(value)};` : ''
        }${updateDOM(value ? `x[e]` : 'e', true)}}${
          !defaultSystem ? `else{` + updateDOM(defaultTheme, false, false) + '}' : ''
        }${fallbackColorScheme}}catch(e){}}()`;
      }

      return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if(e){${
        value ? `var x=${JSON.stringify(value)};` : ''
      }${updateDOM(value ? `x[e]` : 'e', true)}}else{${updateDOM(
        defaultTheme,
        false,
        false,
      )};}${fallbackColorScheme}}catch(t){}}();`;
    })();

    return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: scriptSrc }} />;
  },
  // Never re-render this component
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

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e) e = window.matchMedia(MEDIA);
  const isDark = e.matches;
  return isDark ? 'dark' : 'light';
};
