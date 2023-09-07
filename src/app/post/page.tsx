import { listArchives } from 'api/article';
import dayjs from 'dayjs';
import List from './_components/List';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ccw.post',
}

export default async function Page() {
  const { data = [] } = await listArchives({});
  return (
    <div className='mx-auto max-w-3xl'>
      <h3 className='mt-6 text-muted'>当前共有 {data.length} 篇文章，加油！</h3>
      <List>
        {data.map((post: any) => (
          <a
            key={post.id}
            href={`/post/${post.id}`}
            className='flex items-center justify-between hover:bg-muted py-1 timeline rounded'
          >
            <span>{post.title}</span>
            <time className='font-mono font-thin text-muted'>
              {dayjs(post.createTime).format('YYYY-MM-DD')}
            </time>
          </a>
        ))}
      </List>
    </div>
  );
}
