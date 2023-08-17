import dayjs from 'dayjs';
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import IconSymbols from './IconSymbols';
import OnlineCount from "../app/_components/OnlineCount";

const Footer = () => {
  return (
    <footer className='flex flex-col py-6 text-muted items-center gap-y-2 border-t-2 border-emphasis text-xs'>
      Copyright&copy;2020-{dayjs().format('YYYY')}
      <OnlineCount />
      <Link
        className='hover:underline'
        target='_blank'
        href='/api/feed.xml'
      >
        RSS feed
      </Link>
      <a
        className='hover:underline'
        rel='noreferrer'
        target='_blank'
        href='https://beian.miit.gov.cn'
      >
        苏ICP备18059856号
      </a>
    </footer>
  );
};
export default Footer;
