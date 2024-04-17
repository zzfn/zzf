import dayjs from 'dayjs';
import React from 'react';
import Link from 'next/link';
import OnlineCount from 'app/_components/OnlineCount';
import ThemeButton from './ThemeButton';

const Footer = () => {
  return (
    <footer className='flex flex-wrap items-center justify-center gap-x-2 border-t border-default py-6 text-xs text-muted'>
      Copyright&copy;2020-{dayjs().format('YYYY')}
      <OnlineCount />
      <Link className='hover:underline' target='_blank' href='/api/feed.xml'>
        RSS feed
      </Link>
      <Link className='hover:underline' target='_blank' href='/about'>
        关于
      </Link>
      <Link className='hover:underline' target='_blank' href='https://uptime.ccw.es/status/m'>
        服务状态
      </Link>
      <Link
        className='hover:underline'
        target='_blank'
        href='https://m.ccw.es/share/YjgfEi1urh7EmU6i/ccw.es'
      >
        访问统计
      </Link>
      <a
        className='hover:underline'
        rel='noreferrer'
        target='_blank'
        href='https://beian.miit.gov.cn'
      >
        苏ICP备18059856号
      </a>
      <ThemeButton />
    </footer>
  );
};
export default Footer;
