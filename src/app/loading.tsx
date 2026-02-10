import { ArticleListSkeleton } from '@/components/ui/ArticleCardSkeleton';

export default function Loading() {
  return (
    <div className='mx-auto max-w-3xl px-4 py-10 sm:py-12'>
      {/* Hero 区域骨架 */}
      <div className='mb-12 flex items-center gap-6'>
        <div className='border-border-muted bg-bg-muted relative h-20 w-20 animate-pulse overflow-hidden rounded-3xl border-2' />
        <div className='space-y-3'>
          <div className='bg-border-muted h-8 w-48 animate-pulse rounded-lg' />
          <div className='bg-border-muted h-4 w-64 animate-pulse rounded' />
        </div>
      </div>

      {/* 活动区域骨架 */}
      <div className='mb-12'>
        <div className='bg-border-muted mb-4 h-6 w-32 animate-pulse rounded-lg' />
        <div className='space-y-2'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='bg-border-muted h-10 w-full animate-pulse rounded-xl' />
          ))}
        </div>
      </div>

      {/* 文章卡片骨架 */}
      <ArticleListSkeleton count={6} />
    </div>
  );
}
