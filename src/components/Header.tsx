import Link from 'next/link';
import Navigation from './Navigation';
import Menu from './Menu';
import Logo from './Logo';
import GlobalSearch from './GlobalSearch';

const navLinks = [
  { name: '文章', href: 'post' },
  { name: '留言', href: 'feedback' },
  { name: '友链', href: 'friends' },
  { name: '心得', href: 'thinking' },
];
const Header = () => {
  return (
    <header className='fixed top-0 z-10 flex h-16 w-full items-center bg-opacity [backdrop-filter:saturate(180%)_blur(20px)]'>
      <div className='container mx-auto flex items-center justify-between px-3'>
        <span className='text-2xl lg:hidden'>
          <Menu navLinks={navLinks} />
        </span>
        <Link href='/'>
          <Logo width={75} height={25} />
        </Link>
        <nav className='hidden items-center gap-x-4 rounded-2xl bg-neutral-muted px-6 py-2 font-medium lg:flex'>
          <Navigation navLinks={navLinks} />
        </nav>
        <span className='inline-flex text-2xl'>
          <GlobalSearch />
        </span>
      </div>
    </header>
  );
};
export default Header;
