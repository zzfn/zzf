import Header from '../components/Header';
import './globals.scss';
import Footer from '../components/Footer';
import { WebVitals } from './_components/WebVitals';
import type { Metadata } from 'next';
import React from 'react';
import { ThemeProvider } from "./InitTheme";
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


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      lang='zh'
      data-color-mode='auto'
      data-dark-theme='dark'
      data-light-theme='light'
    >
      <body className='container mx-auto px-3'>
        <WebVitals />
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
