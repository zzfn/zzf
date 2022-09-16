import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SvgIcon, Modal, Input, Alert, Tag } from '@dekopon/design';
import styles from './header.module.scss';
import menus from '../../menus.json';
import classNames from 'classnames';
import Theme from '../Theme';
import { useRouter } from 'next/router';
import { login } from 'api/user';
import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch, RootState } from '../../store';
import Image from 'next/future/image';
function Header(): JSX.Element {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<Dispatch>();
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const [visible, setVisible] = useState(false);
  const [visitorId, setVisitorId] = useState('');
  async function handleLogin() {
    if (loginInfo.password && loginInfo.username) {
      const { data } = await login(loginInfo);
      localStorage.setItem('uid', data.token);
      dispatch.user.updateUserInfo();
      setVisible(false);
    }
  }
  useEffect(() => {
    const visitor = localStorage.getItem('visitor');
    setVisitorId(JSON.parse(visitor).visitorId);
  }, []);
  return (
    <>
      <div className={classNames('flex', 'items-center hidden md:flex')}>
        <Link href='/'>
          <a className={classNames('text-brand-primary', 'text-xl', 'mr-2', 'text-primary')}>
            <Image
              className='w-10 h-10 mr-2'
              width={100}
              height={100}
              src='https://oss-zzf.zzfzzf.com/midway/logo.png'
              alt='logo'
            />
          </a>
        </Link>
        <nav className={styles.menu}>
          {menus.map((menu) => (
            <Link key={menu.name} href={menu.path}>
              <a
                className={classNames(
                  menu.path === '/'
                    ? router.pathname === '/' && styles.active
                    : router.pathname.includes(menu.path) && styles.active,
                )}
              >
                {menu.name}
              </a>
            </Link>
          ))}
        </nav>
      </div>
      <div className={classNames('flex', 'items-center hidden md:flex')}>
        <Link href='/search'>
          <a className={classNames('text-brand-primary', 'text-xl', 'mr-2')}>
            <SvgIcon size={25} name='search' />
          </a>
        </Link>
        <Link href='/rss/feed.xml'>
          <a target='_blank' className={classNames('text-brand-primary', 'text-xl', 'mr-2')}>
            <SvgIcon size={25} name='rss' />
          </a>
        </Link>
        <Theme />
      </div>
    </>
  );
}

export default Header;
