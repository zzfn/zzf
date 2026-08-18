'use client';

import { Tooltip } from '@/components/ui';
import classNames from 'classnames';
import { motion } from 'framer-motion';
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

  const themes: Array<{
    id: ThemeOption;
    icon: LucideIcon;
    label: string;
  }> = [
    { id: 'light', icon: Sun, label: '浅色模式' },
    { id: 'auto', icon: SunMoon, label: '跟随系统' },
    { id: 'dark', icon: Moon, label: '深色模式' },
  ];

  const normalizedTheme: ThemeOption =
    theme === 'system' || !theme ? 'auto' : (theme as ThemeOption);
  const activeIndex = Math.max(
    0,
    themes.findIndex((item) => item.id === normalizedTheme),
  );

  return (
    <div
      role='radiogroup'
      className='border border-border-muted/60 bg-bg-muted/40 relative flex h-9 items-center gap-0.5 rounded-full p-1'
    >
      {/* 滑动指示器 */}
      <motion.div
        className='bg-fg-default pointer-events-none absolute top-1 bottom-1 left-1 rounded-full'
        style={{
          width: `calc((100% - 8px) / ${themes.length})`,
        }}
        animate={{
          x: activeIndex * 36,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 35,
        }}
      />

      {themes.map((themeOption) => {
        const isActive = normalizedTheme === themeOption.id;
        const Icon = themeOption.icon;

        return (
          <Tooltip key={themeOption.id} content={themeOption.label}>
            <motion.button
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
                'relative z-10 flex h-7 w-9 items-center justify-center rounded-full',
                'transition-colors duration-200 cursor-pointer',
                isActive ? 'text-bg-default' : 'text-fg-muted hover:text-fg-default',
              )}
              whileHover={isActive ? undefined : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={14} />
            </motion.button>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default ThemeSwitch;
