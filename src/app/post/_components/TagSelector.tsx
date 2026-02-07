import Link from 'next/link';
import type { Article } from 'types/article';

interface TagSelectorProps {
  tags: string[];
  articles: Article[];
}

export function TagSelector({ tags, articles }: TagSelectorProps) {
  return (
    <section className='border-jan-ink bg-bg-default rounded-3xl border-2 p-8 shadow-[3px_3px_0_var(--color-jan-ink)]'>
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
            className='group border-border-muted bg-bg-default hover:border-border-default flex items-center justify-between gap-4 rounded-full border px-4 py-3 text-sm transition-all duration-200 ease-out hover:-translate-y-0.5'
          >
            <span className='text-fg-default group-hover:text-fg-accent transition-colors duration-200'>
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
