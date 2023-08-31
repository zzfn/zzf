'use client';
import IconSymbols from './IconSymbols';
import React, { useEffect } from 'react';
import { IconButton } from '@oc/design';
import { useAtom } from 'jotai';
import { themeModeAtom } from '../store/store';

const ThemeButton = () => {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);
  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-color-mode', themeMode);
  }, [themeMode]);

  interface ThemeTransitionOptions {
    x?: number; // 鼠标的x坐标
    y?: number; // 鼠标的y坐标
    themeSetter: (theme: 'light' | 'dark' | 'system') => void; // 设置主题的函数
  }

  const buildThemeTransition = (
    theme: 'light' | 'dark' | 'system',
    options: ThemeTransitionOptions,
  ) => {
    if (
      !('startViewTransition' in document) ||
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches
    ) {
      options.themeSetter(theme);
      return;
    }

    const { x = window.innerWidth / 2, y = window.innerHeight / 2 } = options;

    if (typeof x === 'undefined' || typeof y === 'undefined') return;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // @ts-ignore
    document
      .startViewTransition(() => {
        options.themeSetter(theme);
        return Promise.resolve();
      })
      ?.ready.then(() => {
        if (x === 0) return;
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          {
            clipPath,
          },
          {
            duration: 300,
            easing: 'ease-in',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      });
  };

  return (
    <>
      <IconButton
        onClick={(event) => {
          buildThemeTransition(themeMode === 'light' ? 'dark' : 'light', {
            x: event.clientX,
            y: event.clientY,
            themeSetter: (themeParams) => {
              setThemeMode(themeParams);
            },
          });
        }}
      >
        <IconSymbols icon={`${themeMode}_mode`} />
      </IconButton>
    </>
  );
};
export default ThemeButton;
