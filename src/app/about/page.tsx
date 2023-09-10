import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { Metadata } from 'next';
import { fetchData } from '../../models/api';

type FriendCard = {
  logo: string;
  title: string;
  description: string;
  url: string;
};
type CardProps = {
  dataSource: FriendCard;
};
export const revalidate = 0;
export const metadata: Metadata = {
  title: 'ccw.about',
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
  const data = await fetchData<any>({
    endpoint: '/v1/friend-links',
  });
  return (
    <>
      <div className='text-[var(--secondary-text)]'>
        <h3 className='text-primary font-bold text-xl my-3'>bio</h3>
        <p className='pl-3'>码农，软硬件爱好者，爱折腾</p>
        <h3 className='text-primary font-bold text-xl my-3'>connect</h3>
        <ul className='pl-3 list-disc'>
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
          {data?.map((item: any) => (
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
        <a className='text-accent' target='_blank' href='https://t.ccw.es/BTH82S'>
          友链申请
        </a>
        please email <strong>me@ooxo.cc</strong> if u want to be my friend
        <p>请先添加友链</p>
        <div>
          <ul className='list-disc'>
            <li>title: dawn-blog</li>
            <li>url: https://zzfzzf.com</li>
            <li>bio: 一个前端开发者的博客</li>
            <li>avatar: https://cdn.zzfzzf.com/assets/logo.png</li>
          </ul>
        </div>
      </div>
    </>
  );
}
