import type { Metadata } from 'next';
import { fetchData } from 'services/api';
import type { Article } from 'types/article';
import { HeroSection } from './_components/home/HeroSection';
import { ActivitySection } from './_components/home/ActivitySection';
import { ArticleCard } from './_components/home/ArticleCard';
import { ExploreMoreCTA } from './_components/home/ExploreMoreCTA';
import { PageWrapper } from '@/components/ui/PageTransition';

type SiteConfig = {
  avatar: string;
  name: string;
  slug: string;
  [key: string]: unknown;
};

export const metadata: Metadata = {
  title: '👋奇趣生活实验室',
};

// ISR 缓存配置：首页每 10 分钟重新验证
export const revalidate = 600; // 10 分钟

async function getData() {
  return fetchData<Array<Article>>({
    endpoint: '/v1/articles',
    queryParams: {
      limit: '6',
      order: 'updated_at desc',
    },
    fetchParams: {
      next: {
        tags: ['article'],
      },
    },
  });
}

async function getConfig() {
  return fetchData<SiteConfig>({
    endpoint: '/v1/config/site',
  });
}

export default async function Page() {
  const data = await getData();
  const config = await getConfig();

  const activityItems = [
    {
      label: '正在开发新的个人网站',
      color: 'var(--color-bg-accent-emphasis)',
    },
    {
      label: '学习 Rust 编程语言',
      color: 'color-mix(in srgb, var(--color-bg-accent) 70%, transparent)',
    },
    {
      label: '研究 AI 应用开发',
      color: 'color-mix(in srgb, var(--color-bg-accent-muted) 80%, transparent)',
    },
  ];

  return (
    <PageWrapper>
      <div className='mx-auto max-w-3xl px-4 py-10 sm:py-12'>
        <HeroSection config={config} />
        <ActivitySection items={activityItems} />

        {/* 文章卡片网格 */}
        <div className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2'>
          {data.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        <ExploreMoreCTA animationDelay={200 + data.length * 100} />
      </div>
    </PageWrapper>
  );
}
