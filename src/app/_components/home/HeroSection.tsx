import Image from 'next/image';
import { GlassCard } from '@/components/ui';

type SiteConfig = {
  avatar: string;
  name: string;
  slug: string;
  [key: string]: unknown;
};

interface HeroSectionProps {
  config: SiteConfig;
}

export function HeroSection({ config }: HeroSectionProps) {
  return (
    <GlassCard
      showAnimation
      showGlow
      glowPosition="top-right"
      contentClassName="flex items-center gap-6 p-8 sm:gap-8 sm:p-10"
      className="mb-12"
    >
      {/* 头像 */}
      <div className='logo-spin-hover relative flex-shrink-0'>
        <div className='absolute inset-0 rounded-full bg-[color:var(--color-bg-accent-emphasis)] opacity-30 blur-2xl' />
        <Image
          priority={true}
          className='relative h-24 w-24 rounded-full object-cover ring-4 ring-[color:color-mix(in_srgb,var(--color-fg-accent)_30%,transparent)] ring-offset-2 ring-offset-[color:var(--color-bg-default)] transition-transform duration-500 group-hover:scale-110 md:h-32 md:w-32'
          width={128}
          height={128}
          alt='avatar'
          src={config.avatar}
        />
      </div>

      {/* 文字信息 */}
      <div className='flex min-w-0 flex-1 flex-col gap-y-3'>
        <h1 className='bg-gradient-to-r from-[color:var(--color-fg-accent)] to-[color:var(--color-fg-sponsors)] bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl'>
          {config.name}
        </h1>
        <p className='text-fg-muted w-fit overflow-hidden font-mono text-xs font-medium uppercase tracking-wider sm:text-sm'>
          {config.slug}
        </p>
      </div>
    </GlassCard>
  );
}
