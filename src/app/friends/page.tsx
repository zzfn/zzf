import React from 'react';
import Comment from '../post/[id]/_components/Comment';
import { Metadata } from 'next';
import { Alert, Button } from '@oc/design';
import classNames from 'classnames';
import Image from 'next/image';
import { fetchData } from '../../models/api';
export const metadata: Metadata = {
  title: '朋友们',
};
const CardBio = ({ dataSource }: CardProps) => {
  const { logo, name, description, url } = dataSource;
  return (
    <a
      rel='noreferrer'
      target='_blank'
      href={url}
      className={classNames(
        'flex',
        'bg-muted',
        'rounded-md',
        'overflow-hidden',
        'mb-2',
        'bg-surface-5',
        'hover:bg-neutral-muted',
      )}
    >
      <Image
        width={100}
        height={100}
        className={classNames('w-16', 'h-16', 'mr-2')}
        src={logo}
        alt=''
      />
      <div className={classNames('flex', 'flex-col', 'justify-between', 'p-2')}>
        <strong className='text-primary'>{name}</strong>
        <p className='text-neutral-2'>{description}</p>
      </div>
    </a>
  );
};
type FriendCard = {
  logo: string;
  name: string;
  description: string;
  url: string;
};
type CardProps = {
  dataSource: FriendCard;
};
const Page = async () => {
  const data = await fetchData<any>({
    endpoint: '/v1/friend-links',
  });
  return (
    <>
      <Alert className='text-sm' type='info'>
        <h3 className='text-xl'>海内存知己，天涯若比邻</h3>
      </Alert>
      <Button>和我做朋友吧</Button>
      <div>
        <ul className='list-disc'>
          <li>title: dawn-blog</li>
          <li>url: https://zzfzzf.com</li>
          <li>bio: 一个前端开发者的博客</li>
          <li>avatar: https://cdn.zzfzzf.com/assets/logo.png</li>
        </ul>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        {data?.map((item: any) => (
          <CardBio
            key={item.id}
            dataSource={{
              logo: item.logo,
              name: item.name,
              description: item.description,
              url: item.url,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
