import Header from '../components/Header';
import './globals.scss';
import Footer from '../components/Footer';
import { WebVitals } from './_components/WebVitals';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { ThemeProvider } from './InitTheme';
import classNames from 'classnames';
import { ConfigProvider } from '@oc/design';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
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

export default function RootLayout({ children }: { children: ReactNode }) {
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
          src='https://m.ccw.es/script.js'
        ></Script>
      </head>
      <body
        className={classNames(
          'min-h-screen',
          'flex',
          'flex-col',
          'bg-gradient-to-br',
          'from-gray-50',
          'to-white',
          'dark:from-gray-900',
          'dark:to-gray-800',
          'transition-colors',
          'duration-300',
        )}
      >
        <WebVitals />
        <ConfigProvider
          value={{
            prefix: 'cw',
          }}
        >
          <ThemeProvider>
            <div className='relative'>
              {/* 背景装饰 */}
              <div className='fixed inset-0 -z-10 overflow-hidden'>
                <div className='absolute -left-1/2 -top-1/2 h-full w-full rotate-12 transform bg-gradient-to-r from-purple-100/30 to-pink-100/30 blur-3xl dark:from-purple-900/10 dark:to-pink-900/10' />
                <div className='absolute -bottom-1/2 -right-1/2 h-full w-full -rotate-12 transform bg-gradient-to-l from-blue-100/30 to-green-100/30 blur-3xl dark:from-blue-900/10 dark:to-green-900/10' />
              </div>

              <Header />
              <main className='container relative mx-auto grow px-4 pb-12 pt-20 md:px-6'>
                <div className='rounded-2xl bg-white/50 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-900/50'>
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </ConfigProvider>
      </body>
      <GoogleAnalytics gaId='G-GBJ2W80K7N' />
    </html>
  );
}
