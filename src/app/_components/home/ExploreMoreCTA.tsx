'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ExploreMoreCTAProps {
  animationDelay: number;
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

export function ExploreMoreCTA({ animationDelay }: ExploreMoreCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: animationDelay / 1000,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <Link href='/post' className='group block'>
        <motion.div
          className='bg-bg-muted relative overflow-hidden rounded-2xl transition-transform duration-300'
          style={clayStyle}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* 渐变背景 */}
          <div className='absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

          <div className='relative flex items-center justify-center gap-3 px-6 py-4'>
            <span className='text-base'>📖</span>
            <span className='text-fg-default group-hover:text-fg-accent text-sm font-bold transition-colors duration-300'>
              查看全部文章
            </span>
            <motion.span className='text-fg-muted text-lg' initial={{ x: 0 }} whileHover={{ x: 4 }}>
              →
            </motion.span>
          </div>

          {/* 底部装饰线 */}
          <div className='absolute right-1/4 bottom-0 left-1/4 h-0.5 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-60' />
        </motion.div>
      </Link>
    </motion.div>
  );
}
