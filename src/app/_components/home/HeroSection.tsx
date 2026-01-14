'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

type SiteConfig = {
  avatar: string;
  name: string;
  slug: string;
  [key: string]: unknown;
};

interface HeroSectionProps {
  config: SiteConfig;
}

// Claymorphism 样式
const clayStyle = {
  boxShadow: `
    8px 8px 16px color-mix(in srgb, var(--fgColor-default) 8%, transparent),
    -4px -4px 12px color-mix(in srgb, var(--bgColor-default) 80%, white),
    inset 1px 1px 2px color-mix(in srgb, var(--bgColor-default) 50%, white),
    inset -1px -1px 2px color-mix(in srgb, var(--fgColor-default) 5%, transparent)
  `,
};

export function HeroSection({ config }: HeroSectionProps) {
  return (
    <motion.div
      className='mb-12'
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        className='bg-bg-muted relative overflow-hidden rounded-3xl p-8 transition-transform duration-300 hover:scale-[1.01] sm:p-10'
        style={clayStyle}
      >
        {/* 装饰色块 */}
        <div className='absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 opacity-20 blur-2xl' />
        <div className='absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 opacity-20 blur-2xl' />

        <div className='relative flex items-center gap-6 sm:gap-8'>
          {/* 头像 */}
          <motion.div
            className='logo-spin-hover relative flex-shrink-0'
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className='absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-40 blur-xl' />
            <Image
              priority={true}
              className='relative h-24 w-24 rounded-full object-cover ring-4 ring-white/20 transition-all duration-500 md:h-32 md:w-32'
              width={128}
              height={128}
              alt='avatar'
              src={config.avatar}
              style={{
                boxShadow: `
                  4px 4px 10px color-mix(in srgb, var(--fgColor-default) 15%, transparent),
                  -2px -2px 8px color-mix(in srgb, var(--bgColor-default) 80%, white)
                `,
              }}
            />
          </motion.div>

          {/* 文字信息 */}
          <div className='flex min-w-0 flex-1 flex-col gap-y-3'>
            <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
              <span className='bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent'>
                {config.name}
              </span>
              <span className='ml-2 text-xl'>👋</span>
            </h1>
            <p className='text-fg-muted inline-flex items-center gap-2 font-mono text-xs font-medium tracking-wider uppercase sm:text-sm'>
              <span className='inline-flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 text-[10px] text-white shadow'>
                💻
              </span>
              {config.slug}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
