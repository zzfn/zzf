import dayjs from 'dayjs';
import type { Metadata } from 'next';
import { fetchData } from '../../models/api';
import type { Article } from 'types/article';
import { Tag } from '@oc/design';

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
      {/* 头部区域 */}
      <div className='mb-10 space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>文章列表</h1>
        <p className='text-muted-foreground text-sm'>
          当前共有 <span className='font-medium text-accent'>{data.length}</span>{' '}
          篇文章，持续输出中...
        </p>
      </div>

      {/* 标签区域 */}
      <div className='mb-8'>
        <h2 className='text-muted-foreground mb-3 text-sm font-medium'>标签列表</h2>
        <div className='flex flex-wrap gap-2'>
          {[...data.reduce((acc: Set<string>, cur) => acc.add(cur.tag), new Set())].map(
            (tag: string) => (
              <Tag
                key={tag}
                className='bg-accent/10 hover:bg-accent/20 cursor-pointer rounded-full 
                px-3 py-1 text-sm text-accent transition-colors'
              >
                {tag}
              </Tag>
            ),
          )}
        </div>
      </div>

      {/* 文章列表区域 */}
      {data.length > 0 && (
        <div className='space-y-12'>
          {Object.entries(groupByYear(data))
            .reverse()
            .map(([year, articles]: [string, Article[]]) => (
              <div key={year} className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <h3 className='text-xl font-medium'>{year}</h3>
                  <span className='bg-accent/10 rounded-full px-2 py-0.5 text-sm text-accent'>
                    {articles.length} 篇
                  </span>
                </div>

                <div className='space-y-1'>
                  {articles.map((article: Article) => (
                    <a
                      key={article.id}
                      href={`/post/${article.id}`}
                      className='hover:bg-accent/5 group flex items-center justify-between rounded-lg px-4
                        py-3 transition-all duration-200'
                    >
                      <span className='transition-colors group-hover:text-accent'>
                        {article.title}
                      </span>
                      <time className='text-muted-foreground ml-4 font-mono text-xs'>
                        {dayjs(article.createdAt).format('YYYY-MM-DD')}
                      </time>
                    </a>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
