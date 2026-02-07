'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ExploreMoreCTAProps {
  animationDelay: number;
}

export function ExploreMoreCTA({ animationDelay }: ExploreMoreCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
        delay: animationDelay / 1000,
        ease: 'easeOut',
      }}
    >
      <Link href='/post' className='group block'>
        <div className='border-border-muted bg-bg-default group-hover:border-border-default relative overflow-hidden rounded-lg border shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-[160ms] ease-out group-hover:translate-x-1 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]'>
          <div className='relative flex items-center justify-center gap-3 px-6 py-4'>
            <span className='text-base'>📖</span>
            <span className='text-fg-default group-hover:text-fg-accent text-sm font-semibold transition-colors duration-[160ms]'>
              查看全部文章
            </span>
            <span className='text-fg-muted text-lg transition-transform duration-[160ms] group-hover:translate-x-1'>
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
