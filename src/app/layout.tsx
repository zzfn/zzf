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
      </head>
      <body className={classNames('min-h-screen', 'flex', 'flex-col')}>
        <WebVitals />
        <ConfigProvider
          value={{
            prefix: 'cw',
          }}
        >
          <ThemeProvider>
            <Header />
            <main className='container mx-auto grow px-3 pt-16'>{children}</main>
            <Footer />
          </ThemeProvider>
        </ConfigProvider>
      </body>
      <GoogleAnalytics gaId='G-GBJ2W80K7N' />
    </html>
  );
}
