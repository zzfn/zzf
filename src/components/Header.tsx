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
    <header className='w-full py-5 sticky top-0 backdrop-blur-md z-10'>
      <div className='container mx-auto px-3 flex justify-between items-center'>
        <span className='text-2xl lg:hidden'>
          <Menu navLinks={navLinks} />
        </span>
        <Link href='/'>
          <Logo width={75} height={25} />
        </Link>
        <nav className='gap-x-4 items-center px-6 py-2 font-medium bg-neutral-muted rounded-2xl hidden lg:flex'>
          <Navigation navLinks={navLinks} />
        </nav>
        <span className='text-2xl inline-flex'>
          <ThemeButton />
        </span>
      </div>
    </header>
  );
};
export default Header;
