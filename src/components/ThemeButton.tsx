'use client';
import IconSymbols from './IconSymbols';
import React, { useEffect } from 'react';
import { IconButton, Tooltip } from '@oc/design';
import { useAtom } from 'jotai';
import { themeModeAtom } from '../atoms/themeAtoms';
import { searchAtom } from '../atoms/searchAtoms';
import * as R from 'ramda';

const ThemeButton = () => {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);
  const [searchVisible, setSearchVisible] = useAtom(searchAtom);
  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-color-mode', themeMode);
  }, [themeMode]);

  interface ThemeTransitionOptions {
    x?: number; // 鼠标的x坐标
    y?: number; // 鼠标的y坐标
    themeSetter: (theme: 'light' | 'dark' | 'auto') => void; // 设置主题的函数
  }

  const buildThemeTransition = (
    theme: 'light' | 'dark' | 'auto',
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
      <IconButton
        onClick={(event) => {
          const newThemeMode = R.cond([
            [R.equals('light'), R.always('dark')],
            [R.equals('dark'), R.always('auto')],
            [R.T, R.always('light')],
          ])(themeMode);

          buildThemeTransition(newThemeMode as 'light' | 'dark' | 'auto', {
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
