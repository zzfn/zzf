import dayjs from 'dayjs';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import OnlineCount from '@/components/metrics/OnlineCount';
import ThemeClient from './ThemeClient';

const Footer = () => {
  const footerSurface = {
    '--footer-surface': 'color-mix(in srgb, var(--bgColor-default) 82%, transparent)',
    '--footer-divider': 'color-mix(in srgb, var(--borderColor-muted) 70%, transparent)',
    '--footer-shadow':
      '0 28px 42px -36px color-mix(in srgb, var(--fgColor-default) 30%, transparent)',
  } as CSSProperties;

  return (
    <footer
      style={footerSurface}
      className='relative mt-auto border-t border-[color:var(--footer-divider)] bg-[color:var(--footer-surface)] backdrop-blur-md'
    >
      <div className='mx-auto flex max-w-6xl flex-col gap-0 px-6 sm:px-8'>
        <div className='grid grid-cols-1 gap-12 py-10 md:grid-cols-3 md:gap-8 md:py-12'>
          <div>
            <h3 className='text-fg-default mb-4 text-xs font-semibold tracking-widest uppercase'>
              快速导航
            </h3>
            <nav className='flex flex-col gap-3'>
              <Link
                className='text-fg-muted hover:text-fg-default text-sm transition-colors'
                href='/api/feed.xml'
              >
                RSS feed
              </Link>
              <Link
                className='text-fg-muted hover:text-fg-default text-sm transition-colors'
                href='/about'
              >
                关于
              </Link>
              <Link
                className='text-fg-muted hover:text-fg-default text-sm transition-colors'
                target='_blank'
                href='https://uptime.zzfzzf.com/status/m'
              >
                服务状态
              </Link>
              <Link
                className='text-fg-muted hover:text-fg-default text-sm transition-colors'
                target='_blank'
                href='https://m.zzfzzf.com/share/YjgfEi1urh7EmU6i/zzfzzf.com'
              >
                访问统计
              </Link>
            </nav>
          </div>

          <div>
            <h3 className='text-fg-default mb-4 text-xs font-semibold tracking-widest uppercase'>
              站点信息
            </h3>
            <div className='text-fg-muted flex flex-col gap-3 text-sm'>
              <div className='flex items-center gap-3'>
                <OnlineCount />
              </div>
              <div>&copy; 2020-{dayjs().format('YYYY')}</div>
              <a
                className='hover:text-fg-default transition-colors'
                rel='noreferrer'
                target='_blank'
                href='https://beian.miit.gov.cn'
              >
                苏ICP备18059856号
              </a>
            </div>
          </div>

          <div>
            <h3 className='text-fg-default mb-4 text-xs font-semibold tracking-widest uppercase'>
              技术栈
            </h3>
            <div className='text-fg-muted flex flex-col gap-3 text-sm'>
              <div>Next.js</div>
              <div>Tailwind CSS</div>
              <div>TypeScript</div>
              <div className='pt-2'>
                <ThemeClient />
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-[color:var(--footer-divider)] py-6 text-center'>
          <div className='text-fg-muted text-xs'>
            Built with Next.js · Tailwind CSS · {dayjs().format('YYYY')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
