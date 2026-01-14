'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { motion } from 'framer-motion';
import OnlineCount from '@/components/metrics/OnlineCount';
import ThemeClient from './ThemeClient';
import Logo from './Logo';

const Footer = () => {
  const currentYear = dayjs().format('YYYY');

  const navLinks = [
    { name: 'RSS', href: '/api/feed.xml', icon: '📡' },
    { name: '关于', href: '/about', icon: '👋' },
    { name: '服务状态', href: 'https://uptime.zzfzzf.com/status/m', icon: '🟢', external: true },
    {
      name: '统计',
      href: 'https://m.zzfzzf.com/share/YjgfEi1urh7EmU6i/zzfzzf.com',
      icon: '📊',
      external: true,
    },
  ];

  const techStack = [
    { name: 'Next.js', emoji: '⚡', bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' },
    { name: 'Tailwind', emoji: '🎨', bg: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)' },
    { name: 'TypeScript', emoji: '💎', bg: 'linear-gradient(135deg, #3178c6 0%, #235a97 100%)' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const blockVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
    },
  };

  // Claymorphism 样式
  const clayStyle = {
    boxShadow: `
      8px 8px 16px color-mix(in srgb, var(--fgColor-default) 8%, transparent),
      -4px -4px 12px color-mix(in srgb, var(--bgColor-default) 80%, white),
      inset 1px 1px 2px color-mix(in srgb, var(--bgColor-default) 50%, white),
      inset -1px -1px 2px color-mix(in srgb, var(--fgColor-default) 5%, transparent)
    `,
  };

  const clayInsetStyle = {
    boxShadow: `
      inset 4px 4px 8px color-mix(in srgb, var(--fgColor-default) 6%, transparent),
      inset -2px -2px 6px color-mix(in srgb, var(--bgColor-default) 60%, white)
    `,
  };

  return (
    <footer className='relative mt-auto py-12'>
      {/* 背景图案 */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden opacity-30'>
        <div className='absolute top-8 -right-12 h-24 w-24 rotate-12 rounded-3xl bg-gradient-to-br from-pink-400 to-rose-500 blur-2xl' />
        <div className='absolute bottom-12 -left-8 h-32 w-32 -rotate-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 blur-3xl' />
        <div className='absolute top-1/4 left-1/2 h-20 w-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 blur-2xl' />
      </div>

      <motion.div
        className='relative mx-auto max-w-5xl px-6 sm:px-8'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-30px' }}
      >
        {/* 主要内容 - 色块网格 */}
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {/* 🏠 Logo 区块 */}
          <motion.div className='sm:col-span-2 lg:col-span-1' variants={blockVariants}>
            <div
              className='bg-bg-muted h-full rounded-3xl p-6 transition-transform duration-300 hover:scale-[1.02]'
              style={clayStyle}
            >
              <Link href='/' className='logo-spin-hover inline-block'>
                <Logo width={80} height={27} />
              </Link>
              <p className='text-fg-muted mt-4 text-sm leading-relaxed'>
                奇趣生活实验室 🧪
                <br />
                <span className='text-xs opacity-60'>探索 · 记录 · 分享</span>
              </p>
            </div>
          </motion.div>

          {/* 🧭 导航区块 */}
          <motion.div variants={blockVariants}>
            <div
              className='bg-bg-muted h-full rounded-3xl p-6 transition-transform duration-300 hover:scale-[1.02]'
              style={clayStyle}
            >
              <h3 className='text-fg-default mb-4 flex items-center gap-2 text-sm font-bold'>
                <span className='flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-xs text-white shadow-lg'>
                  🧭
                </span>
                导航
              </h3>
              <nav className='flex flex-col gap-2'>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className='group flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-all duration-200'
                    style={clayInsetStyle}
                  >
                    <span className='text-sm transition-transform duration-200 group-hover:scale-125'>
                      {link.icon}
                    </span>
                    <span className='text-fg-muted group-hover:text-fg-default transition-colors'>
                      {link.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* ⚙️ 技术栈区块 */}
          <motion.div variants={blockVariants}>
            <div
              className='bg-bg-muted h-full rounded-3xl p-6 transition-transform duration-300 hover:scale-[1.02]'
              style={clayStyle}
            >
              <h3 className='text-fg-default mb-4 flex items-center gap-2 text-sm font-bold'>
                <span className='flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-xs text-white shadow-lg'>
                  ⚙️
                </span>
                技术栈
              </h3>
              <div className='flex flex-col gap-2'>
                {techStack.map((tech) => (
                  <motion.div
                    key={tech.name}
                    className='flex items-center gap-3 overflow-hidden rounded-xl p-2.5 text-white shadow-lg'
                    style={{ background: tech.bg }}
                    whileHover={{ scale: 1.03, x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <span className='text-lg'>{tech.emoji}</span>
                    <span className='text-sm font-medium'>{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 📈 状态区块 */}
          <motion.div variants={blockVariants}>
            <div
              className='bg-bg-muted h-full rounded-3xl p-6 transition-transform duration-300 hover:scale-[1.02]'
              style={clayStyle}
            >
              <h3 className='text-fg-default mb-4 flex items-center gap-2 text-sm font-bold'>
                <span className='flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-xs text-white shadow-lg'>
                  📈
                </span>
                站点状态
              </h3>

              {/* 在线人数 */}
              <div
                className='mb-3 flex items-center gap-3 rounded-xl px-3 py-3'
                style={clayInsetStyle}
              >
                <span className='relative flex h-3 w-3'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75' />
                  <span className='relative inline-flex h-3 w-3 rounded-full bg-green-500' />
                </span>
                <span className='text-fg-muted text-sm'>
                  <OnlineCount />
                </span>
              </div>

              {/* 运行时间 */}
              <div className='flex items-center gap-3 rounded-xl px-3 py-3' style={clayInsetStyle}>
                <span className='text-base'>⏱️</span>
                <span className='text-fg-muted text-sm'>
                  运行 {parseInt(currentYear) - 2020}+ 年
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 底部信息条 */}
        <motion.div className='mt-8' variants={blockVariants}>
          <div
            className='bg-bg-muted flex items-center justify-between gap-4 rounded-2xl px-6 py-4'
            style={clayStyle}
          >
            {/* 左侧：版权信息 */}
            <div className='text-fg-muted flex flex-wrap items-center gap-3 text-xs'>
              <span className='flex items-center gap-1.5'>
                <span>©</span>
                <span className='font-mono'>2020-{currentYear}</span>
              </span>
              <span className='bg-border-muted h-4 w-px' />
              <a
                className='hover:text-fg-default transition-colors duration-200'
                rel='noreferrer'
                target='_blank'
                href='https://beian.miit.gov.cn'
              >
                苏ICP备18059856号
              </a>
            </div>

            {/* 右侧：主题切换 */}
            <ThemeClient />
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
