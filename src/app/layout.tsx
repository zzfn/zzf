import Header from '../components/Header';
import './globals.scss';
import Footer from '../components/Footer';
import { WebVitals } from './_components/WebVitals';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from './InitTheme';
import localFont from 'next/font/local'
const myFont = localFont({ src: './LXGWWenKaiScreen.woff2',variable:'--font-lxgw' })
myFont
export const metadata: Metadata = {
  title: 'ccw.奇趣生活实验室',
  description: 'ccw的个人网站,记录个人学习',
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
    'ccw',
    '面试',
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={myFont.variable}
      suppressHydrationWarning
      lang='zh'
      data-color-mode='auto'
      data-dark-theme='dark'
      data-light-theme='light'
    >
      <body>
        <WebVitals />
        <ThemeProvider>
          <Header />
          <main className='container mx-auto px-3'>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
