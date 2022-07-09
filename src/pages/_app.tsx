import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Script from 'next/script';
import Head from 'next/head';
import '@zzf/design/dist/bundle.css';
import 'styles/globals.scss';
import 'tailwindcss/tailwind.css';
import 'highlight.js/styles/base16/railscasts.css';
import Header from 'components/layout/header';
import Footer from 'components/layout/footer';
import Right from 'components/layout/right';
import 'styles/markdown.scss';
import { Layout } from '@zzf/design';
import { getTitle } from '../utils/getTitle';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Monitor from '../utils/monitor';
import { Provider } from 'react-redux';
import { store } from 'store';

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  const monitor = new Monitor();
  monitor.loadUrl(location.pathname, metric);
}

function App({ Component, pageProps }: AppProps): JSX.Element {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Head>
          <link rel='shortcut icon' href='/static/favicon.ico' />
          <link rel='icon' href='/favicon.ico' />
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
        </Head>
        <Script async src='//at.alicdn.com/t/font_2620815_l30yg5g00kr.js' />
        <Layout className='min-h-screen'>
          <Layout.Header className='container'>
            <Header />
          </Layout.Header>
          <Layout.Content className='container'>
            <Layout.Right>
              <Right />
              {/*<Nav source={serverProps.content} />*/}
            </Layout.Right>
            <Layout.Center>
              <Component {...pageProps} />
            </Layout.Center>
          </Layout.Content>
          <Layout.Footer className='container'>
            <Footer />
          </Layout.Footer>
        </Layout>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
