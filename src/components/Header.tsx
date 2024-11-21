'use client';
import Link from 'next/link';
import Menu from './Menu';
import Logo from './Logo';
import GlobalSearch from './GlobalSearch';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';

const navLinks = [
  { name: '文章', href: '/post' },
  { name: '留言', href: '/guestbook' },
  { name: '友链', href: '/friends' },
  { name: '心情', href: '/moments' },
];
const Header = () => {
  const { scrollY } = useScroll();
  const [count, setCount] = useState(0);
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setCount(latest);
  });

  return (
    <header className='fixed top-0 z-10 flex h-16 w-full items-center'>
      <div
        className={classNames(
          'mx-auto flex items-center justify-between px-4 transition-all duration-500',
          count > 100
            ? 'w-[640px] rounded-full bg-muted py-2 shadow-lg backdrop-blur-md'
            : 'container',
        )}
      >
        {/* Mobile Menu */}
        <span className='text-2xl md:hidden'>
          <Menu navLinks={navLinks} />
        </span>

        {/* Logo */}
        <Link href='/' className='transition-transform hover:scale-105'>
          <Logo width={75} height={25} />
        </Link>

        {/* Navigation */}
        <nav
          className={classNames(
            'hidden items-center gap-x-1 md:flex',
            count > 100
              ? ''
              : 'rounded-full border border-muted bg-muted px-4 py-2 backdrop-blur-md',
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={classNames(
                'px-3 py-1.5 text-sm font-medium text-muted',
                'rounded-full transition-colors',
                'hover:bg-gray-100 hover:text-gray-900',
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <GlobalSearch />
      </div>
    </header>
  );
};
export default Header;
