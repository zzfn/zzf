import Link from 'next/link';
import Navigation from './Navigation';
import Menu from './Menu';
import Logo from './Logo';
import GlobalSearch from './GlobalSearch';
import { IconPersonAdd } from '@oc/icon';
import { IconButton, Tooltip } from '@oc/design';
import { cookies } from 'next/headers';
import Image from 'next/image';

const navLinks = [
  { name: '文章', href: 'post' },
  { name: '留言', href: 'feedback' },
  { name: '友链', href: 'friends' },
  { name: '心情', href: 'moments' },
];
const Header = () => {
  const cookieStore = cookies();

  return (
    <header className='fixed top-0 z-10 flex h-16 w-full items-center bg-opacity [backdrop-filter:saturate(180%)_blur(20px)]'>
      <div className='container mx-auto flex items-center justify-between px-3'>
        <span className='text-2xl md:hidden'>
          <Menu navLinks={navLinks} />
        </span>
        <Link href='/'>
          <Logo width={75} height={25} />
        </Link>
        <nav className='hidden items-center gap-x-4 rounded-2xl bg-neutral-muted px-6 py-2 font-medium md:flex'>
          <Navigation navLinks={navLinks} />
        </nav>
        <span className='inline-flex items-center gap-x-2 text-2xl'>
          <GlobalSearch />

          {cookieStore.has('username') ? (
            <Image
              className='rounded-full'
              width={32}
              height={32}
              src={cookieStore.get('avatar_url')?.value || ''}
              alt='user'
            />
          ) : (
            <Tooltip content='login'>
              <a href='https://github.com/login/oauth/authorize?client_id=966d19ff92ce135eeea3'>
                <IconButton>
                  <IconPersonAdd />
                </IconButton>
              </a>
            </Tooltip>
          )}
        </span>
      </div>
    </header>
  );
};
export default Header;
