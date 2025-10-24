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
        {/* 头部区域 - 液态玻璃风格 */}
        <div className='animate-in fade-in slide-in-from-top-4 mb-12 duration-700'>
          <div className='group relative overflow-hidden rounded-[2rem] backdrop-blur-xl transition-all duration-500 hover:scale-[1.02]'>
            {/* 玻璃背景层 */}
            <div className='absolute inset-0 bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-bg-white)_90%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-white)_80%,transparent)]' />

            {/* 光晕效果 */}
            <div className='absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[color:var(--color-bg-accent-emphasis)] opacity-20 blur-3xl transition-all duration-700 group-hover:opacity-30' />

            {/* 内容层 */}
            <div className='relative p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-black)_8%,transparent)]'>
              <div className='text-center'>
                {/* 图标容器 - 带光晕 */}
                <div className='relative mb-6 inline-flex'>
                  <div className='absolute inset-0 rounded-[1.25rem] bg-[color:var(--color-bg-accent-emphasis)] opacity-40 blur-2xl' />
                  <div className='relative flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-[color:var(--color-bg-accent-emphasis)] to-[color:color-mix(in_srgb,var(--color-bg-accent-emphasis)_80%,var(--color-fg-black))] shadow-lg transition-transform duration-300 group-hover:scale-110'>
                    <span className='text-2xl font-bold text-[color:var(--color-fg-onEmphasis)] drop-shadow-sm'>
                      #
                    </span>
                  </div>
                </div>

                <h1 className='bg-gradient-to-br from-[color:var(--color-fg-default)] to-[color:color-mix(in_srgb,var(--color-fg-default)_70%,var(--color-fg-muted))] bg-clip-text text-4xl font-bold tracking-tight text-transparent'>
                  {decodeURIComponent(params.tag)}
                </h1>
                <p className='mt-3 text-sm font-medium text-[color:var(--color-fg-muted)]'>
                  {data.length} 篇文章
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 文章列表区域 - 液态玻璃卡片 */}
        {data.length > 0 ? (
          <div className='space-y-6'>
            {Object.entries(groupByYear(data))
              .reverse()
              .map(([year, articles]: [string, Article[]], index) => (
                <div
                  key={year}
                  className='animate-in fade-in slide-in-from-bottom-4 duration-700'
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className='group relative overflow-hidden rounded-[2rem] backdrop-blur-xl transition-all duration-500 hover:scale-[1.01]'>
                    {/* 玻璃背景 */}
                    <div className='absolute inset-0 bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-bg-white)_85%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-white)_75%,transparent)]' />

                    {/* 顶部光效 */}
                    <div className='absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[color:color-mix(in_srgb,var(--color-fg-accent)_30%,transparent)] to-transparent' />

                    {/* 内容 */}
                    <div className='relative shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-black)_6%,transparent)]'>
                      {/* 年份标题 */}
                      <div className='border-b border-[color:color-mix(in_srgb,var(--color-border-muted)_50%,transparent)] bg-gradient-to-r from-transparent via-[color:color-mix(in_srgb,var(--color-bg-accent-muted)_10%,transparent)] to-transparent px-8 py-6 backdrop-blur-sm'>
                        <div className='flex items-center justify-between'>
                          <h2 className='text-xl font-bold tracking-tight text-[color:var(--color-fg-default)]'>
                            {year}
                          </h2>
                          <span className='flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-bg-accent-emphasis)_15%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-accent-emphasis)_10%,transparent)] px-3 text-sm font-semibold text-[color:var(--color-fg-accent)] ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-accent)_20%,transparent)] backdrop-blur-sm'>
                            {articles.length}
                          </span>
                        </div>
                      </div>

                      {/* 文章列表 */}
                      <div className='divide-y divide-[color:color-mix(in_srgb,var(--color-border-muted)_40%,transparent)]'>
                        {articles.map((article: Article) => (
                          <Link
                            key={article.id}
                            href={`/post/${article.id}`}
                            className='group/item relative flex items-center justify-between px-8 py-5 transition-all duration-300 hover:bg-gradient-to-r hover:from-[color:color-mix(in_srgb,var(--color-bg-accent-muted)_15%,transparent)] hover:to-transparent hover:backdrop-blur-sm active:scale-[0.99]'
                          >
                            {/* 左侧装饰 */}
                            <div className='absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-[color:var(--color-fg-accent)] to-[color:color-mix(in_srgb,var(--color-fg-accent)_50%,transparent)] opacity-0 transition-opacity duration-300 group-hover/item:opacity-100' />

                            <div className='min-w-0 flex-1 pl-0 transition-all duration-300 group-hover/item:pl-2'>
                              <h3 className='truncate text-base font-semibold text-[color:var(--color-fg-default)] transition-colors duration-300 group-hover/item:text-[color:var(--color-fg-accent)]'>
                                {article.title}
                              </h3>
                              <p className='mt-1.5 text-sm font-medium text-[color:var(--color-fg-muted)] transition-colors duration-300 group-hover/item:text-[color:color-mix(in_srgb,var(--color-fg-accent)_70%,var(--color-fg-muted))]'>
                                {dayjs(article.createdAt).format('YYYY年M月D日')}
                              </p>
                            </div>

                            <div className='ml-4 flex-shrink-0 transition-transform duration-300 group-hover/item:translate-x-1'>
                              <div className='flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-bg-accent-muted)_40%,transparent)] to-transparent opacity-0 transition-all duration-300 group-hover/item:opacity-100'>
                                <svg
                                  className='h-5 w-5 text-[color:var(--color-fg-accent)] transition-colors'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'
                                  strokeWidth={2.5}
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M9 5l7 7-7 7'
                                  />
                                </svg>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          /* 空状态 - 液态玻璃风格 */
          <div className='animate-in fade-in slide-in-from-bottom-4 duration-700'>
            <div className='group relative overflow-hidden rounded-[2rem] backdrop-blur-xl'>
              {/* 玻璃背景 */}
              <div className='absolute inset-0 bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-bg-white)_85%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-white)_75%,transparent)]' />

              {/* 光晕效果 */}
              <div className='absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--color-bg-neutral-muted)] opacity-10 blur-3xl' />

              {/* 内容 */}
              <div className='relative p-20 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-black)_6%,transparent)]'>
                <div className='relative mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[color:color-mix(in_srgb,var(--color-bg-neutral-muted)_60%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-neutral-muted)_40%,transparent)] ring-1 ring-[color:color-mix(in_srgb,var(--color-fg-black)_5%,transparent)] backdrop-blur-sm transition-transform duration-500 group-hover:scale-110'>
                  <svg
                    className='h-10 w-10 text-[color:var(--color-fg-muted)] transition-colors'
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
                <h3 className='text-xl font-bold text-[color:var(--color-fg-default)]'>暂无文章</h3>
                <p className='mt-2 text-sm font-medium text-[color:var(--color-fg-muted)]'>
                  这个标签下还没有任何文章
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
