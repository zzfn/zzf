'use client';
import { Tooltip } from '@/components/ui';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import { Moon, Sun, SunMoon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

type ThemeOption = 'light' | 'dark' | 'auto';

type ViewTransition = {
  ready: Promise<void>;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => ViewTransition | undefined;
};

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  interface ThemeTransitionOptions {
    x?: number;
    y?: number;
  }

  const toNextThemesValue = (option: ThemeOption) => (option === 'auto' ? 'system' : option);

  const buildThemeTransition = (nextTheme: ThemeOption, options: ThemeTransitionOptions = {}) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as DocumentWithViewTransition;

    if (!doc.startViewTransition || prefersReducedMotion) {
      setTheme(toNextThemesValue(nextTheme));
      return;
    }

    const { x = window.innerWidth / 2, y = window.innerHeight / 2 } = options;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(() => {
      setTheme(toNextThemesValue(nextTheme));
    });

    transition?.ready.then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];

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

  const themes: Array<{ id: ThemeOption; icon: LucideIcon; label: string }> = [
    { id: 'light', icon: Sun, label: '浅色' },
    { id: 'auto', icon: SunMoon, label: '自动' },
    { id: 'dark', icon: Moon, label: '深色' },
  ];

  const normalizedTheme: ThemeOption =
    theme === 'system' || !theme ? 'auto' : (theme as ThemeOption);
  const activeIndex = Math.max(
    0,
    themes.findIndex((item) => item.id === normalizedTheme),
  );

  const switchVars = {
    '--switch-surface': 'color-mix(in srgb, var(--bgColor-default) 92%, transparent)',
    '--switch-shadow':
      '0 24px 48px -28px color-mix(in srgb, var(--fgColor-default) 35%, transparent)',
    '--switch-indicator': 'color-mix(in srgb, var(--bgColor-muted) 98%, transparent)',
    '--switch-indicator-inset': '0.25rem',
  } as CSSProperties;

  return (
    <div
      role='radiogroup'
      style={switchVars}
      className={classNames(
        'relative flex h-10 min-w-[210px] items-center overflow-hidden',
        'border-border-muted text-fg-muted rounded-[22px] border bg-[color:var(--switch-surface)]',
        'backdrop-blur-md transition-[box-shadow,transform] duration-300 ease-in-out',
        'focus-within:border-border-accent-emphasis shadow-[var(--switch-shadow)]',
      )}
    >
      <div
        className={classNames(
          'pointer-events-none absolute left-[var(--switch-indicator-inset)]',
          'rounded-[18px] bg-[color:var(--switch-indicator)]',
          'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'ring-border-muted ring-1 ring-inset',
        )}
        style={{
          top: 'var(--switch-indicator-inset)',
          bottom: 'var(--switch-indicator-inset)',
          width: `calc((100% - (2 * var(--switch-indicator-inset))) / ${themes.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />

      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        const isActive = normalizedTheme === themeOption.id;

        return (
          <Tooltip key={themeOption.id} content={themeOption.label}>
            <button
              type='button'
              role='radio'
              aria-checked={isActive}
              aria-label={themeOption.label}
              tabIndex={isActive ? 0 : -1}
              onClick={(event) => {
                buildThemeTransition(themeOption.id, {
                  x: event.clientX,
                  y: event.clientY,
                });
              }}
              className={classNames(
                'relative z-10 flex h-full flex-1 items-center justify-center',
                'text-sm font-medium transition-colors duration-200',
                'focus-visible:ring-2 focus-visible:ring-[color:var(--borderColor-accent-emphasis)] focus-visible:outline-none',
                'focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--switch-surface)]',
                isActive ? 'text-fg-default' : 'text-fg-muted hover:text-fg-default',
              )}
            >
              <Icon
                className={classNames(
                  'h-4 w-4 transition-transform duration-300',
                  isActive ? 'scale-110' : 'scale-100',
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
