import dayjs from 'dayjs';
import React from 'react';
import Link from 'next/link';
import OnlineCount from 'app/_components/OnlineCount';
import ThemeClient from './ThemeClient';
import UserAvatar from '@/components/UserAvatar';

const Footer = () => {
  return (
    <footer className='relative'>
      <div className='mx-auto max-w-6xl px-4 py-8'>
        <div className='flex flex-col items-center gap-6'>
          {/* 主要链接 */}
          <div className='flex flex-wrap items-center justify-center gap-x-6 gap-y-3'>
            <Link
              className='text-sm text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400'
              target='_blank'
              href='/api/feed.xml'
            >
              RSS feed
            </Link>
            <Link
              className='text-sm text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400'
              target='_blank'
              href='/about'
            >
              关于
            </Link>
            <Link
              className='text-sm text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400'
              target='_blank'
              href='https://uptime.zzfzzf.com/status/m'
            >
              服务状态
            </Link>
            <Link
              className='text-sm text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400'
              target='_blank'
              href='https://m.zzfzzf.com/share/YjgfEi1urh7EmU6i/zzfzzf.com'
            >
              访问统计
            </Link>
          </div>

          {/* 底部信息 */}
          <div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400'>
            <span>Copyright &copy; 2020-{dayjs().format('YYYY')}</span>
            <span className='hidden sm:block'>•</span>
            <OnlineCount />
            <span className='hidden sm:block'>•</span>
            <a
              className='transition-colors hover:text-purple-600 dark:hover:text-purple-400'
              rel='noreferrer'
              target='_blank'
              href='https://beian.miit.gov.cn'
            >
              苏ICP备18059856号
            </a>
          </div>
          <div className='mt-2'>
            <ThemeClient />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
