'use client';
import Link from 'next/link';
import Menu from './Menu';
import Logo from './Logo';
import GlobalSearch from './GlobalSearch';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import classNames from 'classnames';
import { useState } from 'react';

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
            ? 'relative w-[640px] overflow-hidden rounded-full py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] ring-1 ring-border-muted backdrop-blur-xl'
            : 'container',
        )}
      >
        {/* 玻璃背景层 - 只在收缩状态显示 */}
        {count > 100 && (
          <div className='absolute inset-0 bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-bg-default)_90%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-muted)_80%,transparent)]' />
        )}

        {/* Mobile Menu */}
        <span className='relative z-10 text-2xl md:hidden'>
          <Menu navLinks={navLinks} />
        </span>

        {/* Logo */}
        <Link href='/' className='relative z-10 logo-spin-hover'>
            <Logo width={75} height={25} />
        </Link>

        {/* Navigation */}
        <nav
          className={classNames(
            'relative z-10 hidden items-center gap-x-1 md:flex',
            count > 100
              ? ''
              : 'overflow-hidden rounded-full px-4 py-2 shadow-[0_4px_16px_0_rgba(0,0,0,0.08)] ring-1 ring-border-muted backdrop-blur-xl',
          )}
        >
          {/* 导航背景 - 只在展开状态显示 */}
          {count <= 100 && (
            <div className='absolute inset-0 bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-bg-default)_88%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-muted)_80%,transparent)]' />
          )}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={classNames(
                'text-fg-muted relative z-10 px-3 py-1.5 text-sm font-medium',
                'rounded-full transition-all duration-300',
                'hover:text-fg-accent hover:bg-[color:color-mix(in_srgb,var(--color-bg-accent-muted)_20%,transparent)]',
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className='relative z-10'>
          <GlobalSearch />
        </div>
      </div>
    </header>
  );
};
export default Header;
