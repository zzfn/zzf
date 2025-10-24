interface PostArchiveHeaderProps {
  totalPosts: number;
  totalTags: number;
}

export function PostArchiveHeader({ totalPosts, totalTags }: PostArchiveHeaderProps) {
  return (
    <section className='border-border-muted bg-bg-default/90 relative overflow-hidden rounded-3xl border p-10 shadow-xl backdrop-blur'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='bg-bg-accent/20 absolute top-10 -left-16 h-40 w-40 rounded-full blur-3xl' />
        <div className='bg-bg-accent/10 absolute right-0 bottom-0 h-32 w-32 rounded-full blur-2xl' />
      </div>

      <div className='relative flex flex-col gap-8'>
        <div className='space-y-4'>
          <span className='text-fg-muted font-mono text-xs tracking-[0.35em] uppercase'>
            Post Archive
          </span>
          <h1 className='text-fg-default text-3xl leading-tight font-semibold sm:text-4xl'>
            灵感陈列室
          </h1>
          <p className='text-fg-muted max-w-2xl text-sm leading-relaxed'>
            以轻盈的节奏回顾过往作品，像翻阅一册光滑的相册。挑选一个主题，或按照年份慢慢品读。
          </p>
        </div>

        <div className='flex flex-wrap items-center gap-6 text-sm'>
          <div className='text-fg-default flex items-center gap-2'>
            <span className='bg-bg-success-muted h-2 w-2 animate-pulse rounded-full'></span>
            <span className='font-medium'>
              {totalPosts.toString().padStart(3, '0')} 篇文章已上架
            </span>
          </div>
          <div className='text-fg-muted flex items-center gap-2'>
            <span className='font-mono text-xs tracking-[0.35em] uppercase'>
              {totalTags.toString().padStart(2, '0')}
            </span>
            <span>个主题标签</span>
          </div>
        </div>
      </div>
    </section>
  );
}
