import Header from '../components/Header';
import './font.css'
import './globals.scss';
import Footer from '../components/Footer';
import { WebVitals } from './_components/WebVitals';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from './InitTheme';

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
      <body>
        <WebVitals />
        <ThemeProvider>
          <Header />
          <main className='container mx-auto px-3 pt-16'>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
