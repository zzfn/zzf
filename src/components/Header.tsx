'use client';
import Link from 'next/link';
import Menu from './Menu';
import Logo from './Logo';
import GlobalSearch from './GlobalSearch';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: '文章', href: '/post' },
  { name: '留言', href: '/guestbook' },
  { name: '友链', href: '/friends' },
  { name: '心情', href: '/moments' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className='fixed top-0 z-40 flex h-20 w-full items-center transition-all duration-300'>
      <div
        className={classNames(
          'mx-auto flex items-center justify-between px-4 transition-all duration-300 ease-out',
          isScrolled
            ? 'w-[92%] max-w-2xl rounded-full border border-border-muted/60 bg-bg-default/80 py-2.5 shadow-md backdrop-blur-xl dark:border-white/[0.08] dark:bg-bg-default/70'
            : 'container',
        )}
      >
        {/* 移动端菜单 */}
        <span className='relative z-10 text-2xl md:hidden'>
          <Menu navLinks={navLinks} />
        </span>

        {/* Logo */}
        <Link
          href='/'
          className='logo-spin-hover relative z-10 flex items-center gap-2'
          aria-label='返回首页'
        >
          <Logo width={76} height={26} />
        </Link>

        {/* 导航 */}
        <nav
          aria-label='主导航'
          className={classNames(
            'relative z-10 hidden items-center gap-1 md:flex',
            isScrolled
              ? ''
              : 'rounded-full border border-border-muted/50 bg-bg-default/60 px-2 py-1.5 shadow-sm backdrop-blur-lg dark:border-white/[0.06] dark:bg-bg-default/50',
          )}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={classNames(
                  'relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ease-out',
                  isActive
                    ? 'bg-fg-default text-bg-default shadow-xs'
                    : 'text-fg-muted hover:bg-bg-muted/70 hover:text-fg-default',
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className='relative z-10 flex items-center gap-2'>
          <GlobalSearch />
        </div>
      </div>
    </header>
  );
};
export default Header;
