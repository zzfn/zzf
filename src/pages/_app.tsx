import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import '@zzf/design/dist/bundle.css';
import 'styles/globals.scss';
import '@primer/css/base/modes-v2.scss';
import '@primer/css/utilities/colors.scss';
import '@primer/css/markdown/index.scss';
import 'highlight.js/styles/rainbow.css';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import { Layout } from '@zzf/design';
import { getTitle } from '../utils/getTitle';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import Monitor from '../utils/monitor';

const monitor = new Monitor();

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    monitor.loadUrl(location.pathname, true);
    const handleRouteChange = (url) => {
      monitor.loadUrl(url, false);
    };

    Router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);
  const [metric, setMetric] = useState<metricType>({ LCP: 0, FID: 0, FCP: 0, CLS: 0 });
  useEffect(() => {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntriesByName('first-contentful-paint')) {
        setMetric({ ...metric, FCP: Math.floor(entry.startTime) });
      }
    }).observe({ type: 'paint', buffered: true });
    const mode = localStorage.getItem('data-color-mode');
    const light = localStorage.getItem('data-light-theme');
    const dark = localStorage.getItem('data-dark-theme');
    mode && document.querySelector('html').setAttribute('data-color-mode', mode);
    light && document.querySelector('html').setAttribute('data-light-theme', light);
    dark && document.querySelector('html').setAttribute('data-dark-theme', dark);
  }, []);
  return (
    <>
      <Head>
        <title>{getTitle('zzf')}</title>
        <meta
          content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
          name='viewport'
        />
      </Head>
      <Layout direction={'column'} className={'min-h-screen'}>
        <Header />
        <Layout.Main className={'mt-2'}>
          <Component metric={metric} {...pageProps} />
        </Layout.Main>
        <Footer />
      </Layout>
    </>
  );
}

export default MyApp;
