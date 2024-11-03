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
    <div className='mx-auto max-w-6xl px-4 py-12'>
      {/* 标题部分 */}
      <div className='relative mb-16 text-center'>
        <div className='absolute inset-0 -z-10'>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl'></div>
        </div>
        <h2 className='mb-4 text-5xl font-bold tracking-tight'>
          <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
            Friends Network
          </span>
        </h2>
        <p className='text-muted/80 text-lg font-medium'>连接创造无限可能</p>
      </div>

      {/* 友链卡片网格 */}
      <div className='mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {data?.map((item: any) => (
          <a
            key={item.id}
            href={item.url}
            target='_blank'
            rel='noreferrer'
            className='border-border/50 group relative overflow-hidden rounded-xl border border-muted bg-muted bg-gradient-to-b p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl'
          >
            <div className='absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity group-hover:opacity-100'></div>
            <div className='flex items-center gap-4'>
              <Image
                width={60}
                height={60}
                src={createAvatar(shapes, {
                  seed: item.logo,
                  flip: true,
                }).toDataUri()}
                alt={item.name}
                className='border-border/50 rounded-full border-2 shadow-sm transition-transform group-hover:scale-110'
              />
              <div>
                <h3 className='text-lg font-bold'>{item.name}</h3>
                <p className='text-muted/80 text-sm'>{item.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* 申请友链部分 */}
      <div className='border-border/50 rounded-2xl border border-muted bg-muted backdrop-blur-sm'>
        <div className='border-border/50 border-b p-6'>
          <h3 className='text-xl font-bold'>申请友链</h3>
          <p className='text-muted/80 mt-2'>在申请之前，请确保您的网站符合以下要求</p>
        </div>

        <div className='grid gap-6 p-6 lg:grid-cols-2'>
          <div className='space-y-4'>
            <div className='rounded-lg bg-blue-500/5 p-4'>
              <h4 className='mb-3 font-medium'>基本要求</h4>
              <ul className='text-muted/80 space-y-2 text-sm'>
                <li className='flex items-center gap-2'>
                  <span className='text-blue-500'>⚡</span> 支持 HTTPS 访问
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-purple-500'>⚡</span> 独立的域名
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-pink-500'>⚡</span> 网站可正常访问
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-blue-500'>⚡</span> 已添加本站友链
                </li>
              </ul>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='rounded-lg bg-purple-500/5 p-4'>
              <h4 className='mb-3 font-medium'>本站信息</h4>
              <ul className='text-muted/80 space-y-2 text-sm'>
                <li className='flex items-center gap-2'>
                  <span className='text-purple-500'>✦</span> 站点：dawn-blog
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-pink-500'>✦</span> 链接：https://zzfzzf.com
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-blue-500'>✦</span> 描述：一个前端开发者的博客
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-purple-500'>✦</span>{' '}
                  头像：https://cdn.zzfzzf.com/assets/logo.png
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='border-border/50 border-t p-6'>
          <ApplyFriend />
        </div>
      </div>
    </div>
  );
};

export default Page;
