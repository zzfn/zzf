import Link from 'next/link';
import { GlassCard } from '@/components/ui';

interface ExploreMoreCTAProps {
  animationDelay: number;
}

export function ExploreMoreCTA({ animationDelay }: ExploreMoreCTAProps) {
  return (
    <Link href='/post'>
      <GlassCard
        showAnimation
        animationDelay={animationDelay}
        gradientFrom="from-[color:color-mix(in_srgb,var(--color-bg-accent-emphasis)_20%,transparent)]"
        gradientTo="to-[color:color-mix(in_srgb,var(--color-bg-accent)_15%,transparent)]"
        contentClassName="px-10 py-6 text-center ring-border-accent-muted"
      >
        {/* 旋转光效 */}
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
          <div className='h-[200%] w-[200%] animate-spin bg-[conic-gradient(from_180deg,color-mix(in_srgb,var(--color-bg-accent)_30%,transparent),color-mix(in_srgb,var(--color-bg-accent-emphasis)_40%,transparent),transparent_60%)] blur-2xl' style={{ animationDuration: '3s' }}></div>
        </div>

        <div className='relative'>
          <span className='text-fg-accent flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider'>
            <span>探索更多</span>
            <svg
              className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2.5}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
            </svg>
          </span>
        </div>
      </GlassCard>
    </Link>
  );
}
