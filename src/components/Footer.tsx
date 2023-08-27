import dayjs from 'dayjs';
import React from 'react';
import Link from 'next/link';
import OnlineCount from 'app/_components/OnlineCount';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className='flex flex-col py-6 text-muted items-center gap-y-2 text-xs'>
      Copyright&copy;2020-{dayjs().format('YYYY')}
      <OnlineCount />
      <Link className='hover:underline' target='_blank' href='/api/feed.xml'>
        RSS feed
      </Link>
      <Link className='hover:underline' target='_blank' href='/status'>
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
      <Logo width={75} height={25} />
    </footer>
  );
};
export default Footer;
