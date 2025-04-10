import { Feed } from 'feed';
import { marked } from 'marked';
import { fetchData } from 'services/api';
import type { Article } from 'types/article';
export const dynamic = 'force-dynamic';
export async function GET() {
  const data = await fetchData<Array<Article>>({
    endpoint: '/v1/articles?rss=true',
    fetchParams: {
      next: {
        tags: ['article'],
      },
    },
  });
  const siteURL = 'https://zzfzzf.com';
  const date = new Date();
  const author = {
    name: 'zzfn',
    email: 'feedback@ooxo.cc',
  };

  const feed = new Feed({
    title: 'nmtz',
    description: 'nmtz的个人博客',
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, nmtz`,
    updated: date,
    generator: 'Feed for nmtz',
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
    },
    author,
  });
  marked.use({
    gfm: true,
    pedantic: false,
    breaks: false,
  });
  // Adding blogs to the rss feed
  data.forEach((post) => {
    const url = `${siteURL}/post/${post.id}`;
    feed.addItem({
      title: post.title,
      id: post.id,
      link: url,
      content: marked.parse(post.content) as string,
      author: [author],
      contributor: [author],
      date: new Date(post.updatedAt),
    });
  });
  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
