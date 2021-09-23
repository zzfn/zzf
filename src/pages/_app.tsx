import React, { useEffect } from 'react';
import Head from 'next/head';
import '@zzf/design/dist/bundle.css';
import 'styles/globals.scss';
import '@primer/css/base/modes.scss';
import '@primer/css/utilities/colors.scss';
import 'highlight.js/styles/rainbow.css';
import Header from 'components/layout/header';
import Footer from 'components/layout/footer';
import 'styles/markdown.scss';
import { Layout } from '@zzf/design';
import { getTitle } from '../utils/getTitle';
import type { AppProps } from 'next/app';
import Monitor from '../utils/monitor';
import { Router } from 'next/router';
import { initTheme } from '../utils/theme';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    initTheme();
    const monitor = new Monitor();
    monitor.loadUrl(location.pathname);
    const handleRouteChange = (url) => {
      monitor.loadUrl(url);
    };
    Router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel='shortcut icon' href={'/static/favicon.ico'} />
        <link rel='icon' href={'/static/favicon.ico'} />
        <title>{getTitle('zzf')}</title>
        <meta
          name='keywords'
          content='前端博客,个人博客,javascript,vue,react,正则表达式,webpack,docker,zzfzzf,zzf,面试'
        />
        <meta name='description' content='zzf的个人网站,记录个人学习' />
        <meta name='theme-color' content='#ffffff' />
        <meta
          content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
          name='viewport'
        />
        <script async src={'//at.alicdn.com/t/font_2620815_cdup30hyyr6.js'} />
      </Head>
      <Layout direction={'column'} className={'min-h-screen'}>
        <Header />
        <Layout.Main className={'mt-2'}>
          <Component {...pageProps} />
        </Layout.Main>
        <Footer />
      </Layout>
    </>
  );
}

export default MyApp;
