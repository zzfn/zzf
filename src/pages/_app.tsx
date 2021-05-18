import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import Head from 'next/head';
import '@zzf/design/lib/bundle.css';
import 'styles/variable.scss';
import 'styles/globals.scss';
import 'styles/response.scss';
import 'styles/markdown.scss';
import 'styles/color.scss';
import 'highlight.js/styles/rainbow.css';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import { Layout } from '@zzf/design';

Sentry.init({
  dsn: 'https://c7a126d3178a433a878806d0b87e75cb@o656558.ingest.sentry.io/5762761',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const m = localStorage.getItem('mode');
    if (m) {
      document.body.className = m;
    } else {
      document.body.className = 'system';
    }
  }, []);
  return (
    <>
      <Head>
        <title>zzf</title>
        <meta
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
          name='viewport'
        />
      </Head>
      <Layout>
        <Header />
        <Layout.Main>
          <Component {...pageProps} />
        </Layout.Main>
        <Footer />
      </Layout>
    </>
  );
}

export default MyApp;
