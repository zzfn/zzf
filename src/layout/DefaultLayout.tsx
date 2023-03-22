import Footer from './footer';
import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import LottiePlayer from '../components/LottiePlayer';
import { getCdn } from '../utils/getCdn';
import IconSymbols from '../components/IconSymbols';
import { IconButton } from '@oc/design';
import NavDraw from './NavDraw';
import Aside from './Aside';
import { css } from '@emotion/css';
import useMediaQuery from '../hooks/useMediaQuery';

function DefaultLayout({ children }: { children: React.ReactElement }) {
  const [visible, setVisible] = useState(false);
  const isWidthGreaterThan600 = useMediaQuery('(max-width:961px)');
  return (
    <div
      className={css`
        --nav-width: 80px;
        height: 100vh;
        display: flex;
        flex-direction: column;
      `}
    >
      {isWidthGreaterThan600 && <NavDraw visible={visible} setVisible={setVisible} />}
      <header
        className={classNames(
          'flex w-full items-center h-16 shrink-0  desktop:hidden px-6 justify-between',
          css({
            borderBottom: '1px solid rgb(218,220,224)',
          }),
        )}
      >
        <IconButton onClick={() => setVisible(true)} className={classNames('text-2xl')}>
          <IconSymbols icon='menu' />
        </IconButton>
        <Link className={classNames('text-2xl')} href='/'>
          <LottiePlayer size={50} url={getCdn('/assets/logo.json')} />
        </Link>
      </header>
      <div
        className={classNames(
          'desktop:pl-20',
          'flex-col',
          'flex',
          css`
            flex: 1 1 auto;
          `,
        )}
      >
          <Aside />
          <div className={classNames('container mx-auto px-2 pb-16')}>
            <main>{children}</main>
            <Footer />
          </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
