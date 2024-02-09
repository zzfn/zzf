import { Tooltip, Tag, IconButton } from '@oc/design';
import type { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'utils/time';
import { fetchData } from 'models/api';
import type { Article } from 'types/article';
import TimeDiff from './_components/TimeDiff';
import Image from 'next/image';
import { IconArrowForward, IconAuto, IconLabel } from '@oc/icon';

export const metadata: Metadata = {
  title: 'Home',
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
    <>
      <div className='flex items-center gap-x-6'>
        <Image
          className='aspect-square rounded-full object-cover'
          width={128}
          height={128}
          alt='avatar'
          src='https://w.zzfzzf.com/img/1707467164880.webp'
        />
        <div className='flex flex-col gap-y-2'>
          <h6 className='text-3xl font-bold'>Krupp</h6>
          <p>遇见即是上上签</p>
          <p>我爱摸鱼，身体好好</p>
        </div>
      </div>
      <div className='my-6 flex justify-between rounded'>
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
      <div className='grid grid-cols-2'>
        {data.map((post: any) => (
          <a
            key={post.id}
            href={`/post/${post.id}`}
            className='hover:border-primary flex flex-col gap-y-1 rounded p-3 hover:bg-muted'
          >
            <div className='text-accent '>{post.title}</div>
            <div className='flex items-center gap-x-2 text-xs text-muted'>
              <time className='font-mono'>
                <TimeDiff time={post.createdAt} />
              </time>
              {post.createdAt !== post.updatedAt && (
                <Tooltip content={format(post.updatedAt)}>
                  <span>（已编辑）</span>
                </Tooltip>
              )}
              <span># {post.tag}</span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
