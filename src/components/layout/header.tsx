import React, { useState } from 'react';
import Link from 'next/link';
import { SvgIcon, Modal, Input } from '@zzf/design';
import styles from './header.module.scss';
import menus from '../../menus.json';
import classNames from 'classnames';
import Theme from '../Theme';
import { useRouter } from 'next/router';
import { login } from 'api/user';
import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch, RootState } from '../../store';

function Header(): JSX.Element {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<Dispatch>();
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });

  async function handleLogin() {
    const { data } = await login(loginInfo);
    localStorage.setItem('uid', data.token);
    dispatch.user.updateUserInfo();
  }

  return (
    <>
      <div className={classNames('flex', 'items-center')}>
        <Link href='/'>
          <a className={classNames('text-brand-primary', 'text-xl', 'mr-2', 'text-primary')}>
            cc&apos;s Blog
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
      <div className={classNames('flex', 'items-center')}>
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
        {user.isLogin ? (
          user.info.nickName
        ) : (
          <Modal
            title='login'
            onConfirm={handleLogin}
            toggled={
              <SvgIcon className={classNames('text-brand-primary', 'mr-2')} size={25} name='user' />
            }
          >
            <Input
              value={loginInfo.username}
              onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })}
              className='mb-2'
              placeholder='账号'
            ></Input>
            <Input
              value={loginInfo.password}
              onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
              placeholder='密码'
            ></Input>
          </Modal>
        )}

        <Theme />
      </div>
    </>
  );
}

export default Header;
