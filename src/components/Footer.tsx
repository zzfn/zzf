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
    { name: '服务状态', href: 'https://stat.zzfzzf.com', icon: '🟢', external: true },
    {
      name: '统计',
      href: 'https://m.zzfzzf.com/share/YjgfEi1urh7EmU6i/zzfzzf.com',
      icon: '📊',
      external: true,
    },
  ];

  const techStack = [
    { name: 'Next.js', emoji: '⚡' },
    { name: 'Tailwind', emoji: '🎨' },
    { name: 'TypeScript', emoji: '💎' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const blockVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  };

  return (
    <footer className='border-border-muted relative mt-auto border-t py-12'>
      <motion.div
        className='relative mx-auto max-w-5xl px-6 sm:px-8'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-30px' }}
      >
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {/* Logo 区块 */}
          <motion.div className='sm:col-span-2 lg:col-span-1' variants={blockVariants}>
            <div className='border-jan-ink bg-bg-default hover:border-jan-ink h-full rounded-2xl border-2 p-6 transition-all duration-200 ease-out hover:shadow-[5px_5px_0_var(--color-jan-ink)]'>
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

          {/* 导航区块 */}
          <motion.div variants={blockVariants}>
            <div className='border-jan-ink bg-bg-default hover:border-jan-ink h-full rounded-2xl border-2 p-6 transition-all duration-200 ease-out hover:shadow-[5px_5px_0_var(--color-jan-ink)]'>
              <h3 className='text-fg-default mb-4 flex items-center gap-2 text-sm font-semibold'>
                🧭 导航
              </h3>
              <nav className='flex flex-col gap-2'>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className='group border-border-muted hover:border-border-default flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm transition-all duration-200 ease-out hover:-translate-y-0.5'
                  >
                    <span className='text-sm'>{link.icon}</span>
                    <span className='text-fg-muted group-hover:text-fg-default transition-colors'>
                      {link.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* 技术栈区块 */}
          <motion.div variants={blockVariants}>
            <div className='border-jan-ink bg-bg-default hover:border-jan-ink h-full rounded-2xl border-2 p-6 transition-all duration-200 ease-out hover:shadow-[5px_5px_0_var(--color-jan-ink)]'>
              <h3 className='text-fg-default mb-4 flex items-center gap-2 text-sm font-semibold'>
                ⚙️ 技术栈
              </h3>
              <div className='flex flex-col gap-2'>
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className='border-border-muted hover:border-border-default flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm transition-all duration-200 ease-out hover:-translate-y-0.5'
                  >
                    <span className='text-lg'>{tech.emoji}</span>
                    <span className='text-fg-default font-medium'>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 状态区块 */}
          <motion.div variants={blockVariants}>
            <div className='border-jan-ink bg-bg-default hover:border-jan-ink h-full rounded-2xl border-2 p-6 transition-all duration-200 ease-out hover:shadow-[5px_5px_0_var(--color-jan-ink)]'>
              <h3 className='text-fg-default mb-4 flex items-center gap-2 text-sm font-semibold'>
                📈 站点状态
              </h3>

              <div className='border-border-muted mb-3 flex items-center gap-3 rounded-2xl border px-3 py-3'>
                <span className='relative flex h-3 w-3'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75' />
                  <span className='relative inline-flex h-3 w-3 rounded-full bg-green-500' />
                </span>
                <span className='text-fg-muted text-sm'>
                  <OnlineCount />
                </span>
              </div>

              <div className='border-border-muted flex items-center gap-3 rounded-2xl border px-3 py-3'>
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
          <div className='border-jan-ink bg-bg-default flex items-center justify-between gap-4 rounded-2xl border-2 px-6 py-4'>
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

            <ThemeClient />
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
