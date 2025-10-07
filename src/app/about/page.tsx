import React from 'react';
import { Metadata } from 'next';

export const revalidate = 0;
export const metadata: Metadata = {
  title: 'Darkroom - 博客后台',
};

// 状态指示器组件
const StatusIndicator = ({ status }: { status: 'online' | 'normal' }) => (
  <span className='flex items-center gap-2'>
    <span className='bg-success-muted h-2 w-2 rounded-full'></span>
    <span>{status === 'online' ? '在线' : '正常'}</span>
  </span>
);

// 统计卡片组件
const StatCard = ({
  label,
  value,
  color,
  location,
}: {
  label: string;
  value: string | number;
  color?: 'success' | 'accent';
  location?: string;
}) => (
  <div className='border-muted bg-muted/50 flex flex-col gap-2 rounded-lg border p-4 backdrop-blur-sm'>
    <div className='text-sm opacity-60'>{label}</div>
    <div className='flex items-center gap-2'>
      {color && (
        <span
          className={`h-2 w-2 rounded-full ${color === 'success' ? 'bg-success-muted' : 'bg-accent'}`}
        ></span>
      )}
      <span className='text-2xl font-bold'>{value}</span>
    </div>
    {location && (
      <div className='text-sm opacity-60'>
        <div>{location}</div>
      </div>
    )}
  </div>
);

// 详情信息行组件
const DetailRow = ({
  items,
}: {
  items: { label: string; value: string; hasIndicator?: boolean }[];
}) => (
  <div className='border-muted grid grid-cols-4 gap-8 border-b py-4 last:border-b-0'>
    {items.map((item, index) => (
      <div key={index} className='flex flex-col gap-1'>
        <div className='text-sm opacity-60'>{item.label}</div>
        {item.hasIndicator ? (
          <StatusIndicator status='normal' />
        ) : (
          <div className='font-medium'>{item.value}</div>
        )}
      </div>
    ))}
  </div>
);

export default async function Page() {
  // 模拟数据
  const stats = {
    onlineUsers: 'xx',
    totalReads: 'xx',
    serviceLatency: 'xx',
    latestVisitor: {
      city: 'xx',
      country: 'xx',
    },
  };

  const serviceInfo = {
    status: 'online',
    runtime: 'xx',
    kernelVersion: 'xx',
    golangVersion: 'xx',
  };

  const cacheInfo = {
    status: 'normal',
    latency: 'xx',
    cachedData: 'xx',
    currentCache: 'xx',
  };

  const systemInfo = {
    status: 'normal',
    memoryUsage: 'xx',
    goroutine: 'xx',
    gcStw: 'xx',
  };

  return (
    <div className='bg-default text-default min-h-screen px-4 py-8'>
      <div className='mx-auto max-w-5xl space-y-8'>
        {/* 加载指示器 */}
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center'>
            <div className='border-muted border-t-default h-8 w-8 animate-spin rounded-full border-4'></div>
          </div>
          <p className='opacity-60'>当前正在通过 Cloudflare 访问博客服务</p>
        </div>

        {/* 概览部分 */}
        <div className='border-muted bg-muted/30 rounded-lg border p-6 backdrop-blur-sm'>
          <h2 className='mb-4 text-lg opacity-60'>概览</h2>
          <div className='grid grid-cols-4 gap-4'>
            <StatCard label='在线人数' value={stats.onlineUsers} color='success' />
            <StatCard label='总阅读数' value={stats.totalReads} color='accent' />
            <StatCard label='服务延迟' value='xx ms' />
            <StatCard
              label='最新访客'
              value={stats.latestVisitor.city}
              location={stats.latestVisitor.country}
            />
          </div>
        </div>

        {/* 详情部分 */}
        <div className='border-muted bg-muted/30 rounded-lg border p-6 backdrop-blur-sm'>
          <h2 className='mb-4 text-lg opacity-60'>详情</h2>
          <div className='space-y-0'>
            <DetailRow
              items={[
                { label: '服务状态', value: '在线', hasIndicator: true },
                { label: '运行版本', value: serviceInfo.runtime },
                { label: '内核版本', value: serviceInfo.kernelVersion },
                { label: 'Golang 版本', value: serviceInfo.golangVersion },
              ]}
            />
            <DetailRow
              items={[
                { label: '缓存状态', value: '正常', hasIndicator: true },
                { label: '缓存延迟', value: 'xx ms' },
                { label: '已缓存数据', value: cacheInfo.cachedData },
                { label: '当前缓存库', value: cacheInfo.currentCache },
              ]}
            />
            <DetailRow
              items={[
                { label: '内核状态', value: '正常', hasIndicator: true },
                { label: '内存占用', value: systemInfo.memoryUsage },
                { label: 'Goroutine', value: systemInfo.goroutine },
                { label: 'GC-STW', value: 'xx ms' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
