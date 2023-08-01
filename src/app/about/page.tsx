import Head from 'next/head';
import { getTitle } from '../../utils/getTitle';
import React from 'react';
import { friendList } from 'api/friend';
import classNames from 'classnames';
import Image from 'next/image';
type FriendCard = {
  logo: string;
  title: string;
  description: string;
  url: string;
};
type CardProps = {
  dataSource: FriendCard;
};
const CardBio = ({ dataSource }: CardProps) => {
  const { logo, title, description, url } = dataSource;
  return (
    <a
      rel='noreferrer'
      target='_blank'
      href={url}
      className={classNames(
        'flex',
        'bg-comment',
        'rounded-md',
        'overflow-hidden',
        'mb-2',
        'bg-surface-5',
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
        <strong className='text-primary'>{title}</strong>
        <p className='text-neutral-2'>{description}</p>
      </div>
    </a>
  );
};
export default async function Page() {
  const { data } = await friendList();
  return (
    <>
      <h1 className='mt-18 mb-8 text-2.5xl text-center'>关于</h1>
      <div className='text-[var(--secondary-text)]'>
        <Head>
          <title>{getTitle('我的')}</title>
        </Head>
        <h3 className='text-primary font-bold text-xl my-3'>bio</h3>
        <p className='pl-3'>码农，软硬件爱好者，爱折腾</p>
        <h3 className='text-primary font-bold text-xl my-3'>connect</h3>
        <ul className='pl-3'>
          <li>
            Blog 🏠 <span className='text-link-4'>zzfzzf.com</span>
          </li>
          <li>
            Email 📧 <span className='text-link-4'>me@ooxo.cc</span>
          </li>
          <li>
            GitHub 🕸 <span className='text-link-4'>zzfn</span>
          </li>
        </ul>
        <h3 className='text-primary font-bold text-xl my-3'>friends</h3>
        <div className='grid md:grid-cols-2 gap-x-16 m-2'>
          {data.map((item: any) => (
            <CardBio
              key={item.id}
              dataSource={{
                logo: item.logo,
                title: item.title,
                description: item.description,
                url: item.url,
              }}
            />
          ))}
        </div>
        please email <strong>me@ooxo.cc</strong> if u want to be my friend
        <p>你需要提供</p>
        <ul>
          <li>title: dawn-blog</li>
          <li>url: https://zzfzzf.com</li>
          <li>bio: 一个前端开发者的博客</li>
          <li>avatar: https://cdn.zzfzzf.com/assets/logo.png</li>
        </ul>
      </div>
    </>
  );
}
