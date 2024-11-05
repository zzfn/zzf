'use client';
import { Tooltip } from '@oc/design';
import classNames from 'classnames';
import { Sun, SunMoon, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

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
      setTheme(theme);
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
        setTheme(theme);
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
      {themes.map((themetarget) => {
        const Icon = themetarget.icon;
        return (
          <Tooltip key={themetarget.id} content={themetarget.label}>
            <button
              onClick={(event) => {
                buildThemeTransition(themetarget.id as any, {
                  x: event.clientX,
                  y: event.clientY,
                });
              }}
              className={classNames(
                'relative flex h-8 w-8 items-center justify-center',
                'rounded-full transition-all duration-300',
                'text-sm hover:bg-white/50',
                theme === themetarget.id && 'bg-accent-muted shadow-sm',
                theme === themetarget.id ? 'text-blue-500' : 'text-gray-500',
              )}
            >
              <Icon
                className={classNames(
                  'h-5 w-5 transition-transform',
                  'hover:scale-110',
                  theme === themetarget.id && 'scale-105',
                )}
              />
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
};
export default ThemeSwitch;
