interface PostArchiveHeaderProps {
  totalPosts: number;
  totalTags: number;
}

export function PostArchiveHeader({ totalPosts, totalTags }: PostArchiveHeaderProps) {
  return (
    <section className='bento-card relative overflow-hidden p-8 sm:p-10'>
      {/* 渐变氛围微光 */}
      <div className='pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-purple-500/10 via-teal-500/10 to-transparent blur-2xl dark:from-purple-500/20' />

      <div className='relative flex flex-col gap-6'>
        <div className='space-y-3'>
          <div className='inline-flex items-center gap-2 rounded-full border border-border-muted/70 bg-bg-muted/40 px-2.5 py-0.5 text-[11px] font-mono text-fg-muted uppercase tracking-wider w-fit'>
            <span>Post Archive</span>
          </div>
          <h1 className='text-fg-default text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl'>
            灵感陈列室 · 知识库归档
          </h1>
          <p className='text-fg-muted max-w-2xl text-xs sm:text-sm leading-relaxed'>
            以轻盈的节奏回顾过往思考与技术实践。挑选一个主题，或按时间流线慢慢品读。
          </p>
        </div>

        <div className='flex flex-wrap items-center gap-6 border-t border-border-muted/40 pt-4 text-xs font-medium'>
          <div className='text-fg-default flex items-center gap-2'>
            <span className='h-2 w-2 animate-pulse rounded-full bg-emerald-500'></span>
            <span>
              <span className='font-mono font-semibold'>{totalPosts}</span> 篇深度文章
            </span>
          </div>
          <div className='text-fg-muted flex items-center gap-1.5'>
            <span>分类索引：</span>
            <span className='font-mono font-semibold text-fg-default'>{totalTags}</span>
            <span>个主题标签</span>
          </div>
        </div>
      </div>
    </section>
  );
}
