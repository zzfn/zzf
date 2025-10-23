import dayjs from 'dayjs';
import React from 'react';
import Link from 'next/link';
import OnlineCount from '@/components/metrics/OnlineCount';
import ThemeClient from './ThemeClient';

const Footer = () => {
  const footerSurface: any = {
    '--footer-surface': 'color-mix(in srgb, var(--bgColor-default) 82%, transparent)',
    '--footer-divider': 'color-mix(in srgb, var(--borderColor-muted) 70%, transparent)',
    '--footer-shadow':
      '0 28px 42px -36px color-mix(in srgb, var(--fgColor-default) 30%, transparent)',
  };

  return (
    <footer
      style={footerSurface}
      className='bg-[color:var(--footer-surface)] border-[color:var(--footer-divider)] shadow-[var(--footer-shadow)] relative mt-auto border-t backdrop-blur-md'
    >
      <div className='mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 sm:px-8'>
        <div className='flex flex-col gap-10 md:flex-row md:justify-between'>
          <div className='space-y-5'>
            <h3 className='text-default text-sm font-semibold tracking-wide'>快速导航</h3>
            <div className='grid grid-cols-1 gap-2 text-sm sm:grid-cols-2'>
              <Link
                className='group flex items-center gap-2 rounded-full px-3 py-2 text-muted transition-colors hover:text-accent'
                href='/api/feed.xml'
              >
                <span className='bg-bg-muted group-hover:bg-bg-accent h-1.5 w-1.5 rounded-full transition-colors'></span>
                RSS feed
              </Link>
              <Link
                className='group flex items-center gap-2 rounded-full px-3 py-2 text-muted transition-colors hover:text-accent'
                href='/about'
              >
                <span className='bg-bg-muted group-hover:bg-bg-accent h-1.5 w-1.5 rounded-full transition-colors'></span>
                关于
              </Link>
              <Link
                className='group flex items-center gap-2 rounded-full px-3 py-2 text-muted transition-colors hover:text-accent'
                target='_blank'
                href='https://uptime.zzfzzf.com/status/m'
              >
                <span className='bg-bg-muted group-hover:bg-bg-accent h-1.5 w-1.5 rounded-full transition-colors'></span>
                服务状态
              </Link>
              <Link
                className='group flex items-center gap-2 rounded-full px-3 py-2 text-muted transition-colors hover:text-accent'
                target='_blank'
                href='https://m.zzfzzf.com/share/YjgfEi1urh7EmU6i/zzfzzf.com'
              >
                <span className='bg-bg-muted group-hover:bg-bg-accent h-1.5 w-1.5 rounded-full transition-colors'></span>
                访问统计
              </Link>
            </div>
          </div>

          <div className='space-y-5'>
            <h3 className='text-default text-sm font-semibold tracking-wide'>站点信息</h3>
            <div className='text-muted space-y-3 text-sm'>
              <div className='flex items-center gap-3'>
                <OnlineCount />
              </div>
              <div className='text-default/80'>
                Copyright &copy; 2020-
                {dayjs().format('YYYY')}
              </div>
              <a
                className='hover:text-accent block text-muted transition-colors'
                rel='noreferrer'
                target='_blank'
                href='https://beian.miit.gov.cn'
              >
                苏ICP备18059856号
              </a>
            </div>
          </div>
        </div>

        <div className='border-[color:var(--footer-divider)] flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between'>
          <div className='text-muted text-xs'>
            Built with Next.js · Tailwind CSS · {dayjs().format('YYYY')}
          </div>
          <ThemeClient />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
