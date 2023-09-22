import dayjs from 'dayjs';
import List from './_components/List';
import type { Metadata } from 'next';
import { fetchData } from '../../models/api';
import type { Article } from "types/article";

export const metadata: Metadata = {
  title: 'krupp.post',
};

async function getData() {
  return fetchData<Array<Article>>({
    endpoint: '/v1/articles',
    fetchParams: {
      next:{
        tags: ['article'],
      }
    },
  });
}

export default async function Page() {
  const data = await getData();

  return (
    <div className='mx-auto max-w-3xl'>
      <h3 className='mt-6 text-muted'>当前共有 {data.length} 篇文章，加油！</h3>
      {data.length > 0 && (
        <List>
          {data.map((post: any) => (
            <a
              key={post.id}
              href={`/post/${post.id}`}
              className='flex items-center justify-between hover:bg-muted py-1 timeline rounded'
            >
              <span>{post.title}</span>
              <time className='font-mono font-thin text-muted'>
                {dayjs(post.createdAt).format('YYYY-MM-DD')}
              </time>
            </a>
          ))}
        </List>
      )}
    </div>
  );
}
