import type { Metadata } from 'next';
import { fetchData } from '../../services/api';
import type { Article } from 'types/article';
import { PostArchiveHeader } from './_components/PostArchiveHeader';
import { TagSelector } from './_components/TagSelector';
import { ArticleYearGroup } from './_components/ArticleYearGroup';

export const metadata: Metadata = {
  title: 'Post',
};

// ISR 缓存配置：文章列表每 30 分钟重新验证
export const revalidate = 1800; // 30 分钟

async function getData() {
  return fetchData<Array<Article>>({
    endpoint: '/v1/articles',
    fetchParams: {
      next: {
        tags: ['article'],
      },
    },
  });
}

function groupByYear(array: Array<Article>) {
  return array.reduce((acc: Record<string, Array<Article>>, obj) => {
    const createdAt = new Date(obj.createdAt);
    const year = createdAt.getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(obj);
    return acc;
  }, {});
}

export default async function Page() {
  const data = await getData();
  const uniqueTags = [...new Set(data.map((item) => item.tag))];
  const groupedArticles = Object.entries(groupByYear(data)).sort(
    (a, b) => Number(b[0]) - Number(a[0]),
  );

  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-12 px-6 pt-12 pb-16'>
      <PostArchiveHeader totalPosts={data.length} totalTags={uniqueTags.length} />
      <TagSelector tags={uniqueTags} articles={data} />

      {data.length > 0 && (
        <section className='flex flex-col gap-10'>
          {groupedArticles.map(([year, articles]: [string, Article[]]) => (
            <ArticleYearGroup key={year} year={year} articles={articles} />
          ))}
        </section>
      )}
    </div>
  );
}
