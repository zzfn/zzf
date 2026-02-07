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
        <div className='border-jan-ink bg-jan-teal-bg group-hover:border-jan-ink relative overflow-hidden rounded-2xl border-2 shadow-[3px_3px_0_var(--color-jan-ink)] transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-[5px_5px_0_var(--color-jan-ink)]'>
          <div className='relative flex items-center justify-center gap-3 px-6 py-4'>
            <span className='text-base'>📖</span>
            <span className='text-fg-default group-hover:text-fg-accent text-sm font-semibold transition-colors duration-200'>
              查看全部文章
            </span>
            <span className='text-fg-muted text-lg transition-transform duration-200 group-hover:-translate-y-0.5'>
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
