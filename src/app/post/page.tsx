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

  return (
    <div className='mx-auto max-w-3xl px-6 py-12'>
      {/* ���部状态区域 */}
      <div className='border-border-default mb-10 flex items-end justify-between border-b pb-8'>
        <div className='space-y-1'>
          <div className='text-muted flex items-center gap-2 text-sm'>
            <div className='flex gap-1'>
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className='bg-bg-accent-emphasis inline-block h-1 w-1 animate-pulse rounded-full'
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
            <span className='font-mono tracking-wider'>系统就绪</span>
          </div>
          <div className='group text-default flex items-baseline gap-2'>
            <div className='flex items-center gap-2'>
              <span className='text-muted font-mono'>[</span>
              <span className='text-accent animate-pulse font-mono'>$</span>
              <span className='text-muted font-mono'>]</span>
            </div>
            <p className='flex items-center gap-2'>
              <span className='text-accent font-mono font-medium'>
                {data.length.toString().padStart(3, '0')}
              </span>
              <span className='text-muted'>条记录</span>
              <span className='bg-bg-accent-emphasis inline-flex h-2 w-2 animate-ping rounded-full'></span>
            </p>
          </div>
        </div>

        <div className='flex items-center gap-1.5 text-xs'>
          <span className='bg-bg-success-muted h-1.5 w-1.5 animate-pulse rounded-full'></span>
          <span className='font-mono'>已连接</span>
        </div>
      </div>

      {/* 标签区域 */}
      <div className='mb-12 space-y-4'>
        <div className='flex items-center gap-3'>
          <div className='text-muted flex items-center gap-2 text-sm'>
            <span className='text-accent font-mono'>#</span>
            <span className='font-medium'>标签导航</span>
          </div>
          <span className='text-muted font-mono text-xs'>
            {[...new Set(data.map((item) => item.tag))].length.toString().padStart(2, '0')} 个分类
          </span>
        </div>

        <div className='flex flex-wrap gap-2'>
          {[...data.reduce((acc: Set<string>, cur) => acc.add(cur.tag), new Set())].map(
            (tag: string) => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className='group bg-opacity border-border-default text-default hover:border-border-accent hover:bg-bg-neutral-muted hover:text-accent relative cursor-pointer rounded-md border px-3 py-1.5 text-xs transition-all'
              >
                <span className='font-mono'>{tag}</span>
                <span className='text-muted ml-2 text-xs'>
                  {data
                    .filter((item) => item.tag === tag)
                    .length.toString()
                    .padStart(2, '0')}
                </span>
              </Link>
            ),
          )}
        </div>
      </div>

      {/* 文章列表区域 */}
      {data.length > 0 && (
        <div className='relative space-y-12'>
          {/* 装饰线 */}
          <div className='from-accent/50 via-accent/10 absolute top-0 left-[11px] h-full w-[1px] bg-gradient-to-b to-transparent'></div>

          {Object.entries(groupByYear(data))
            .reverse()
            .map(([year, articles]: [string, Article[]]) => (
              <div key={year} className='relative space-y-4'>
                {/* 年份标题区域 */}
                <div className='relative flex items-center gap-3'>
                  <div className='relative flex h-6 w-6 items-center justify-center'>
                    <span className='bg-bg-accent/20 absolute h-6 w-6 animate-ping rounded-full'></span>
                    <span className='bg-bg-accent/30 absolute h-4 w-4 rounded-full'></span>
                    <span className='bg-bg-accent-emphasis relative h-2 w-2 rounded-full'></span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <h3 className='text-accent font-mono text-xl font-medium'>{year}</h3>
                    <div className='bg-opacity flex items-center gap-2 rounded-full px-3 py-1 text-xs'>
                      <span className='text-muted font-mono'>COUNT:</span>
                      <span className='text-accent font-mono'>
                        {articles.length.toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 文章列表 */}
                <div className='border-border-default ml-3 space-y-1 border-l pl-8'>
                  {articles.map((article: Article) => (
                    <Link
                      key={article.id}
                      href={`/post/${article.id}`}
                      className='group flex items-center justify-between py-3 transition-all hover:px-4'
                    >
                      <div className='flex items-center gap-3 overflow-hidden'>
                        <div className='flex items-center gap-2'>
                          <span className='bg-bg-accent/40 group-hover:bg-bg-accent h-1.5 w-1.5 rounded-full transition-colors'></span>
                          <span className='text-default group-hover:text-accent font-medium transition-colors'>
                            {article.title}
                          </span>
                        </div>

                        {/* 新文章标记 */}
                        {dayjs().diff(article.createdAt, 'day') < 7 && (
                          <span className='bg-bg-success-muted shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium uppercase'>
                            New
                          </span>
                        )}
                      </div>

                      <div className='text-muted flex items-center gap-6 text-xs'>
                        <span className='shrink-0 font-mono'>{article.tag}</span>
                        <time className='shrink-0 font-mono tabular-nums'>
                          {dayjs(article.createdAt).format('MM-DD')}
                        </time>
                        <span className='text-accent font-mono opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100'>
                          →
                        </span>
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
