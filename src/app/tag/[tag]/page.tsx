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
    let createdAt = new Date(obj.createdAt);
    let year = createdAt.getFullYear();
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
    <div className='min-h-screen bg-bg-default'>
      <div className='mx-auto max-w-3xl px-6 py-16'>
        {/* 头部区域 - 苹果风格 */}
        <div className='mb-12'>
          <div className='rounded-3xl bg-bg-white p-8 shadow-sm ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-black)_5%,transparent)]'>
            <div className='text-center'>
              <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-bg-accent-emphasis'>
                <span className='text-lg font-semibold text-fg-onEmphasis'>#</span>
              </div>
              <h1 className='text-3xl font-semibold text-fg-default'>
                {decodeURIComponent(params.tag)}
              </h1>
              <p className='mt-2 text-sm text-fg-muted'>{data.length} 篇文章</p>
            </div>
          </div>
        </div>

        {/* 文章列表区域 - 苹果卡片风格 */}
        {data.length > 0 ? (
          <div className='space-y-8'>
            {Object.entries(groupByYear(data))
              .reverse()
              .map(([year, articles]: [string, Article[]], index) => (
                <div key={year} className='rounded-3xl bg-bg-white shadow-sm ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-black)_5%,transparent)]'>
                  {/* 年份标题 */}
                  <div className='border-b border-[color:var(--color-border-muted)] px-8 py-6'>
                    <div className='flex items-center justify-between'>
                      <h2 className='text-lg font-semibold text-fg-default'>{year}</h2>
                      <span className='rounded-full bg-bg-neutral-muted px-3 py-1 text-sm font-medium text-fg-muted'>
                        {articles.length}
                      </span>
                    </div>
                  </div>

                  {/* 文章列表 */}
                  <div className='divide-y divide-[color:var(--color-border-muted)]'>
                    {articles.map((article: Article, articleIndex) => (
                      <Link
                        key={article.id}
                        href={`/post/${article.id}`}
                        className='group flex items-center justify-between px-8 py-4 transition-colors hover:bg-bg-neutral-muted active:bg-bg-neutral-muted/80'
                      >
                        <div className='min-w-0 flex-1'>
                          <h3 className='truncate text-base font-medium text-fg-default group-hover:text-fg-accent'>
                            {article.title}
                          </h3>
                          <p className='mt-1 text-sm text-fg-muted'>
                            {dayjs(article.createdAt).format('YYYY年M月D日')}
                          </p>
                        </div>
                        <div className='ml-4 flex-shrink-0'>
                          <svg
                            className='h-5 w-5 text-fg-muted transition-colors group-hover:text-fg-accent'
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
          <div className='rounded-3xl bg-bg-white p-16 text-center shadow-sm ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-black)_5%,transparent)]'>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-bg-neutral-muted'>
              <svg
                className='h-8 w-8 text-fg-muted'
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
            <h3 className='text-lg font-semibold text-fg-default'>暂无文章</h3>
            <p className='mt-2 text-sm text-fg-muted'>这个标签下还没有任何文章</p>
          </div>
        )}
      </div>
    </div>
  );
}
