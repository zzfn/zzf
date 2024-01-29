import dayjs from 'dayjs';
import React from 'react';
import Link from 'next/link';
import OnlineCount from 'app/_components/OnlineCount';
import Logo from './Logo';
import ThemeButton from './ThemeButton';

const Footer = () => {
  return (
    <footer className='flex items-center justify-center gap-x-2 border-t border-default py-6 text-xs text-muted'>
      Copyright&copy;2020-{dayjs().format('YYYY')}
      <OnlineCount />
      <Link className='hover:underline' target='_blank' href='/api/feed.xml'>
        RSS feed
      </Link>
      <Link className='hover:underline' target='_blank' href='/about'>
        关于
      </Link>
      <Link className='hover:underline' target='_blank' href='https://t.ooxo.cc/pu1qh7'>
        服务状态
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
