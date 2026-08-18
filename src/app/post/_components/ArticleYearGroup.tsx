import dayjs from 'dayjs';
import Link from 'next/link';
import type { Article } from 'types/article';

interface ArticleYearGroupProps {
  year: string;
  articles: Article[];
}

export function ArticleYearGroup({ year, articles }: ArticleYearGroupProps) {
  return (
    <div className='bento-card p-6 sm:p-8'>
      <header className='flex items-center justify-between border-b border-border-muted/50 pb-4'>
        <div className='flex items-baseline gap-3'>
          <h3 className='text-fg-default text-2xl font-bold font-mono'>{year}</h3>
          <span className='text-fg-muted font-mono text-xs uppercase'>
            {articles.length} 篇存档
          </span>
        </div>
      </header>

      <div className='mt-5 space-y-2.5'>
        {articles.map((article: Article) => (
          <Link
            key={article.id}
            href={`/post/${article.id}`}
            className='group flex flex-col gap-2 rounded-xl border border-border-muted/50 bg-bg-muted/20 px-4 py-3.5 transition-all duration-150 hover:border-fg-accent/30 hover:bg-bg-muted/60 hover:translate-x-1 sm:flex-row sm:items-center sm:justify-between'
          >
            <div className='flex items-center gap-3'>
              <span className='text-fg-default group-hover:text-fg-accent text-sm font-medium transition-colors'>
                {article.title}
              </span>
            </div>

            <div className='text-fg-muted flex items-center gap-3 text-xs flex-shrink-0'>
              <span className='rounded-md border border-border-muted/60 bg-bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-fg-muted'>
                {article.tag}
              </span>
              <time className='font-mono tabular-nums text-fg-muted text-xs'>
                {dayjs(article.createdAt).format('MM-DD')}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
