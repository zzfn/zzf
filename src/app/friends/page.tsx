import { Metadata } from 'next';
import Image from 'next/image';
import { fetchData } from '../../services/api';
import ApplyFriend from './_components/ApplyFriend';
import { createAvatar } from '@dicebear/core';
import { shapes } from '@dicebear/collection';
export const metadata: Metadata = {
  title: '朋友们',
};
type FriendCard = {
  id: string;
  logo: string;
  name: string;
  description: string;
  url: string;
};
const Page = async () => {
  const friendLinks = await fetchData<FriendCard[]>({
    endpoint: '/v1/friend-links',
  });
  return (
    <div className='mx-auto max-w-6xl px-4 py-12'>
      {/* 标题部分 */}
      <div className='relative mb-16 text-center'>
        <h2 className='mb-4 text-5xl font-semibold tracking-tight'>
          <span className='bg-gradient-to-r from-[color:var(--color-bg-accent-emphasis)] via-[color:var(--color-bg-upsell-emphasis)] to-[color:var(--color-bg-severe-emphasis)] bg-clip-text text-transparent'>
            Friends Network
          </span>
        </h2>
        <p className='text-fg-muted text-lg font-medium'>连接创造无限可能</p>
      </div>

      {/* 友链卡片网格 */}
      <div className='mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {friendLinks.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target='_blank'
            rel='noreferrer'
            className='group border-border-muted bg-bg-default hover:border-border-default relative overflow-hidden rounded-lg border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-[160ms] ease-out hover:translate-x-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
          >
            <div className='flex items-center gap-4'>
              <Image
                width={60}
                height={60}
                src={createAvatar(shapes, {
                  seed: item.logo,
                  flip: true,
                }).toDataUri()}
                alt={item.name}
                className='border-border-muted rounded-full border-2 shadow-sm transition-transform duration-[160ms] group-hover:scale-105'
              />
              <div>
                <h3 className='text-lg font-semibold'>{item.name}</h3>
                <p className='text-fg-muted text-sm'>{item.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* 申请友链部分 */}
      <div className='border-border-muted bg-bg-default rounded-xl border'>
        <div className='border-border-muted border-b p-6'>
          <h3 className='text-xl font-semibold'>申请友链</h3>
          <p className='text-fg-muted mt-2'>在申请之前，请确保您的网站符合以下要求</p>
        </div>

        <div className='grid gap-6 p-6 lg:grid-cols-2'>
          <div className='space-y-4'>
            <div className='border-border-muted rounded-lg border p-4'>
              <h4 className='mb-3 font-medium'>基本要求</h4>
              <ul className='text-fg-muted space-y-2 text-sm'>
                <li className='flex items-center gap-2'>
                  <span className='text-fg-accent'>⚡</span> 支持 HTTPS 访问
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-fg-upsell'>⚡</span> 独立的域名
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-fg-severe'>⚡</span> 网站可正常访问
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-fg-accent'>⚡</span> 已添加本站友链
                </li>
              </ul>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='border-border-muted rounded-lg border p-4'>
              <h4 className='mb-3 font-medium'>本站信息</h4>
              <ul className='text-fg-muted space-y-2 text-sm'>
                <li className='flex items-center gap-2'>
                  <span className='text-fg-upsell'>✦</span> 站点：dawn-blog
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-fg-severe'>✦</span> 链接：https://zzfzzf.com
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-fg-accent'>✦</span> 描述：一个前端开发者的博客
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-fg-upsell'>✦</span>{' '}
                  头像：https://cdn.zzfzzf.com/assets/logo.png
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='border-border-muted border-t p-6'>
          <ApplyFriend />
        </div>
      </div>
    </div>
  );
};

export default Page;
