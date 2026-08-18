'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';

interface BentoExploreCTAProps {
  animationDelay?: number;
}

export function BentoExploreCTA({ animationDelay = 300 }: BentoExploreCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: animationDelay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      className='mt-8'
    >
      <Link href='/post' className='group block'>
        <div className='bento-card relative overflow-hidden p-6 sm:p-8 transition-all duration-300 hover:border-fg-accent/30'>
          {/* 背景光斑 */}
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-500/5 via-teal-500/5 to-amber-500/5 opacity-60 transition-opacity duration-300 group-hover:opacity-100' />

          <div className='relative flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left'>
            <div className='flex items-center gap-4'>
              <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-border-muted/70 bg-bg-muted/40 text-fg-accent shadow-xs'>
                <Compass size={24} className='transition-transform duration-500 group-hover:rotate-45' />
              </div>
              <div>
                <h3 className='text-base font-bold text-fg-default sm:text-lg'>
                  探索数字花园全部宝藏
                </h3>
                <p className='text-xs text-fg-muted mt-0.5'>
                  按年份与标签归档，回顾前端、工程化与思考历程
                </p>
              </div>
            </div>

            <div className='inline-flex items-center gap-2 rounded-full bg-fg-default px-5 py-2.5 text-xs font-semibold text-bg-default shadow-sm transition-transform duration-200 group-hover:scale-105'>
              <Sparkles size={14} />
              <span>浏览全部归档</span>
              <ArrowRight size={14} className='transition-transform duration-200 group-hover:translate-x-0.5' />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
