import { Feed } from 'feed';
import { marked } from 'marked';
import { mangle } from 'marked-mangle';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { fetchData } from 'models/api';
import type { Article } from 'types/article';

export async function GET() {
  const data = await fetchData<Array<Article>>({ endpoint: '/v1/articles?rss=true' });
  const siteURL = 'https://zzfzzf.com';
  const date = new Date();
  const author = {
    name: 'zzfn',
    email: 'feedback@ooxo.cc',
  };

  const feed = new Feed({
    title: 'wawama',
    description: 'wawama的个人博客',
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, wawama`,
    updated: date,
    generator: 'Feed for wawama',
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
    },
    author,
  });
  marked.use(mangle());
  const options = {
    prefix: 'heading-',
  };

  marked.use(gfmHeadingId(options));
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
      id: url,
      link: url,
      content: marked.parse(post.content),
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
