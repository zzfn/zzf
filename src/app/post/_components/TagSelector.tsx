import Link from 'next/link';
import type { Article } from 'types/article';

interface TagSelectorProps {
  tags: string[];
  articles: Article[];
}

export function TagSelector({ tags, articles }: TagSelectorProps) {
  return (
    <section className='border-border-muted bg-bg-muted/40 rounded-3xl border p-8 shadow-sm backdrop-blur'>
      <header className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div className='space-y-1'>
          <span className='text-fg-muted font-mono text-xs tracking-[0.4em] uppercase'>Tags</span>
          <h2 className='text-fg-default text-xl font-semibold sm:text-2xl'>挑选一个主题</h2>
        </div>
        <span className='text-fg-muted text-xs'>
          {tags.length.toString().padStart(2, '0')} 个分类 · 精选排列
        </span>
      </header>

      <div className='mt-8 grid gap-3 sm:grid-cols-2'>
        {tags.map((tag: string) => (
          <Link
            key={tag}
            href={`/tag/${tag}`}
            className='border-border-muted hover:border-border-accent-emphasis hover:bg-bg-default/90 group bg-bg-default/70 flex items-center justify-between gap-4 rounded-full border px-4 py-3 text-sm backdrop-blur transition-all'
          >
            <span className='text-fg-default group-hover:text-fg-accent transition-colors'>
              {tag}
            </span>
            <span className='text-fg-muted font-mono text-xs'>
              {articles
                .filter((item) => item.tag === tag)
                .length.toString()
                .padStart(2, '0')}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
