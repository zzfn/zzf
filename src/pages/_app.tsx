import type { ReactElement, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import 'styles/globals.scss';
import 'tailwindcss/tailwind.css';
import { getTitle } from '../utils/getTitle';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Monitor from '../utils/monitor';
import { Provider } from 'react-redux';
import { store } from 'store';
import DefaultLayout from 'layout/DefaultLayout';
import type { NextPage } from 'next';
import ErrorBoundary from '../components/ErrorBoundary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
  const [queryClient] = useState(() => new QueryClient());
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
    const visitorId = localStorage.getItem('visitorId');
    if (visitorId) {
      store.dispatch({ type: 'user/updateUserId', payload: visitorId });
    }
  }, []);
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {/*<ReactQueryDevtools initialIsOpen={false} />*/}
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
              <meta name='Copyright' content='oc' />
              <meta name='Author' content='oc' />
              <meta name='Designer' content='oc' />
            </Head>
            {getLayout(<Component {...pageProps} />)}
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
