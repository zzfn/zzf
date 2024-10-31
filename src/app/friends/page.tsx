import React from 'react';
import Comment from '../post/[id]/_components/Comment';
import { Metadata } from 'next';
import { Alert, Button, Modal } from '@oc/design';
import classNames from 'classnames';
import Image from 'next/image';
import { fetchData } from '../../models/api';
import ApplyFriend from './_components/ApplyFriend';
import { createAvatar } from '@dicebear/core';
import { shapes } from '@dicebear/collection';
export const metadata: Metadata = {
  title: '朋友们',
};
const CardBio = ({ dataSource }: CardProps) => {
  const { name, description, url } = dataSource;
  const avatar = createAvatar(shapes, {
    seed: url,
    flip: true,
  });
  return (
    <a
      rel='noreferrer'
      target='_blank'
      href={url}
      className={classNames(
        'flex',
        'flex-col',
        'rounded-lg',
        'p-6',
        'hover:bg-neutral-muted',
        'transition-all',
        'duration-300',
        'hover:shadow-lg',
        'hover:-translate-y-1',
        'justify-center',
        'items-center',
        'bg-white/50',
        'backdrop-blur-sm',
      )}
    >
      <Image
        width={100}
        height={100}
        className={classNames(
          'w-20',
          'h-20',
          'rounded-full',
          'mb-4',
          'border-4',
          'border-white',
          'shadow-md',
        )}
        src={avatar.toDataUri()}
        alt={name}
      />
      <strong className='text-primary mb-2 text-lg'>{name}</strong>
      <p className='text-neutral-2 text-center text-sm'>{description}</p>
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
    <div className='mx-auto max-w-6xl px-4 py-8'>
      <div className='mb-12 text-center'>
        <h2 className='mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent'>
          我的朋友们 🧑‍🤝‍🧑
        </h2>
        <p className='text-neutral-2 text-lg'>海内存知己，天涯若比邻</p>
      </div>

      <ul className='mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
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
      </ul>

      <div className='mb-8 rounded-xl bg-orange-50 p-8'>
        <Alert type='warning' className='mb-6'>
          申请友链前必读
        </Alert>
        <ul className='mb-8 list-decimal space-y-2 pl-6 leading-8'>
          <li>确保可以https访问</li>
          <li>独立域名</li>
          <li>可访问</li>
          <li>添加我为友链</li>
        </ul>

        <div className='rounded-lg bg-white/70 p-6 backdrop-blur'>
          <h3 className='mb-4 text-lg font-bold'>我的信息</h3>
          <ul className='text-neutral-2 space-y-2'>
            <li>站点标题: dawn-blog</li>
            <li>站点链接: https://zzfzzf.com</li>
            <li>站点描述: 一个前端开发者的博客</li>
            <li>站点头像: https://cdn.zzfzzf.com/assets/logo.png</li>
          </ul>
        </div>
      </div>

      <ApplyFriend />
    </div>
  );
};

export default Page;
