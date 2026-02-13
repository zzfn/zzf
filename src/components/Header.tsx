'use client';
import Link from 'next/link';
import Menu from './Menu';
import Logo from './Logo';
import GlobalSearch from './GlobalSearch';
import classNames from 'classnames';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: '文章', href: '/post' },
  { name: '问答', href: '/ask' },
  { name: '留言', href: '/guestbook' },
  { name: '友链', href: '/friends' },
  { name: '心情', href: '/moments' },
];
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    // 检查初始滚动位置
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className='fixed top-0 z-10 flex h-16 w-full items-center'>
      <div
        className={classNames(
          'mx-auto flex items-center justify-between px-4 transition-all duration-[250ms] ease-out',
          isScrolled
            ? 'border-jan-ink bg-bg-default relative w-[640px] overflow-hidden rounded-2xl border-2 py-2 shadow-[3px_3px_0_var(--color-jan-ink)]'
            : 'container',
        )}
      >
        {/* 移动端菜单 */}
        <span className='relative z-10 text-2xl md:hidden'>
          <Menu navLinks={navLinks} />
        </span>

        {/* Logo */}
        <Link href='/' className='logo-spin-hover relative z-10' aria-label='返回首页'>
          <Logo width={75} height={25} />
        </Link>

        {/* 导航 */}
        <nav
          aria-label='主导航'
          className={classNames(
            'relative z-10 hidden items-center gap-x-1 md:flex',
            isScrolled
              ? ''
              : 'border-jan-ink bg-bg-default overflow-hidden rounded-2xl border-2 px-4 py-2 shadow-[3px_3px_0_var(--color-jan-ink)]',
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={classNames(
                'text-fg-muted relative z-10 px-3 py-1.5 text-sm font-medium',
                'rounded-2xl transition-all duration-200 ease-out',
                'hover:text-fg-default hover:bg-jan-yellow/20',
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
