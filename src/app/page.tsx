import { IconButton, Tag, Tooltip } from '@oc/design';
import type { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'utils/time';
import { fetchData } from 'models/api';
import type { Article } from 'types/article';
import TimeDiff from './_components/TimeDiff';
import Image from 'next/image';
import { IconArrowForward, IconLabel } from '@oc/icon';

export const metadata: Metadata = {
  title: '👋奇趣生活实验室',
};

async function getData() {
  return fetchData<Array<Article>>({
    endpoint: '/v1/articles',
    queryParams: {
      limit: '6',
      order: 'updated_at desc',
    },
    fetchParams: {
      next: {
        tags: ['article'],
      },
    },
  });
}

export default async function Page() {
  const data = await getData();
  return (
    <div className='my-6 grid grid-cols-1 md:grid-cols-[auto_minmax(0,_calc(100%_-_296px_-_24px))]'>
      <div className='flex flex-col items-center gap-y-6'>
        <Image
          priority={true}
          className='aspect-square rounded-full object-cover'
          width={128}
          height={128}
          alt='avatar'
          src='https://w.zzfzzf.com/img/1707467164880.webp'
        />
        <h6 className='text-3xl font-bold'>Krupp</h6>
        <p>遇见即是上上签</p>
      </div>
      <div>
        <div className='flex justify-between rounded'>
          <h6 className='flex items-center text-xl text-accent'>
            <IconLabel />
            文章
          </h6>
          <Link href='/post'>
            <IconButton>
              <IconArrowForward />
            </IconButton>
          </Link>
        </div>
        <div className='grid md:grid-cols-2'>
          {data.map((post: any) => (
            <a
              key={post.id}
              href={`/post/${post.id}`}
              className='hover:border-primary flex flex-col gap-y-1 rounded p-3 hover:bg-muted'
            >
              <div className='flex text-accent'>{post.title}</div>
              <div className='flex items-center gap-x-2 text-xs text-muted'>
                更新于
                <Tooltip content={format(post.updatedAt)}>
                  <time className='font-mono'>
                    <TimeDiff time={post.updatedAt} />
                  </time>
                </Tooltip>
                <span># {post.tag}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
