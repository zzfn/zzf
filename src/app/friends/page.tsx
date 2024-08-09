import React from 'react';
import Comment from '../post/[id]/_components/Comment';
import { Metadata } from 'next';
import { Alert, Button, Modal } from '@oc/design';
import classNames from 'classnames';
import Image from 'next/image';
import { fetchData } from '../../models/api';
import ApplyFriend from './_components/ApplyFriend';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
export const metadata: Metadata = {
  title: '朋友们',
};
const CardBio = ({ dataSource }: CardProps) => {
  const { name, description, url } = dataSource;
  const avatar = createAvatar(adventurer, {
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
        'rounded-md',
        'hover:bg-neutral-muted',
        'justify-center',
        'items-center',
      )}
    >
      <Image
        width={100}
        height={100}
        className={classNames('w-16', 'h-16', 'mr-2')}
        src={avatar.toDataUri()}
        alt=''
      />
      <strong className='text-primary'>{name}</strong>
      <p className='text-neutral-2'>{description}</p>
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
      <h2 className='my-2 text-2xl'>我的朋友们🧑‍🤝‍🧑</h2>
      <Alert className='mb-2 text-sm' type='info'>
        <h3>海内存知己，天涯若比邻</h3>
      </Alert>
      <ul className='grid grid-cols-3 gap-2'>
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
      <Alert type='warning'>申请友链前必读</Alert>
      <ul className='list-decimal pl-6 leading-8'>
        <li>确保可以https访问</li>
        <li>独立域名</li>
        <li>可访问</li>
        <li>添加我为友链</li>
      </ul>
      <Alert type='success'>
        <ul className='list-disc pl-6 leading-6'>
          <li> 我的信息</li>
          <li>站点标题: dawn-blog</li>
          <li>站点链接: https://zzfzzf.com</li>
          <li>站点描述: 一个前端开发者的博客</li>
          <li>站点头像: https://cdn.zzfzzf.com/assets/logo.png</li>
        </ul>
      </Alert>

      <ApplyFriend />
    </>
  );
};

export default Page;
