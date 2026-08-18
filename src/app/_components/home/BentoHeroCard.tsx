'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, Github, Twitter, Mail, Rss } from 'lucide-react';
import Link from 'next/link';

type SiteConfig = {
  avatar: string;
  name: string;
  slug: string;
  [key: string]: unknown;
};

interface BentoHeroCardProps {
  config: SiteConfig;
}

export function BentoHeroCard({ config }: BentoHeroCardProps) {
  const [sparkCount, setSparkCount] = useState(128);
  const [isSparked, setIsSparked] = useState(false);

  const handleSpark = () => {
    setSparkCount((prev) => prev + 1);
    setIsSparked(true);
    setTimeout(() => setIsSparked(false), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className='bento-card relative overflow-hidden p-6 sm:p-8'
    >
      {/* 背景微渐变氛围 */}
      <div className='pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-amber-500/10 via-purple-500/10 to-transparent blur-2xl dark:from-purple-500/15' />

      <div className='relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center'>
        {/* 左侧头像与简介 */}
        <div className='flex items-start gap-5 sm:items-center sm:gap-6'>
          <div className='relative flex-shrink-0'>
            <div className='relative h-20 w-20 overflow-hidden rounded-2xl border border-border-muted/80 shadow-sm sm:h-24 sm:w-24'>
              <Image
                priority
                src={config.avatar}
                alt={config.name || 'avatar'}
                fill
                sizes='(max-width: 640px) 80px, 96px'
                className='object-cover transition-transform duration-500 hover:scale-105'
              />
            </div>
            {/* 呼吸状态小灯 */}
            <span
              className='absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-bg-default ring-2 ring-bg-default'
              title='在线状态'
            >
              <span className='h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500' />
            </span>
          </div>

          <div className='flex flex-col gap-1.5'>
            {/* 状态徽章 */}
            <div className='inline-flex items-center gap-2 rounded-full border border-border-muted/70 bg-bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium text-fg-muted w-fit'>
              <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
              <span>Available for ideas & coding</span>
            </div>

            <h1 className='text-2xl font-bold tracking-tight text-fg-default sm:text-3xl'>
              {config.name || 'Krupp'}
            </h1>

            <p className='text-xs font-mono text-fg-muted sm:text-sm'>
              {config.slug || 'Full-stack Developer & Creative Explorer'}
            </p>
          </div>
        </div>

        {/* 右侧互动与社交 */}
        <div className='flex flex-wrap items-center gap-2 sm:flex-col sm:items-end'>
          {/* 点亮灵感微互动 */}
          <button
            onClick={handleSpark}
            className={`group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              isSparked
                ? 'scale-105 border-amber-500/50 bg-amber-500/15 text-amber-600 dark:text-amber-400'
                : 'border-border-muted bg-bg-muted/40 text-fg-default hover:border-amber-500/40 hover:bg-amber-500/10'
            }`}
          >
            <Sparkles
              size={14}
              className={`transition-transform duration-300 ${
                isSparked ? 'rotate-45 text-amber-500' : 'text-fg-muted group-hover:text-amber-500'
              }`}
            />
            <span>击掌灵感</span>
            <span className='font-mono font-semibold'>{sparkCount}</span>
          </button>

          {/* 社交入口胶囊 */}
          <div className='flex items-center gap-1.5'>
            <a
              href='https://github.com/zzfzzf'
              target='_blank'
              rel='noreferrer'
              className='rounded-xl border border-border-muted/60 bg-bg-muted/40 p-2 text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg-default'
              aria-label='GitHub'
            >
              <Github size={15} />
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noreferrer'
              className='rounded-xl border border-border-muted/60 bg-bg-muted/40 p-2 text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg-default'
              aria-label='Twitter'
            >
              <Twitter size={15} />
            </a>
            <a
              href='mailto:contact@zzfzzf.com'
              className='rounded-xl border border-border-muted/60 bg-bg-muted/40 p-2 text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg-default'
              aria-label='Email'
            >
              <Mail size={15} />
            </a>
            <Link
              href='/api/feed.xml'
              className='rounded-xl border border-border-muted/60 bg-bg-muted/40 p-2 text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg-default'
              aria-label='RSS'
            >
              <Rss size={15} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
