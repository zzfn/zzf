import Link from 'next/link';
import type { Article } from 'types/article';

interface TagSelectorProps {
  tags: string[];
  articles: Article[];
}

export function TagSelector({ tags, articles }: TagSelectorProps) {
  return (
    <section className='bento-card p-6 sm:p-8'>
      <header className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border-muted/50 pb-4'>
        <div>
          <span className='text-fg-muted font-mono text-[11px] uppercase tracking-wider'>Tags Taxonomy</span>
          <h2 className='text-fg-default text-lg font-bold sm:text-xl'>主题分类</h2>
        </div>
        <span className='text-fg-muted text-xs font-mono'>
          {tags.length} 个分类 · 精选收录
        </span>
      </header>

      <div className='mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4'>
        {tags.map((tag: string) => {
          const count = articles.filter((item) => item.tag === tag).length;
          return (
            <Link
              key={tag}
              href={`/tag/${tag}`}
              className='group flex items-center justify-between rounded-xl border border-border-muted/60 bg-bg-muted/30 px-3.5 py-2.5 text-xs transition-all duration-150 hover:border-fg-accent/40 hover:bg-bg-muted/70 hover:translate-y-[-1px]'
            >
              <span className='text-fg-default group-hover:text-fg-accent font-medium transition-colors'>
                #{tag}
              </span>
              <span className='rounded-md bg-bg-muted/80 px-1.5 py-0.5 font-mono text-[10px] text-fg-muted'>
                {count}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
