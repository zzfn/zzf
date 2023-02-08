import type { ReactElement, ReactNode } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Script from 'next/script';
import Head from 'next/head';
import '@oc/design/dist/bundle.min.css';
import 'styles/globals.scss';
import 'tailwindcss/tailwind.css';
import 'highlight.js/styles/base16/railscasts.css';
import 'styles/markdown.scss';
import { getTitle } from '../utils/getTitle';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Monitor from '../utils/monitor';
import { Provider } from 'react-redux';
import { store } from 'store';
import DefaultLayout from 'layout/DefaultLayout';
import type { NextPage } from 'next';
import { useEffect, useState } from "react";
import ErrorBoundary from '../components/ErrorBoundary';

const monitor = new Monitor();

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  monitor.loadUrl(location.pathname, metric);
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const [queryClient] = useState(() => new QueryClient())
  const handleWindowResize = () => {
    const width = window.innerWidth;
    const isMobile = width < 768;
    store.dispatch({
      type: 'screen/updateScreen',
      payload: {
        isMobile,
        isDesktop: !isMobile,
      },
    });
  };
  const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);
  useEffect(() => {
    window.addEventListener('unhandledrejection', (e) => {
      console.log(e);
    });
    window.onerror = function (message, source, lineno, colno, error) {
      console.log(222, message, source, lineno, colno, error);
    };
    window.addEventListener(
      'error',
      function (e) {
        const target = e.target;
        if (target instanceof HTMLLinkElement) {
          console.log(`资源加载失败${target.href}`);
        } else if (target instanceof HTMLImageElement) {
          console.log(`图片资源加载失败${target.src}`);
        } else if (target instanceof HTMLScriptElement) {
          console.log(`资源加载失败${target.src}`);
        }
      },
      true,
    );
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    const localVisitor = localStorage.getItem('visitor');
    if (localVisitor) {
      const visitor = JSON.parse(localVisitor);
      store.dispatch({ type: 'user/updateUserId', payload: visitor.visitorId });
    }
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <Head>
              <link rel='icon' href='/favicon.ico' />
              <title>{getTitle('zzf')}</title>
              <meta
                name='Keywords'
                content='前端博客,个人博客,javascript,vue,react,正则表达式,webpack,docker,zzfzzf,zzf,面试'
              />
              <meta name='Description' content='zzf的个人网站,记录个人学习' />
              <meta name='theme-color' content='#ffffff' />
              <meta
                name='viewport'
                content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
              />
              <meta name='applicable-device' content='pc,mobile' />
              <meta name='Copyright' content='OrLuna' />
              <meta name='Author' content='OrLuna' />
              <meta name='Designer' content='OrLuna' />
            </Head>
            <Script
              async
              src='//lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_15898_9.d18a72d2265c43124cfd146c29831a69.js'
            />

            {getLayout(<Component {...pageProps} />)}
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
