import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import Head from 'next/head';
import '@zzf/design/lib/bundle.css';
import '@zzf/design/lib/style/response-theme.scss';
import 'styles/globals.scss';
import 'styles/markdown.scss';
import 'highlight.js/styles/rainbow.css';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import { Layout } from '@zzf/design';
import { getTitle } from '../utils/getTitle';

Sentry.init({
  dsn: 'https://c7a126d3178a433a878806d0b87e75cb@o656558.ingest.sentry.io/5762761',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

function MyApp({ Component, pageProps }: any): JSX.Element {
  useEffect(() => {
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
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=5.0' name='viewport' />
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
