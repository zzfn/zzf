'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Disc3, MapPin, Zap, Compass } from 'lucide-react';

export function BentoNowCard() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      className='bento-card relative flex flex-col justify-between overflow-hidden p-6'
    >
      {/* 顶部标题 */}
      <div className='flex items-center justify-between border-b border-border-muted/50 pb-3'>
        <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fg-muted'>
          <Compass size={14} className='text-fg-accent' />
          <span>此刻 · Live Status</span>
        </div>
        <div className='flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400'>
          <span className='h-1.5 w-1.5 animate-ping rounded-full bg-emerald-500' />
          <span>REALTIME</span>
        </div>
      </div>

      {/* 中部：Now Playing 音乐播放占位组件 */}
      <div className='my-4 flex items-center justify-between gap-4 rounded-2xl border border-border-muted/60 bg-bg-muted/30 p-3.5'>
        <div className='flex items-center gap-3.5 overflow-hidden'>
          {/* 黑胶旋转小盘 */}
          <div
            onClick={() => setIsPlaying(!isPlaying)}
            className={`relative flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral-900 text-white shadow-md transition-transform duration-300 hover:scale-105 ${
              isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''
            }`}
            title={isPlaying ? '点击暂停' : '点击播放'}
          >
            <div className='absolute h-4 w-4 rounded-full border border-neutral-700 bg-neutral-800' />
            <Disc3 size={28} className='text-neutral-400' />
          </div>

          {/* 曲目信息 */}
          <div className='min-w-0 flex-1'>
            <div className='flex items-center gap-2'>
              <p className='truncate text-sm font-semibold text-fg-default'>
                Merry Christmas Mr. Lawrence
              </p>
            </div>
            <p className='truncate text-xs text-fg-muted font-mono'>坂本龙一 · Ryuichi Sakamoto</p>
          </div>
        </div>

        {/* 动态律动音频频谱柱 */}
        <div className='flex items-end gap-1 px-1'>
          <span
            className={`w-0.5 rounded-full bg-fg-accent transition-all duration-300 ${
              isPlaying ? 'h-5 animate-[pulse_0.8s_ease-in-out_infinite]' : 'h-1'
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-fg-accent transition-all duration-300 ${
              isPlaying ? 'h-3 animate-[pulse_1.2s_ease-in-out_infinite_0.2s]' : 'h-1'
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-fg-accent transition-all duration-300 ${
              isPlaying ? 'h-6 animate-[pulse_0.9s_ease-in-out_infinite_0.4s]' : 'h-1'
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-fg-accent transition-all duration-300 ${
              isPlaying ? 'h-4 animate-[pulse_1.1s_ease-in-out_infinite_0.1s]' : 'h-1'
            }`}
          />
        </div>
      </div>

      {/* 底部：时空与心流指标 */}
      <div className='grid grid-cols-2 gap-3 pt-1 text-xs'>
        <div className='flex items-center gap-2 rounded-xl border border-border-muted/40 bg-bg-muted/20 px-3 py-2 text-fg-muted'>
          <MapPin size={14} className='text-rose-500/80 flex-shrink-0' />
          <span className='truncate font-mono'>Shanghai · 24°C</span>
        </div>
        <div className='flex items-center gap-2 rounded-xl border border-border-muted/40 bg-bg-muted/20 px-3 py-2 text-fg-muted'>
          <Zap size={14} className='text-amber-500/80 flex-shrink-0' />
          <span className='truncate font-mono'>Flow: 3.5h Coding</span>
        </div>
      </div>
    </motion.div>
  );
}
