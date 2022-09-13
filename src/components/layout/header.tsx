import React, { useState } from 'react';
import Link from 'next/link';
import { SvgIcon, Modal, Input, Alert } from '@dekopon/design';
import styles from './header.module.scss';
import menus from '../../menus.json';
import classNames from 'classnames';
import Theme from '../Theme';
import { useRouter } from 'next/router';
import { login } from 'api/user';
import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch, RootState } from '../../store';
import Image from 'next/future/image'
function Header(): JSX.Element {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<Dispatch>();
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const [visible, setVisible] = useState(false);

  async function handleLogin() {
    if (loginInfo.password && loginInfo.username) {
      const { data } = await login(loginInfo);
      localStorage.setItem('uid', data.token);
      dispatch.user.updateUserInfo();
      setVisible(false);
    }
  }

  return (
    <>
      <div className={classNames('flex', 'items-center hidden md:flex')}>
        <Image className='w-10 h-10 mr-2' width={100} height={100} src='https://oss-zzf.zzfzzf.com/midway/logo.png'  alt='logo'/>
        <Link href='/'>
          <a className={classNames('text-brand-primary', 'text-xl', 'mr-2', 'text-primary')}>
            Luna&apos;s Blog
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
        {user.isLogin ? (
          <span>{user.info.nickName}</span>
        ) : (
          <SvgIcon
            onClick={() => setVisible(true)}
            className={classNames('text-brand-primary')}
            size={25}
            name='user'
          />
        )}
      </div>
      <Modal
        onCancel={() => setVisible(false)}
        visible={visible}
        title='login'
        onConfirm={handleLogin}
      >
        <Alert className='mb-2'>暂未开放注册服务</Alert>
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
    </>
  );
}

export default Header;
