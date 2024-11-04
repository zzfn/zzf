'use client';
import React, { useEffect } from 'react';
import { Tooltip } from '@oc/design';
import { useAtom } from 'jotai';
import { themeModeAtom } from '../atoms/themeAtoms';
import classNames from 'classnames';
import { Sun, SunMoon, Moon } from 'lucide-react';
const ThemeButton = () => {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);
  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-color-mode', themeMode);
  }, [themeMode]);

  interface ThemeTransitionOptions {
    x?: number; // 鼠标的x坐标
    y?: number; // 鼠标的y坐标
  }

  const buildThemeTransition = (
    theme: 'light' | 'dark' | 'auto',
    options: ThemeTransitionOptions,
  ) => {
    if (
      !('startViewTransition' in document) ||
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches
    ) {
      setThemeMode(theme);
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
        setThemeMode(theme);
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

  const themes = [
    { id: 'light', icon: Sun, label: '浅色' },
    { id: 'auto', icon: SunMoon, label: '自动' },
    { id: 'dark', icon: Moon, label: '深色' },
  ];

  return (
    <div
      className={classNames(
        'flex items-center gap-1 p-1',
        'rounded-full bg-muted backdrop-blur-sm',
        'border border-gray-200/50',
        'transition-all duration-300 ease-in-out',
      )}
    >
      {themes.map((theme) => {
        const Icon = theme.icon;
        return (
          <Tooltip key={theme.id} content={theme.label}>
            <button
              onClick={(event) => {
                buildThemeTransition(theme.id as any, {
                  x: event.clientX,
                  y: event.clientY,
                });
              }}
              className={classNames(
                'relative flex h-8 w-8 items-center justify-center',
                'rounded-full transition-all duration-300',
                'text-sm hover:bg-white/50',
                themeMode === theme.id && 'bg-accent-muted shadow-sm',
                themeMode === theme.id ? 'text-blue-500' : 'text-gray-500',
              )}
            >
              <Icon
                className={classNames(
                  'h-5 w-5 transition-transform',
                  'hover:scale-110',
                  themeMode === theme.id && 'scale-105',
                )}
              />
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
};
export default ThemeButton;
