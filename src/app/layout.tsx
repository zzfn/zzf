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
          'bg-default',
          'transition-all',
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
              {/* 可选的渐变叠加 */}
              <div className='from-accent-emphasis/5 fixed inset-0 -z-10 bg-gradient-to-b to-transparent'></div>

              <Header />
              <main className='container relative mx-auto grow px-4 pb-12 pt-20 md:px-6'>
                <div className='relative space-y-8'>{children}</div>
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
