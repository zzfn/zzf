import React from 'react';
import { Metadata } from 'next';
import { fetchData } from '@/services/api';

export const revalidate = 0;
export const metadata: Metadata = {
  title: 'Darkroom - 博客后台',
};

// 状态指示器组件
const StatusIndicator = ({ status }: { status: string }) => (
  <span className='flex items-center gap-2'>
    <span className='bg-bg-success-muted h-2 w-2 rounded-full'></span>
    <span>{status}</span>
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
  <div className='border-border-muted bg-bg-muted/50 flex flex-col gap-2 rounded-lg border p-4 backdrop-blur-sm'>
    <div className='text-sm opacity-60'>{label}</div>
    <div className='flex items-center gap-2'>
      {color && (
        <span
          className={`h-2 w-2 rounded-full ${color === 'success' ? 'bg-bg-success-muted' : 'bg-bg-accent'}`}
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
  <div className='border-border-muted grid grid-cols-4 gap-8 border-b py-4 last:border-b-0'>
    {items.map((item, index) => (
      <div key={index} className='flex flex-col gap-1'>
        <div className='text-sm opacity-60'>{item.label}</div>
        {item.hasIndicator ? (
          <StatusIndicator status={item.value} />
        ) : (
          <div className='font-medium'>{item.value}</div>
        )}
      </div>
    ))}
  </div>
);

interface OverviewData {
  basicStats: {
    onlineUsers: number;
    totalViews: number;
  };
  serviceInfo: {
    status: string;
    version: string;
    goVersion: string;
    kernelVersion: string;
  };
  cacheInfo: {
    status: string;
    latency: string;
    cachedKeys: number;
    cacheBackend: string;
    memoryUsage: string;
  };
  performanceInfo: {
    memoryUsage: string;
    goroutines: number;
    gcstwTime: string;
    averageLatency: string;
  };
  requestStats: {
    totalRequests: number;
    qps: number;
    uptime: string;
    p50Latency: string;
    p95Latency: string;
    p99Latency: string;
  };
  databaseStats: {
    status: string;
    maxOpenConns: number;
    openConns: number;
    inUse: number;
    idle: number;
  };
}

async function getOverviewData(): Promise<OverviewData> {
  return fetchData<OverviewData>({
    endpoint: '/v1/stats/overview',
    fetchParams: {
      next: { revalidate: 0 },
    },
  });
}

export default async function Page() {
  const data = await getOverviewData();

  return (
    <div className='bg-bg-default text-fg-default min-h-screen px-4 py-8'>
      <div className='mx-auto max-w-5xl space-y-8'>
        {/* 加载指示器 */}
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center'>
            <div className='border-border-muted border-t-border-default h-8 w-8 animate-spin rounded-full border-4'></div>
          </div>
          <p className='opacity-60'>当前正在通过 Cloudflare 访问博客服务</p>
        </div>

        {/* 概览部分 */}
        <div className='border-border-muted bg-bg-muted/30 rounded-lg border p-6 backdrop-blur-sm'>
          <h2 className='mb-4 text-lg opacity-60'>概览</h2>
          <div className='grid grid-cols-4 gap-4'>
            <StatCard label='在线人数' value={data.basicStats.onlineUsers} color='success' />
            <StatCard label='总阅读数' value={data.basicStats.totalViews} color='accent' />
            <StatCard label='服务延迟' value={data.performanceInfo.averageLatency} />
            <StatCard label='运行时间' value={data.requestStats.uptime} />
          </div>
        </div>

        {/* 详情部分 */}
        <div className='border-border-muted bg-bg-muted/30 rounded-lg border p-6 backdrop-blur-sm'>
          <h2 className='mb-4 text-lg opacity-60'>详情</h2>
          <div className='space-y-0'>
            <DetailRow
              items={[
                { label: '服务状态', value: data.serviceInfo.status, hasIndicator: true },
                { label: '运行版本', value: data.serviceInfo.version },
                { label: '内核版本', value: data.serviceInfo.kernelVersion },
                { label: 'Golang 版本', value: data.serviceInfo.goVersion },
              ]}
            />
            <DetailRow
              items={[
                { label: '缓存状态', value: data.cacheInfo.status, hasIndicator: true },
                { label: '缓存延迟', value: data.cacheInfo.latency },
                { label: '已缓存数据', value: `${data.cacheInfo.cachedKeys} 条` },
                { label: '当前缓存库', value: data.cacheInfo.cacheBackend },
              ]}
            />
            <DetailRow
              items={[
                { label: '数据库状态', value: data.databaseStats.status, hasIndicator: true },
                {
                  label: '活跃连接',
                  value: `${data.databaseStats.inUse}/${data.databaseStats.openConns}`,
                },
                { label: '空闲连接', value: data.databaseStats.idle.toString() },
                { label: '内存占用', value: data.performanceInfo.memoryUsage },
              ]}
            />
            <DetailRow
              items={[
                { label: 'QPS', value: data.requestStats.qps.toFixed(2) },
                { label: 'P50 延迟', value: data.requestStats.p50Latency },
                { label: 'P95 延迟', value: data.requestStats.p95Latency },
                { label: 'P99 延迟', value: data.requestStats.p99Latency },
              ]}
            />
            <DetailRow
              items={[
                { label: 'Goroutine', value: data.performanceInfo.goroutines.toString() },
                { label: 'GC-STW', value: data.performanceInfo.gcstwTime },
                { label: '缓存内存', value: data.cacheInfo.memoryUsage },
                { label: '总请求数', value: data.requestStats.totalRequests.toString() },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
