import type { NextApiRequest, NextApiResponse } from 'next';
import { Feed } from 'feed';
import { translateMarkdown } from '../../utils/translateMarkdown';
import { lastCreated } from 'api/article';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await lastCreated();
  const siteURL = 'https://zzfzzf.com';
  const date = new Date();
  const author = {
    name: 'zzfn',
    email: 'feedback@ooxo.cc',
  };

  const feed = new Feed({
    title: 'zzfn',
    description: 'zzfn的个人博客',
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, zzfn`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
    },
    author,
  });

  // Adding blogs to the rss feed
  data.forEach((post) => {
    const url = `${siteURL}/article/${post.id}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      image: post.logo,
      description: post.summary,
      content: translateMarkdown(post.content),
      author: [author],
      contributor: [author],
      date: new Date(post.updateTime),
    });
  });
  res.status(200).send(feed.rss2());
}
