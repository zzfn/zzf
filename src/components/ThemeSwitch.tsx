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
    emoji: string;
  }> = [
    { id: 'light', icon: Sun, label: '浅色', emoji: '☀️' },
    { id: 'auto', icon: SunMoon, label: '自动', emoji: '🌗' },
    { id: 'dark', icon: Moon, label: '深色', emoji: '🌙' },
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
      className='border-border-muted bg-bg-default relative flex h-10 items-center gap-1 rounded-2xl border p-1'
    >
      {/* 滑动指示器 */}
      <motion.div
        className='bg-bg-emphasis pointer-events-none absolute top-1 bottom-1 left-1 rounded-xl'
        style={{
          width: `calc((100% - 8px) / ${themes.length})`,
        }}
        animate={{
          x: activeIndex * 44,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />

      {themes.map((themeOption) => {
        const isActive = normalizedTheme === themeOption.id;

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
                'relative z-10 flex h-8 w-10 items-center justify-center rounded-xl',
                'text-sm font-medium transition-colors duration-200',
                'focus-visible:ring-border-accent-emphasis focus-visible:ring-2 focus-visible:outline-none',
                isActive ? 'text-fg-onEmphasis' : 'text-fg-muted',
              )}
              whileHover={isActive ? undefined : { scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className='text-base'
                animate={isActive ? { rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {themeOption.emoji}
              </motion.span>
            </motion.button>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default ThemeSwitch;
