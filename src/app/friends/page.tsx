import { Metadata } from 'next';
import Image from 'next/image';
import { fetchData } from '../../services/api';
import ApplyFriend from './_components/ApplyFriend';
import { createAvatar } from '@dicebear/core';
import { shapes } from '@dicebear/collection';
import { Users, Sparkles, ExternalLink, ShieldCheck, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: '朋友们 · Friends Network',
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
    <div className='mx-auto max-w-5xl px-4 py-8 sm:py-12 space-y-12'>
      {/* 标题部分 */}
      <div className='relative text-center space-y-3'>
        <div className='inline-flex items-center gap-1.5 rounded-full border border-border-muted/70 bg-bg-muted/40 px-3 py-1 text-xs font-medium text-fg-muted'>
          <Users size={13} className='text-fg-accent' />
          <span>Friends Network · 星系网络</span>
        </div>
        <h1 className='text-3xl font-bold tracking-tight text-fg-default sm:text-4xl'>
          连接灵感 · 创造无限可能
        </h1>
        <p className='text-xs text-fg-muted max-w-md mx-auto sm:text-sm'>
          记录优秀的同路人与有趣的数字花园，互相交换视野与灵感。
        </p>
      </div>

      {/* 友链卡片网格 */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {friendLinks.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target='_blank'
            rel='noreferrer'
            className='group bento-card relative flex items-center justify-between p-5 transition-all duration-200 hover:-translate-y-1'
          >
            <div className='flex items-center gap-3.5 overflow-hidden'>
              <Image
                width={48}
                height={48}
                src={createAvatar(shapes, {
                  seed: item.logo,
                  flip: true,
                }).toDataUri()}
                alt={item.name}
                className='h-12 w-12 rounded-2xl border border-border-muted/80 shadow-xs flex-shrink-0 transition-transform duration-300 group-hover:scale-105'
              />
              <div className='min-w-0 flex-1'>
                <h3 className='truncate text-sm font-semibold text-fg-default group-hover:text-fg-accent transition-colors'>
                  {item.name}
                </h3>
                <p className='truncate text-xs text-fg-muted mt-0.5'>{item.description}</p>
              </div>
            </div>

            <ExternalLink
              size={15}
              className='text-fg-muted opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-fg-accent flex-shrink-0'
            />
          </a>
        ))}
      </div>

      {/* 申请友链部分 */}
      <div className='bento-card overflow-hidden p-6 sm:p-8 space-y-6'>
        <div className='border-b border-border-muted/50 pb-4'>
          <h2 className='text-lg font-bold text-fg-default sm:text-xl flex items-center gap-2'>
            <Sparkles size={18} className='text-fg-accent' />
            <span>申请友链 · Join the Galaxy</span>
          </h2>
          <p className='text-xs text-fg-muted mt-1'>
            欢迎志同道合的技术博主与创作者交换友链，互相串门。
          </p>
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          {/* 基本要求 */}
          <div className='rounded-2xl border border-border-muted/50 bg-bg-muted/20 p-4 space-y-2.5 text-xs text-fg-muted'>
            <h4 className='font-semibold text-fg-default flex items-center gap-1.5 text-xs'>
              <ShieldCheck size={14} className='text-emerald-500' />
              <span>基本准则</span>
            </h4>
            <ul className='space-y-1.5'>
              <li className='flex items-center gap-2'>✓ 原创内容为主，保持稳定更新</li>
              <li className='flex items-center gap-2'>✓ 支持 HTTPS 访问，全站无恶意代码</li>
              <li className='flex items-center gap-2'>✓ 独立域名，可正常流畅访问</li>
              <li className='flex items-center gap-2'>✓ 申请前请先添加本站链接</li>
            </ul>
          </div>

          {/* 本站信息 */}
          <div className='rounded-2xl border border-border-muted/50 bg-bg-muted/20 p-4 space-y-2.5 text-xs text-fg-muted'>
            <h4 className='font-semibold text-fg-default flex items-center gap-1.5 text-xs'>
              <Globe size={14} className='text-indigo-500' />
              <span>本站信息</span>
            </h4>
            <div className='font-mono space-y-1 text-[11px]'>
              <p>名称: <span className='text-fg-default font-semibold'>奇趣生活实验室</span></p>
              <p>地址: <span className='text-fg-default'>https://zzfzzf.com</span></p>
              <p>描述: <span className='text-fg-default'>探索 · 记录 · 分享</span></p>
              <p>头像: <span className='text-fg-default truncate block'>https://cdn.zzfzzf.com/assets/logo.png</span></p>
            </div>
          </div>
        </div>

        <div className='border-t border-border-muted/50 pt-4'>
          <ApplyFriend />
        </div>
      </div>
    </div>
  );
};

export default Page;
