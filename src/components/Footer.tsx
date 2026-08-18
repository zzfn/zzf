'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { motion } from 'framer-motion';
import OnlineCount from '@/components/metrics/OnlineCount';
import ThemeClient from './ThemeClient';
import Logo from './Logo';
import { Rss, User, Activity, BarChart2, Cpu, Compass, Layers, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = dayjs().format('YYYY');

  const navLinks = [
    { name: 'RSS 订阅', href: '/api/feed.xml', icon: Rss },
    { name: '关于博主', href: '/about', icon: User },
    { name: '服务状态', href: 'https://stat.zzfzzf.com', icon: Activity, external: true },
    {
      name: '访问统计',
      href: 'https://m.zzfzzf.com/share/YjgfEi1urh7EmU6i/zzfzzf.com',
      icon: BarChart2,
      external: true,
    },
  ];

  const techStack = [
    { name: 'Next.js 16', label: 'App Router' },
    { name: 'Tailwind CSS', label: 'Design Tokens' },
    { name: 'TypeScript', label: 'Strict Type' },
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
    <footer className='border-border-muted/50 relative mt-auto border-t py-12'>
      <motion.div
        className='relative mx-auto max-w-5xl px-6 sm:px-8'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-30px' }}
      >
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {/* Logo 区块 */}
          <motion.div className='sm:col-span-2 lg:col-span-1' variants={blockVariants}>
            <div className='bento-card h-full p-6 flex flex-col justify-between'>
              <div>
                <Link href='/' className='inline-block'>
                  <Logo width={80} height={27} />
                </Link>
                <p className='text-fg-muted mt-3 text-xs leading-relaxed'>
                  奇趣生活实验室
                  <br />
                  <span className='opacity-60'>探索 · 记录 · 分享</span>
                </p>
              </div>
              <p className='text-[11px] text-fg-muted/60 font-mono mt-4'>
                Crafted with curiosity & care.
              </p>
            </div>
          </motion.div>

          {/* 导航区块 */}
          <motion.div variants={blockVariants}>
            <div className='bento-card h-full p-6'>
              <h3 className='text-fg-default mb-3.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-fg-muted'>
                <Compass size={13} className='text-fg-accent' />
                <span>导航索引</span>
              </h3>
              <nav className='flex flex-col gap-1'>
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noreferrer' : undefined}
                      className='group flex items-center gap-2 rounded-xl px-2 py-1.5 text-xs text-fg-muted transition-all duration-150 hover:bg-bg-muted/60 hover:text-fg-default'
                    >
                      <Icon size={13} className='text-fg-muted group-hover:text-fg-accent transition-colors' />
                      <span className='transition-colors'>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* 技术栈区块 */}
          <motion.div variants={blockVariants}>
            <div className='bento-card h-full p-6'>
              <h3 className='text-fg-default mb-3.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-fg-muted'>
                <Cpu size={13} className='text-fg-accent' />
                <span>技术体系</span>
              </h3>
              <div className='flex flex-col gap-1.5'>
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className='flex items-center justify-between rounded-xl px-2 py-1 text-xs text-fg-default'
                  >
                    <span className='font-medium'>{tech.name}</span>
                    <span className='text-[10px] font-mono text-fg-muted'>{tech.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 状态区块 */}
          <motion.div variants={blockVariants}>
            <div className='bento-card h-full p-6'>
              <h3 className='text-fg-default mb-3.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-fg-muted'>
                <Layers size={13} className='text-fg-accent' />
                <span>站点遥测</span>
              </h3>

              <div className='mb-2 flex items-center gap-2.5 rounded-xl border border-border-muted/40 bg-bg-muted/20 px-3 py-2 text-xs'>
                <span className='relative flex h-2 w-2'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
                  <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500' />
                </span>
                <span className='text-fg-muted text-xs'>
                  <OnlineCount />
                </span>
              </div>

              <div className='flex items-center gap-2 rounded-xl border border-border-muted/40 bg-bg-muted/20 px-3 py-2 text-xs'>
                <Clock size={13} className='text-fg-muted flex-shrink-0' />
                <span className='text-fg-muted font-mono text-xs'>
                  持续运行 {parseInt(currentYear) - 2020}+ 年
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 底部信息条 */}
        <motion.div className='mt-6' variants={blockVariants}>
          <div className='bento-card flex items-center justify-between gap-4 px-6 py-3.5 text-xs'>
            <div className='text-fg-muted flex flex-wrap items-center gap-3 text-xs'>
              <span className='flex items-center gap-1.5'>
                <span>©</span>
                <span className='font-mono'>2020-{currentYear}</span>
              </span>
              <span className='bg-border-muted h-3 w-px' />
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
