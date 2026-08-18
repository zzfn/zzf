'use client';

import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

type AIProps = {
  summary: ReactNode;
};

const AI = ({ summary }: AIProps) => {
  if (!summary) return null;

  return (
    <div className='relative my-6 overflow-hidden rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 sm:p-6 backdrop-blur-xs'>
      {/* 顶部微光光晕 */}
      <div className='pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/10 blur-xl' />

      <div className='relative flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <div className='inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400'>
            <div className='flex h-6 w-6 items-center justify-center rounded-lg bg-purple-500/15'>
              <Sparkles size={14} />
            </div>
            <span>AI Quick Summary · 核心脉络</span>
          </div>
          <span className='rounded-full border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 font-mono text-[10px] text-purple-600 dark:text-purple-300'>
            TL;DR
          </span>
        </div>

        <div className='text-xs sm:text-sm leading-relaxed text-fg-muted pl-1'>
          {summary}
        </div>
      </div>
    </div>
  );
};

export default AI;
