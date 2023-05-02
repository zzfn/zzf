import React from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

function Footer(): JSX.Element {
  return (
    <footer
      className={classNames(
        'text-[var(var(--md-sys-color-on-surface))]',
        'text-xs',
        'text-center',
        'my-16',
        'mx-auto',
        'flex',
        'justify-around'
      )}
    >
      <ul className='flex flex-col flex-wrap gap-x-6 gap-y-4'>
        <li>heycc&apos;s Blog</li>
        <li>heycc@ooxo.cc</li>
      </ul>
      <ul className='flex flex-col flex-wrap gap-x-6 gap-y-4'>
        <li>Copyright&copy;2020-{dayjs().format('YYYY')} </li>
        <li>OOXO.CC Inc. All rights reserved.</li>
        <li>
          <a
            className='hover:underline'
            rel='noreferrer'
            target='_blank'
            href='https://beian.miit.gov.cn'
          >
            苏ICP备18059856号
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
