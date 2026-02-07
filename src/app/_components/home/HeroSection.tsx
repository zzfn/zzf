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

export function HeroSection({ config }: HeroSectionProps) {
  return (
    <motion.div
      className='mb-12'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className='border-jan-ink bg-jan-yellow-bg hover:border-jan-ink relative overflow-hidden rounded-3xl border-2 p-8 shadow-[3px_3px_0_var(--color-jan-ink)] transition-all duration-200 ease-out hover:shadow-[5px_5px_0_var(--color-jan-ink)] sm:p-10'>
        <div className='relative flex items-center gap-6 sm:gap-8'>
          {/* 头像 */}
          <motion.div
            className='logo-spin-hover relative flex-shrink-0'
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Image
              priority={true}
              className='border-border-muted relative h-24 w-24 rounded-full border object-cover transition-all duration-200 md:h-32 md:w-32'
              width={128}
              height={128}
              alt='avatar'
              src={config.avatar}
            />
          </motion.div>

          {/* 文字信息 */}
          <div className='flex min-w-0 flex-1 flex-col gap-y-3'>
            <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
              <span className='bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent'>
                {config.name}
              </span>
              <span className='ml-2 text-xl'>👋</span>
            </h1>
            <p className='text-fg-muted inline-flex items-center gap-2 font-mono text-xs font-medium tracking-wider uppercase sm:text-sm'>
              💻 {config.slug}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
