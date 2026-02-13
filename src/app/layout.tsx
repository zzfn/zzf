import Header from '../components/Header';
import './tailwindcss.css';
import './globals.scss';
import Footer from '../components/Footer';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import classNames from 'classnames';
import Script from 'next/script';
import { ConfigProvider } from '@/components/ui';
import { JetBrains_Mono } from 'next/font/google';

// 优化字体加载：使用 next/font 优化 JetBrains Mono
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

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
        {/* 优化霞鹜文楷字体加载 */}
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
          'bg-bg-default',
          'transition-all',
          'duration-300',
          jetbrainsMono.variable,
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
