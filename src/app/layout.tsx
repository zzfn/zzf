import Header from '../components/Header';
import './tailwindcss.css';
import './globals.scss';
import Footer from '../components/Footer';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import classNames from 'classnames';
import { ConfigProvider } from '@oc/design';
import Script from 'next/script';
import '@oc/design/dist/styles/index.css';

export const metadata: Metadata = {
  title: {
    template: '%s | 奇趣生活实验室',
    default: 'Krupp',
  },

  description: 'krupp的个人网站,记录个人学习',
  keywords: [
    '前端博客',
    '个人博客',
    'javascript',
    'vue',
    'react',
    '正则表达式',
    'webpack',
    'docker',
    'zzfzzf',
    'zzf',
    'krupp',
    '面试',
  ],
};

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      lang='zh'
      data-color-mode='auto'
      data-dark-theme='dark'
      data-light-theme='light'
    >
      <head>
        <link rel='stylesheet' href='https://cdn.zzfzzf.com/lxgw/font.css' />
        <link rel='icon' href='/icon?<generated>' type='image/png' sizes='32x32' />
        <Script
          data-website-id='dd58bedd-dc7b-48ab-a7c0-adfffc6cd47f'
          src='https://m.zzfzzf.com/script.js'
        ></Script>
      </head>
      <body
        className={classNames(
          'min-h-screen',
          'flex',
          'flex-col',
          'bg-default',
          'transition-all',
          'duration-300',
        )}
      >
        <ThemeProvider attribute='data-color-mode'>
          <ConfigProvider
            value={{
              prefix: 'cw',
            }}
          >
            <Header />
            <main className='relative container mx-auto grow px-4 pt-20 pb-12 md:px-6'>
              <div className='relative space-y-8'>{children}</div>
            </main>
            <Footer />
          </ConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
export default RootLayout;
