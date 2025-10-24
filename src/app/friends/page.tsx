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
        <div className='absolute inset-0 -z-10'>
          <div className='absolute inset-0 bg-gradient-to-r from-[color:color-mix(in_srgb,var(--color-bg-accent-emphasis)_10%,transparent)] via-[color:color-mix(in_srgb,var(--color-bg-upsell-emphasis)_10%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-severe-emphasis)_10%,transparent)] blur-3xl'></div>
        </div>
        <h2 className='mb-4 text-5xl font-bold tracking-tight'>
          <span className='bg-gradient-to-r from-[color:var(--color-bg-accent-emphasis)] via-[color:var(--color-bg-upsell-emphasis)] to-[color:var(--color-bg-severe-emphasis)] bg-clip-text text-transparent'>
            Friends Network
          </span>
        </h2>
        <p className='text-fg-muted/80 text-lg font-medium'>连接创造无限可能</p>
      </div>

      {/* 友链卡片网格 */}
      <div className='mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {friendLinks.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target='_blank'
            rel='noreferrer'
            className='border-border-muted/50 group border-border-muted bg-bg-muted relative overflow-hidden rounded-xl border bg-gradient-to-b p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl'
          >
            <div className='absolute inset-0 -z-10 bg-gradient-to-r from-[color:color-mix(in_srgb,var(--color-bg-accent-emphasis)_10%,transparent)] via-[color:color-mix(in_srgb,var(--color-bg-upsell-emphasis)_10%,transparent)] to-[color:color-mix(in_srgb,var(--color-bg-severe-emphasis)_10%,transparent)] opacity-0 transition-opacity group-hover:opacity-100'></div>
            <div className='flex items-center gap-4'>
              <Image
                width={60}
                height={60}
                src={createAvatar(shapes, {
                  seed: item.logo,
                  flip: true,
                }).toDataUri()}
                alt={item.name}
                className='border-border-muted/50 rounded-full border-2 shadow-sm transition-transform group-hover:scale-110'
              />
              <div>
                <h3 className='text-lg font-bold'>{item.name}</h3>
                <p className='text-fg-muted/80 text-sm'>{item.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* 申请友链部分 */}
      <div className='border-border-muted/50 border-border-muted bg-bg-muted rounded-2xl border backdrop-blur-sm'>
        <div className='border-border-muted/50 border-b p-6'>
          <h3 className='text-xl font-bold'>申请友链</h3>
          <p className='text-fg-muted/80 mt-2'>在申请之前，请确保您的网站符合以下要求</p>
        </div>

        <div className='grid gap-6 p-6 lg:grid-cols-2'>
          <div className='space-y-4'>
            <div className='rounded-lg bg-[color:color-mix(in_srgb,var(--color-bg-accent-emphasis)_5%,transparent)] p-4'>
              <h4 className='mb-3 font-medium'>基本要求</h4>
              <ul className='text-fg-muted/80 space-y-2 text-sm'>
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
            <div className='rounded-lg bg-[color:color-mix(in_srgb,var(--color-bg-upsell-emphasis)_5%,transparent)] p-4'>
              <h4 className='mb-3 font-medium'>本站信息</h4>
              <ul className='text-fg-muted/80 space-y-2 text-sm'>
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

        <div className='border-border-muted/50 border-t p-6'>
          <ApplyFriend />
        </div>
      </div>
    </div>
  );
};

export default Page;
