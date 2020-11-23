import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import 'styles/globals.scss';
import styles from 'styles/app.module.scss';
import 'markdown-navbar/dist/navbar.css';
import 'styles/markdown.scss';
import 'styles/theme.scss';
import 'highlight.js/styles/rainbow.css';
import dayjs from 'dayjs';
import Link from 'next/link';
import Zooming from 'zooming';
import { Canvas } from 'components/canvas/canvas';

function MyApp({ Component, pageProps }) {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const mode = localStorage.getItem('mode');
    if (mode) {
      console.log(mode);
    } else {
      localStorage.setItem('mode', 'light');
    }
    const zooming = new Zooming({
      enableGrab: false,
      bgColor: 'rgb(0, 0, 0)',
      bgOpacity: '0.5',
    });
    zooming.listen('.zoom');
  }, []);
  return (
    <>
      {isShow && (
        <div onClick={() => setIsShow(!isShow)} className={styles.mask}>
          <ul>
            <li>
              <Link href='/'>首页</Link>
            </li>
            <li>
              <Link href='/archive'>归档</Link>
            </li>
            <li>
              <Link href='/tag'>标签</Link>
            </li>
            <li>
              <Link href='/about'>关于</Link>
            </li>
          </ul>
        </div>
      )}
      <Head>
        <title>zzf</title>
      </Head>
      <Canvas />
      <header className={styles.header}>
        <div className={styles['header_main']}>
          <Link href='/'>
            <img className={styles.logo} src={'/static/img/logo.png'} alt='logo' />
          </Link>
          <nav className={styles.lg}>
            <Link href='/'>首页</Link>
            <Link href='/archive'>归档</Link>
            <Link href='/tag'>标签</Link>
            <Link href='/about'>关于</Link>
          </nav>
          <nav className={styles.sm}>
            <img
              onClick={() => setIsShow(!isShow)}
              style={{ width: '50px', height: '50px' }}
              src='/static/svg/menu.svg'
              alt=''
            />
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <footer className={styles.footer}>
        <div>2020-{dayjs().format('YYYY')}</div>
        <div>Powered by zzfn</div>
        <div>苏ICP备18059856号</div>
      </footer>
    </>
  );
}

export default MyApp;
