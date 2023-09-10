import Link from 'next/link';
import React from 'react';
import ThemeButton from './ThemeButton';
import Navigation from './Navigation';
import Menu from './Menu';
import Logo from './Logo';

const navLinks = [
  { name: 'Post', href: 'post' },
  { name: 'About', href: 'about' },
  { name: 'Feedback', href: 'feedback' },
  { name: 'Search', href: 'search' },
];
const Header = () => {
  return (
    <header className='flex w-full justify-between items-center py-6 sticky top-0 backdrop-blur-md   z-10'>
      <span className='text-2xl lg:hidden'>
        <Menu navLinks={navLinks} />
      </span>
      <Link href='/'>
        <Logo width={75} height={25} />
      </Link>
      <nav className='gap-x-4 items-center px-6 py-2 font-medium bg-muted rounded-2xl hidden lg:flex'>
        <Navigation navLinks={navLinks} />
      </nav>
      <span className='text-2xl inline-flex'>
        <ThemeButton />
      </span>
    </header>
  );
};
export default Header;
