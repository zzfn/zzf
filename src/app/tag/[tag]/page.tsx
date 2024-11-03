import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { fetchData } from '../../../models/api';
import type { Article } from 'types/article';
import Link from 'next/link';
import { IconChat } from '@oc/icon';

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
    <div className='mx-auto max-w-3xl px-6 py-12'>
      {/* 头部区域 - 更现代的设计 */}
      <div className='relative mb-16 overflow-hidden'>
        {/* 背景装饰 */}
        <div className='from-accent/5 absolute inset-0 bg-gradient-to-r to-transparent'></div>
        <div className='bg-accent/5 absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl'></div>
        <div className='bg-accent/10 absolute bottom-0 right-10 h-20 w-20 rounded-full blur-2xl'></div>

        {/* 网格背景 */}
        <div className='absolute inset-0 bg-[linear-gradient(rgba(var(--color-accent-emphasis-rgb),0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(var(--color-accent-emphasis-rgb),0.05)_1px,transparent_1px)] bg-[size:20px_20px]'></div>

        {/* 主要内容 */}
        <div className='relative rounded-2xl p-8 backdrop-blur-sm'>
          {/* 装饰性图标 */}
          <div className='text-accent/10 absolute -left-4 -top-4 select-none'>
            <div className='relative'>
              <IconChat className='animate-pulse' />
              <div className='from-accent/20 absolute inset-0 bg-gradient-to-r to-transparent blur-xl'></div>
            </div>
          </div>

          {/* 标题区域 */}
          <div className='relative ml-16'>
            <div className='border-accent/10 inline-flex items-center gap-3 rounded-2xl border bg-black/5 px-4 py-2 backdrop-blur-md'>
              <h1 className='bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent'>
                #{decodeURIComponent(params.tag)}
              </h1>
              <div className='bg-accent/10 h-8 w-px'></div>
              <span className='font-mono text-lg text-accent'>
                {data.length.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* 装饰性线条 */}
          <div className='from-accent/20 via-accent/10 absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r to-transparent'></div>
        </div>
      </div>

      {/* 文章列表区域 - 更优雅的展示 */}
      {data.length > 0 && (
        <div className='relative space-y-16'>
          {/* 左侧时间轴装饰线 */}
          <div className='from-accent/20 via-accent/10 absolute bottom-0 left-[1.6rem] top-0 w-px bg-gradient-to-b to-transparent'></div>

          {Object.entries(groupByYear(data))
            .reverse()
            .map(([year, articles]: [string, Article[]]) => (
              <div key={year} className='relative'>
                {/* 年份标题区域 */}
                <div className='mb-6 flex items-center gap-4'>
                  <div className='shadow-accent/5 relative z-10 rounded-xl bg-default px-4 py-2 shadow-lg'>
                    <span className='bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-2xl font-bold text-transparent'>
                      {year}
                    </span>
                  </div>
                  <span className='bg-accent/10 rounded-full px-3 py-0.5 font-mono text-sm text-accent'>
                    {articles.length.toString().padStart(2, '0')} 篇
                  </span>
                </div>

                {/* 文章列表 */}
                <div className='space-y-2 pl-8'>
                  {articles.map((article: Article) => (
                    <Link
                      key={article.id}
                      href={`/post/${article.id}`}
                      className='from-accent/5 hover:from-accent/10 group relative block rounded-xl bg-gradient-to-br 
                        to-transparent p-4 transition-all duration-300'
                    >
                      <div className='flex items-center justify-between gap-4'>
                        <div className='flex-1 space-y-1'>
                          <h3 className='line-clamp-1 font-medium transition-colors group-hover:text-accent'>
                            {article.title}
                          </h3>
                          <time className='text-muted-foreground font-mono text-xs'>
                            {dayjs(article.createdAt).format('YYYY-MM-DD')}
                          </time>
                        </div>
                        <div className='text-accent/50 transition-all group-hover:translate-x-1 group-hover:text-accent'>
                          →
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
