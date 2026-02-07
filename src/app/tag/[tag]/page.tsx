import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { fetchData } from '../../../services/api';
import type { Article } from 'types/article';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '标签',
};

async function getData(tag: string) {
  return fetchData<Array<Article>>({
    endpoint: '/v1/articles',
    queryParams: {
      tag: decodeURIComponent(tag),
    },
    fetchParams: {
      next: {
        tags: ['article'],
      },
    },
  });
}

function groupByYear(array: Array<Article>) {
  return array.reduce((acc: Record<string, Array<Article>>, obj) => {
    const createdAt = new Date(obj.createdAt);
    const year = createdAt.getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(obj);
    return acc;
  }, {});
}

export default async function Page(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params;
  const data = await getData(params.tag);

  return (
    <div className='bg-bg-default min-h-screen'>
      <div className='mx-auto max-w-3xl px-6 py-16'>
        {/* 头部区域 */}
        <div className='border-jan-ink bg-bg-default mb-12 rounded-3xl border-2 p-10 shadow-[3px_3px_0_var(--color-jan-ink)]'>
          <div className='text-center'>
            <div className='relative mb-6 inline-flex'>
              <div className='border-border-muted bg-bg-muted flex h-16 w-16 items-center justify-center rounded-3xl border'>
                <span className='text-fg-default text-2xl font-semibold'>#</span>
              </div>
            </div>

            <h1 className='text-fg-default text-4xl font-semibold tracking-tight'>
              {decodeURIComponent(params.tag)}
            </h1>
            <p className='text-fg-muted mt-3 text-sm font-medium'>{data.length} 篇文章</p>
          </div>
        </div>

        {/* 文章列表区域 */}
        {data.length > 0 ? (
          <div className='space-y-6'>
            {Object.entries(groupByYear(data))
              .reverse()
              .map(([year, articles]: [string, Article[]]) => (
                <div
                  key={year}
                  className='border-jan-ink bg-bg-default rounded-3xl border-2 shadow-[3px_3px_0_var(--color-jan-ink)]'
                >
                  {/* 年份标题 */}
                  <div className='border-border-muted border-b px-8 py-6'>
                    <div className='flex items-center justify-between'>
                      <h2 className='text-fg-default text-xl font-semibold tracking-tight'>
                        {year}
                      </h2>
                      <span className='border-border-muted text-fg-muted flex h-8 min-w-[2rem] items-center justify-center rounded-full border px-3 text-sm font-medium'>
                        {articles.length}
                      </span>
                    </div>
                  </div>

                  {/* 文章列表 */}
                  <div className='divide-border-muted divide-y'>
                    {articles.map((article: Article) => (
                      <Link
                        key={article.id}
                        href={`/post/${article.id}`}
                        className='group/item hover:bg-bg-muted relative flex items-center justify-between px-8 py-5 transition-all duration-200 ease-out hover:-translate-y-0.5'
                      >
                        <div className='min-w-0 flex-1'>
                          <h3 className='text-fg-default group-hover/item:text-fg-accent truncate text-base font-medium transition-colors duration-200'>
                            {article.title}
                          </h3>
                          <p className='text-fg-muted mt-1.5 text-sm'>
                            {dayjs(article.createdAt).format('YYYY年M月D日')}
                          </p>
                        </div>

                        <div className='ml-4 flex-shrink-0 opacity-0 transition-all duration-200 group-hover/item:-translate-y-0.5 group-hover/item:opacity-100'>
                          <svg
                            className='text-fg-muted h-5 w-5'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          /* 空状态 */
          <div className='border-jan-ink bg-bg-default rounded-3xl border-2 p-20 text-center shadow-[3px_3px_0_var(--color-jan-ink)]'>
            <div className='border-border-muted bg-bg-muted relative mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl border'>
              <svg
                className='text-fg-muted h-10 w-10'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z'
                />
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 6h.008v.008H6V6z' />
              </svg>
            </div>
            <h3 className='text-fg-default text-xl font-semibold'>暂无文章</h3>
            <p className='text-fg-muted mt-2 text-sm'>这个标签下还没有任何文章</p>
          </div>
        )}
      </div>
    </div>
  );
}
