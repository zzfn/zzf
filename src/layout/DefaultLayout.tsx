import Footer from './footer';
import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import LottiePlayer from '../components/LottiePlayer';
import { getCdn } from '../utils/getCdn';
import IconSymbols from '../components/IconSymbols';
import { IconButton } from '@oc/design';
import NavDraw from './NavDraw';
import NavRail from './NavRail';
import { css } from '@emotion/css';

function DefaultLayout({ children }: { children: React.ReactElement }) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={css`
        --nav-width: 80px;
        height: 100vh;
        display: flex;
        flex-direction: column;
      `}
    >
      <header
        className={classNames(
          'flex w-full items-center h-16 shrink-0  desktop:hidden',
          css({
            borderBottom: '1px solid rgb(218,220,224)',
          }),
        )}
      >
        <IconButton className={classNames('text-2xl')}>
          <IconSymbols onClick={() => setVisible(true)} icon='menu' />
        </IconButton>
        <Link className={classNames('text-2xl')} href='/'>
          <LottiePlayer size={50} url={getCdn('/assets/logo.json')} />
        </Link>
      </header>
      <NavDraw visible={visible} setVisible={setVisible} />
      <div
        className={classNames(
          'desktop:pl-32',
          'flex-col',
          'flex',
          css`
            flex: 1 1 auto;
            position: relative;
            overflow-y: hidden;
          `,
        )}
      >
        <div className='overflow-auto'>
          <NavRail />
          <div className={classNames('container mx-auto px-2 pb-16')}>
            <main className='overflow-auto'>{children}</main>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
