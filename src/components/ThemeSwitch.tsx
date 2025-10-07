'use client';
import { Tooltip } from '@oc/design';
import classNames from 'classnames';
import { Sun, SunMoon, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  interface ThemeTransitionOptions {
    x?: number;
    y?: number;
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
        'relative flex items-center gap-1 p-1',
        'border-muted bg-muted/30 rounded-full border backdrop-blur-sm',
        'transition-all duration-300 ease-in-out',
        'shadow-sm hover:shadow-md',
      )}
    >
      {/* 活动指示器 */}
      <div
        className={classNames(
          'bg-accent/10 absolute h-8 w-8 rounded-full transition-all duration-300',
          'pointer-events-none',
        )}
        style={{
          transform: `translateX(${themes.findIndex((t) => t.id === theme) * 36}px)`,
        }}
      />

      {themes.map((themetarget) => {
        const Icon = themetarget.icon;
        const isActive = theme === themetarget.id;

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
                'relative z-10 flex h-8 w-8 items-center justify-center',
                'rounded-full transition-all duration-300',
                'hover:bg-muted/50',
                isActive && 'text-accent',
                !isActive && 'text-muted',
              )}
            >
              <Icon
                className={classNames(
                  'h-4 w-4 transition-all duration-300',
                  'hover:scale-110',
                  isActive && 'scale-110',
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
