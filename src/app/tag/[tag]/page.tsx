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
        {/* 头部区域 - 苹果风格 */}
        <div className='mb-12'>
          <div className='bg-bg-white rounded-3xl p-8 shadow-sm ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-black)_5%,transparent)]'>
            <div className='text-center'>
              <div className='bg-bg-accent-emphasis mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl'>
                <span className='text-fg-onEmphasis text-lg font-semibold'>#</span>
              </div>
              <h1 className='text-fg-default text-3xl font-semibold'>
                {decodeURIComponent(params.tag)}
              </h1>
              <p className='text-fg-muted mt-2 text-sm'>{data.length} 篇文章</p>
            </div>
          </div>
        </div>

        {/* 文章列表区域 - 苹果卡片风格 */}
        {data.length > 0 ? (
          <div className='space-y-8'>
            {Object.entries(groupByYear(data))
              .reverse()
              .map(([year, articles]: [string, Article[]]) => (
                <div
                  key={year}
                  className='bg-bg-white rounded-3xl shadow-sm ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-black)_5%,transparent)]'
                >
                  {/* 年份标题 */}
                  <div className='border-b border-[color:var(--color-border-muted)] px-8 py-6'>
                    <div className='flex items-center justify-between'>
                      <h2 className='text-fg-default text-lg font-semibold'>{year}</h2>
                      <span className='bg-bg-neutral-muted text-fg-muted rounded-full px-3 py-1 text-sm font-medium'>
                        {articles.length}
                      </span>
                    </div>
                  </div>

                  {/* 文章列表 */}
                  <div className='divide-y divide-[color:var(--color-border-muted)]'>
                    {articles.map((article: Article) => (
                      <Link
                        key={article.id}
                        href={`/post/${article.id}`}
                        className='group hover:bg-bg-neutral-muted active:bg-bg-neutral-muted/80 flex items-center justify-between px-8 py-4 transition-colors'
                      >
                        <div className='min-w-0 flex-1'>
                          <h3 className='text-fg-default group-hover:text-fg-accent truncate text-base font-medium'>
                            {article.title}
                          </h3>
                          <p className='text-fg-muted mt-1 text-sm'>
                            {dayjs(article.createdAt).format('YYYY年M月D日')}
                          </p>
                        </div>
                        <div className='ml-4 flex-shrink-0'>
                          <svg
                            className='text-fg-muted group-hover:text-fg-accent h-5 w-5 transition-colors'
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
          /* 空状态 - 苹果风格 */
          <div className='bg-bg-white rounded-3xl p-16 text-center shadow-sm ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-black)_5%,transparent)]'>
            <div className='bg-bg-neutral-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
              <svg
                className='text-fg-muted h-8 w-8'
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
            <h3 className='text-fg-default text-lg font-semibold'>暂无文章</h3>
            <p className='text-fg-muted mt-2 text-sm'>这个标签下还没有任何文章</p>
          </div>
        )}
      </div>
    </div>
  );
}
