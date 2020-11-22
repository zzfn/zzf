import React, { useEffect } from 'react';
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
import Image from 'next/image';
function MyApp({ Component, pageProps }) {
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
      <Head>
        <title>zzf</title>
      </Head>
      <Canvas />
      <header className={styles.header}>
        <div className={styles['header_main']}>
          <Link href='/'>
            <Image
              height={'50px'}
              width={'120px'}
              className={styles.logo}
              src={'/static/img/img-3.png'}
              alt='logo'
            />
          </Link>
          <nav>
            <Link href='/'>首页</Link>
            <Link href='/archive'>归档</Link>
            <Link href='/tag'>标签</Link>
            <Link href='/about'>关于</Link>
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
