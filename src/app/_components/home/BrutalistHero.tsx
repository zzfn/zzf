'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function BrutalistHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className='bg-bg-default relative min-h-screen overflow-hidden'>
      {/* 粗野主义几何背景 */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* 大型几何形状 */}
        <motion.div
          className='border-fg-default absolute -top-20 -left-20 h-80 w-80 border-[12px] opacity-10'
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className='border-fg-accent absolute top-1/4 -right-32 h-96 w-96 border-[8px] opacity-20'
          style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className='bg-fg-accent absolute bottom-10 left-1/4 h-40 w-40 opacity-10'
          style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
        />
        {/* 网格线 */}
        <div
          className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage: `
            linear-gradient(var(--fgColor-default) 1px, transparent 1px),
            linear-gradient(90deg, var(--fgColor-default) 1px, transparent 1px)
          `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className='relative mx-auto max-w-7xl px-6 pt-32 pb-20 sm:px-8 lg:px-12'>
        {/* 顶部标记 */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-8'
        >
          <span className='border-fg-default bg-fg-accent text-bg-default inline-block border-4 px-4 py-2 text-xs font-black tracking-[0.3em] uppercase'>
            Creative Studio
          </span>
        </motion.div>

        {/* 主标题 - 粗野主义风格 */}
        <div className='relative mb-12'>
          <motion.h1
            className='text-fg-default relative text-[clamp(3rem,15vw,12rem)] leading-[0.85] font-black tracking-tighter uppercase'
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className='block'>We</span>
            <span className='relative block'>
              Create
              {/* 装饰性下划线 */}
              <motion.span
                className='bg-fg-accent absolute -bottom-2 left-0 h-4 sm:-bottom-4 sm:h-6'
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
            <span className='text-fg-accent block'>Bold*</span>
          </motion.h1>

          {/* 侧边装饰文字 */}
          <motion.div
            className='absolute top-0 -right-4 hidden origin-top-right rotate-90 lg:block'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className='text-fg-muted font-mono text-xs tracking-[0.5em] uppercase'>
              Est. 2024 — Digital Artistry
            </span>
          </motion.div>
        </div>

        {/* 描述区域 */}
        <div className='grid gap-8 lg:grid-cols-2 lg:gap-16'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='max-w-xl'
          >
            <p className='text-fg-muted text-lg leading-relaxed font-medium sm:text-xl lg:text-2xl'>
              我们是一支
              <span className='border-fg-accent text-fg-default border-b-4'>打破常规</span>
              的创意团队。 专注于数字体验、品牌设计与前沿技术的完美融合。
            </p>
          </motion.div>

          {/* 统计数据 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='grid grid-cols-3 gap-4'
          >
            {[
              { value: '50+', label: 'Projects' },
              { value: '12', label: 'Awards' },
              { value: '∞', label: 'Ideas' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className='border-fg-default border-t-4 pt-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <div className='text-fg-default text-3xl font-black sm:text-4xl lg:text-5xl'>
                  {stat.value}
                </div>
                <div className='text-fg-muted mt-1 font-mono text-xs tracking-wider uppercase'>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 滚动提示 */}
        <motion.div
          className='absolute bottom-8 left-1/2 -translate-x-1/2'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className='flex flex-col items-center gap-2'
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className='text-fg-muted font-mono text-xs tracking-widest uppercase'>
              Scroll
            </span>
            <div className='from-fg-default h-12 w-0.5 bg-gradient-to-b to-transparent' />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
