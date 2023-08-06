import Link from 'next/link';
import React from 'react';
import ThemeButton from './ThemeButton';

const Header = () => {
  return (
    <header className='flex w-full justify-between items-center py-6 sticky top-0 bg-default border-b-2 border-emphasis z-10'>
      <Link href='/' className='border-[currentColor] border-2 hover:text-accent rounded-lg px-4'>
        Cc
      </Link>
      <nav className='flex gap-x-2 items-center'>
        <Link href='/post'>Post</Link>
        <Link href='/about'>About</Link>
        <Link href='/feedback'>Feedback</Link>
        <Link href='/search'>Search</Link>
        <span className='text-2xl inline-flex'>
          <ThemeButton />
        </span>
      </nav>
    </header>
  );
};
export default Header;
