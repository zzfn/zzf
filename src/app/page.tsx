import type { Metadata } from 'next';
import { fetchData } from 'services/api';
import type { Article } from 'types/article';
import { BentoHeroCard } from './_components/home/BentoHeroCard';
import { BentoNowCard } from './_components/home/BentoNowCard';
import { BentoFeaturedPost } from './_components/home/BentoFeaturedPost';
import { BentoQuickWidgets } from './_components/home/BentoQuickWidgets';
import { BentoRecentGrid } from './_components/home/BentoRecentGrid';
import { BentoExploreCTA } from './_components/home/BentoExploreCTA';

type SiteConfig = {
  avatar: string;
  name: string;
  slug: string;
  [key: string]: unknown;
};

export const metadata: Metadata = {
  title: '奇趣生活实验室 · Krupp',
};

// ISR 缓存配置：首页每 10 分钟重新验证
export const revalidate = 600; // 10 分钟

async function getData() {
  return fetchData<Array<Article>>({
    endpoint: '/v1/articles',
    queryParams: {
      limit: '7',
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

  const featuredArticle = data.length > 0 ? data[0] : null;
  const recentArticles = data.length > 1 ? data.slice(1) : [];

  return (
    <div className='mx-auto max-w-4xl px-4 py-8 sm:py-10 space-y-6'>
      {/* 1. Hero 个人与状态主卡 */}
      <BentoHeroCard config={config} />

      {/* 2. Bento 核心二列：头条精选文章 + 实时听歌/心流小组件 */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
        {featuredArticle && (
          <div className='lg:col-span-7 flex'>
            <div className='w-full'>
              <BentoFeaturedPost article={featuredArticle} />
            </div>
          </div>
        )}
        <div className={featuredArticle ? 'lg:col-span-5 flex' : 'lg:col-span-12 flex'}>
          <div className='w-full'>
            <BentoNowCard />
          </div>
        </div>
      </div>

      {/* 3. 灵感与快捷通道 */}
      <BentoQuickWidgets />

      {/* 4. 最新文章流 */}
      {recentArticles.length > 0 && (
        <div className='pt-4'>
          <BentoRecentGrid articles={recentArticles} />
        </div>
      )}

      {/* 5. 底部探索全站 CTA */}
      <BentoExploreCTA animationDelay={400} />
    </div>
  );
}
