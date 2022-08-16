import type { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Script from 'next/script';
import Head from 'next/head';
import '@dekopon/design/dist/bundle.min.css';
import 'styles/globals.scss';
import 'tailwindcss/tailwind.css';
import 'highlight.js/styles/base16/railscasts.css';
import 'styles/markdown.scss';
import { getTitle } from '../utils/getTitle';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Monitor from '../utils/monitor';
import { Provider } from 'react-redux';
import { store } from 'store';
import DefaultLayout from 'components/layout/DefaultLayout';
import type { NextPage } from 'next';
import { useEffect } from 'react';

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  const monitor = new Monitor();
  monitor.loadUrl(location.pathname, metric);
}
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const queryClient = new QueryClient();
function App({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);
  useEffect(() => {
    store.dispatch.user.updateUserInfo();
  }, []);
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
        <Script
          async
          src='//lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_15898_7.cacd88ad47f8dfc12019cda79a188b9d.js'
        />
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
