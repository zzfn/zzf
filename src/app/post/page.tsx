import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { fetchData } from '../../services/api';
import type { Article } from 'types/article';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Post',
};

async function getData() {
  return fetchData<Array<Article>>({
    endpoint: '/v1/articles',
    fetchParams: {
      next: {
        tags: ['article'],
      },
    },
  });
}

function groupByYear(array: Array<Article>) {
  return array.reduce((acc: Record<string, Array<Article>>, obj) => {
    // 获取当前对象的 createAt 属性值
    let createdAt = new Date(obj.createdAt);
    // 提取年份
    let year = createdAt.getFullYear();
    // 如果当前年份在 acc 中不存在，则创建一个数组来存储该年份的对象
    if (!acc[year]) {
      acc[year] = [];
    }
    // 将当前对象添加到对应年份的数组中
    acc[year].push(obj);
    return acc;
  }, {});
}

export default async function Page() {
  const data = await getData();
  const uniqueTags = [...new Set(data.map((item) => item.tag))];
  const groupedArticles = Object.entries(groupByYear(data)).sort(
    (a, b) => Number(b[0]) - Number(a[0]),
  );

  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-12 px-6 pb-16 pt-12'>
      <section className='relative overflow-hidden rounded-3xl border border-border-muted bg-bg-default/90 p-10 shadow-xl backdrop-blur'>
        <div className='pointer-events-none absolute inset-0'>
          <div className='bg-bg-accent/20 absolute -left-16 top-10 h-40 w-40 rounded-full blur-3xl' />
          <div className='bg-bg-accent/10 absolute bottom-0 right-0 h-32 w-32 rounded-full blur-2xl' />
        </div>

        <div className='relative flex flex-col gap-8'>
          <div className='space-y-4'>
            <span className='text-muted font-mono text-xs uppercase tracking-[0.35em]'>
              Post Archive
            </span>
            <h1 className='text-default text-3xl font-semibold leading-tight sm:text-4xl'>
              灵感陈列室
            </h1>
            <p className='text-muted max-w-2xl text-sm leading-relaxed'>
              以轻盈的节奏回顾过往作品，像翻阅一册光滑的相册。挑选一个主题，或按照年份慢慢品读。
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-6 text-sm'>
            <div className='flex items-center gap-2 text-default'>
              <span className='bg-bg-success-muted h-2 w-2 animate-pulse rounded-full'></span>
              <span className='font-medium'>
                {data.length.toString().padStart(3, '0')} 篇文章已上架
              </span>
            </div>
            <div className='flex items-center gap-2 text-muted'>
              <span className='font-mono text-xs uppercase tracking-[0.35em]'>
                {uniqueTags.length.toString().padStart(2, '0')}
              </span>
              <span>个主题标签</span>
            </div>
          </div>
        </div>
      </section>

      <section className='rounded-3xl border border-border-muted bg-bg-muted/40 p-8 shadow-sm backdrop-blur'>
        <header className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
          <div className='space-y-1'>
            <span className='text-muted font-mono text-xs uppercase tracking-[0.4em]'>
              Tags
            </span>
            <h2 className='text-default text-xl font-semibold sm:text-2xl'>挑选一个主题</h2>
          </div>
          <span className='text-muted text-xs'>
            {uniqueTags.length.toString().padStart(2, '0')} 个分类 · 精选排列
          </span>
        </header>

        <div className='mt-8 grid gap-3 sm:grid-cols-2'>
          {uniqueTags.map((tag: string) => (
            <Link
              key={tag}
              href={`/tag/${tag}`}
              className='border-border-muted hover:border-border-accent hover:bg-bg-default/90 group flex items-center justify-between gap-4 rounded-full border bg-bg-default/70 px-4 py-3 text-sm transition-all backdrop-blur'
            >
              <span className='text-default transition-colors group-hover:text-accent'>
                {tag}
              </span>
              <span className='text-muted font-mono text-xs'>
                {data
                  .filter((item) => item.tag === tag)
                  .length.toString()
                  .padStart(2, '0')}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {data.length > 0 && (
        <section className='flex flex-col gap-10'>
          {groupedArticles.map(([year, articles]: [string, Article[]]) => (
            <div
              key={year}
              className='rounded-3xl border border-border-muted bg-bg-default/80 p-8 shadow-sm backdrop-blur'
            >
              <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex items-baseline gap-3'>
                  <h3 className='text-default text-2xl font-semibold sm:text-3xl'>{year}</h3>
                  <span className='text-muted font-mono text-xs uppercase tracking-[0.35em]'>
                    {articles.length.toString().padStart(2, '0')} entries
                  </span>
                </div>
                <div className='border-border-muted bg-bg-muted/60 flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted'>
                  <span className='font-mono uppercase tracking-[0.3em]'>Archive</span>
                </div>
              </header>

              <div className='mt-6 space-y-3'>
                {articles.map((article: Article) => (
                  <Link
                    key={article.id}
                    href={`/post/${article.id}`}
                    className='border-border-muted hover:border-border-accent hover:bg-bg-default/95 group flex flex-col gap-3 rounded-2xl border px-5 py-4 transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between'
                  >
                    <div className='flex flex-col gap-2'>
                      <span className='text-default text-base font-medium transition-colors group-hover:text-accent'>
                        {article.title}
                      </span>
                      <div className='text-muted flex flex-wrap items-center gap-3 text-xs'>
                        <span className='font-mono uppercase tracking-[0.3em]'>{article.tag}</span>
                        <time className='font-mono tabular-nums'>
                          {dayjs(article.createdAt).format('MM-DD')}
                        </time>
                      </div>
                    </div>

                    {dayjs().diff(article.createdAt, 'day') < 7 && (
                      <span className='bg-bg-success-muted text-default shrink-0 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.2em]'>
                        New
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
