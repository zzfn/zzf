import dayjs from 'dayjs';
import React from 'react';
import Link from 'next/link';
import OnlineCount from 'app/_components/OnlineCount';
import Logo from './Logo';
import ThemeButton from "./ThemeButton";

const Footer = () => {
  return (
    <footer className='flex py-6 text-muted items-center gap-x-2 text-xs border-t justify-center'>
      Copyright&copy;2020-{dayjs().format('YYYY')}
      <OnlineCount />
      <Link className='hover:underline' target='_blank' href='/api/feed.xml'>
        RSS feed
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
