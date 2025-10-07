import dayjs from 'dayjs';
import React from 'react';
import Link from 'next/link';
import OnlineCount from 'app/_components/OnlineCount';
import ThemeClient from './ThemeClient';

const Footer = () => {
  return (
    <footer className='border-muted bg-muted/20 relative mt-auto border-t backdrop-blur-sm'>
      <div className='mx-auto max-w-6xl px-4 py-8'>
        {/* 主要内容区 */}
        <div className='grid gap-8 md:grid-cols-2'>
          {/* 左侧：导航链接 */}
          <div className='space-y-4'>
            <h3 className='text-default text-sm font-medium'>快速导航</h3>
            <div className='grid grid-cols-2 gap-3'>
              <Link
                className='group text-muted hover:text-accent flex items-center gap-2 text-sm transition-colors'
                href='/api/feed.xml'
              >
                <span className='bg-muted group-hover:bg-accent h-1 w-1 rounded-full transition-colors'></span>
                RSS feed
              </Link>
              <Link
                className='group text-muted hover:text-accent flex items-center gap-2 text-sm transition-colors'
                href='/about'
              >
                <span className='bg-muted group-hover:bg-accent h-1 w-1 rounded-full transition-colors'></span>
                关于
              </Link>
              <Link
                className='group text-muted hover:text-accent flex items-center gap-2 text-sm transition-colors'
                target='_blank'
                href='https://uptime.zzfzzf.com/status/m'
              >
                <span className='bg-muted group-hover:bg-accent h-1 w-1 rounded-full transition-colors'></span>
                服务状态
              </Link>
              <Link
                className='group text-muted hover:text-accent flex items-center gap-2 text-sm transition-colors'
                target='_blank'
                href='https://m.zzfzzf.com/share/YjgfEi1urh7EmU6i/zzfzzf.com'
              >
                <span className='bg-muted group-hover:bg-accent h-1 w-1 rounded-full transition-colors'></span>
                访问统计
              </Link>
            </div>
          </div>

          {/* 右侧：站点信息 */}
          <div className='space-y-4'>
            <h3 className='text-default text-sm font-medium'>站点信息</h3>
            <div className='text-muted space-y-2 text-sm'>
              <div className='flex items-center gap-2'>
                <OnlineCount />
              </div>
              <div>Copyright &copy; 2020-{dayjs().format('YYYY')}</div>
              <a
                className='hover:text-accent block transition-colors'
                rel='noreferrer'
                target='_blank'
                href='https://beian.miit.gov.cn'
              >
                苏ICP备18059856号
              </a>
            </div>
          </div>
        </div>

        {/* 底部分隔线和主题切换 */}
        <div className='border-muted mt-8 flex items-center justify-between border-t pt-6'>
          <div className='text-muted text-xs'>Built with Next.js & Tailwind CSS</div>
          <ThemeClient />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
