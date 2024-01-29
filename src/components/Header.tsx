import Link from 'next/link';
import Navigation from './Navigation';
import Menu from './Menu';
import Logo from './Logo';
import GlobalSearch from './GlobalSearch';

const navLinks = [
  { name: '文章', href: 'post' },
  { name: '留言', href: 'feedback' },
  { name: '友链', href: 'friends' },
  { name: '关于', href: 'about' },
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
          <GlobalSearch />
        </span>
      </div>
    </header>
  );
};
export default Header;
