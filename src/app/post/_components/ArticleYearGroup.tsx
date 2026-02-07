import dayjs from 'dayjs';
import Link from 'next/link';
import type { Article } from 'types/article';

interface ArticleYearGroupProps {
  year: string;
  articles: Article[];
}

export function ArticleYearGroup({ year, articles }: ArticleYearGroupProps) {
  return (
    <div className='border-border-muted bg-bg-default rounded-xl border p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)]'>
      <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-baseline gap-3'>
          <h3 className='text-fg-default text-2xl font-semibold sm:text-3xl'>{year}</h3>
          <span className='text-fg-muted font-mono text-xs tracking-[0.35em] uppercase'>
            {articles.length.toString().padStart(2, '0')} entries
          </span>
        </div>
        <div className='border-border-muted bg-bg-muted text-fg-muted flex items-center gap-2 rounded-full border px-3 py-1 text-xs'>
          <span className='font-mono tracking-[0.3em] uppercase'>Archive</span>
        </div>
      </header>

      <div className='mt-6 space-y-3'>
        {articles.map((article: Article) => (
          <Link
            key={article.id}
            href={`/post/${article.id}`}
            className='group border-border-muted hover:border-border-default flex flex-col gap-3 rounded-lg border px-5 py-4 transition-all duration-[160ms] ease-out hover:translate-x-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center sm:justify-between'
          >
            <div className='flex flex-col gap-2'>
              <span className='text-fg-default group-hover:text-fg-accent text-base font-medium transition-colors duration-[160ms]'>
                {article.title}
              </span>
              <div className='text-fg-muted flex flex-wrap items-center gap-3 text-xs'>
                <span className='font-mono tracking-[0.3em] uppercase'>{article.tag}</span>
                <time className='font-mono tabular-nums'>
                  {dayjs(article.createdAt).format('MM-DD')}
                </time>
              </div>
            </div>

            {dayjs().diff(article.createdAt, 'day') < 7 && (
              <span className='bg-bg-success-muted text-fg-default shrink-0 rounded-full px-3 py-1 text-xs font-medium tracking-[0.2em] uppercase'>
                New
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
