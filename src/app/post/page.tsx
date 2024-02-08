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
    <div className='mx-auto max-w-3xl'>
      <h3 className='mt-6 text-muted'>当前共有 {data.length} 篇文章，加油！</h3>
      <div className='my-2 flex flex-wrap gap-2'>
        {[
          ...data.reduce((acc: Set<string>, cur) => {
            return acc.add(cur.tag);
          }, new Set()),
        ].map((tag: string) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      {data.length > 0 && (
        <div className='pl-6 text-sm'>
          {Object.entries(groupByYear(data))
            .reverse()
            .map(([key, value]: any) => (
              <>
                <h3 className='text-xl text-accent'>
                  {key}--({value.length})
                </h3>
                {value.map((article: Article) => (
                  <a
                    key={article.id}
                    href={`/post/${article.id}`}
                    className='timeline flex items-center justify-between rounded py-1 hover:bg-muted'
                  >
                    <span>{article.title}</span>
                    <time className='font-mono font-thin text-muted'>
                      {dayjs(article.createdAt).format('YYYY-MM-DD')}
                    </time>
                  </a>
                ))}
              </>
            ))}
        </div>
      )}
    </div>
  );
}
