import Link from 'next/link';
import React from 'react';
import ThemeButton from './ThemeButton';
import Navigation from "./Navigation";
import IconSymbols from "./IconSymbols";

const Header = () => {

  return (
    <header className='flex w-full justify-between items-center py-6 sticky top-0 bg-default z-10'>
      <span className='text-2xl lg:hidden'>
        <IconSymbols icon='menu'></IconSymbols>
      </span>
      <Link href='/' className='border-[currentColor] border-2 hover:text-accent rounded-lg px-4'>
        Cc
      </Link>
      <nav className='gap-x-4 items-center px-6 py-2 font-medium text-zinc-800 bg-muted rounded-2xl hidden lg:flex'>
        <Navigation navLinks={[
          { name: 'Post', href: '/post' },
          { name: 'About', href: '/about' },
          { name: 'Feedback', href: '/feedback' },
          { name: 'Search', href: '/search' },
        ]}/>
      </nav>
      <span className='text-2xl inline-flex'>
        <ThemeButton />
      </span>
    </header>
  );
};
export default Header;
