'use client';
import Link from 'next/link';
import Navigation from './Navigation';
import Menu from './Menu';
import Logo from './Logo';
import GlobalSearch from './GlobalSearch';
import { IconPersonAdd } from '@oc/icon';
import { IconButton, Tooltip } from '@oc/design';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import classNames from 'classnames';
import { useState } from 'react';

const navLinks = [
  { name: '文章', href: 'post' },
  { name: '留言', href: 'feedback' },
  { name: '友链', href: 'friends' },
  { name: '心情', href: 'moments' },
];
const Header = () => {
  const { scrollY } = useScroll();
  const [count, setCount] = useState(0);
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setCount(latest);
  });
  return (
    <header className={classNames('fixed top-0 z-10 flex h-16 w-full items-center')}>
      <div
        className={classNames(
          'mx-auto flex items-center justify-between px-3 transition-all duration-1000',
          count > 100
            ? 'w-1/2 rounded-2xl border bg-neutral-muted [backdrop-filter:saturate(180%)_blur(20px)]'
            : 'container',
        )}
      >
        <span className='text-2xl md:hidden'>
          <Menu navLinks={navLinks} />
        </span>
        <Link href='/'>
          <Logo width={75} height={25} />
        </Link>
        <nav
          className={classNames(
            'hidden items-center gap-x-4 px-6 py-2 font-medium md:flex',
            count > 100 ? '' : 'rounded-2xl bg-neutral-muted',
          )}
        >
          <Navigation navLinks={navLinks} />
        </nav>
        <span className='inline-flex items-center gap-x-2 text-2xl'>
          <GlobalSearch />
        </span>
      </div>
    </header>
  );
};
export default Header;
