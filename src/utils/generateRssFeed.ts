import fs from 'fs';
import { Feed } from 'feed';

export default async function generateRssFeed(posts: any[]) {
  const siteURL = 'https://zzfzzf.com';
  const date = new Date();
  const author = {
    name: 'zzfn',
    email: 'feedback@zzfzzf.com',
  };

  // Creating feed
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
      rss2: `${siteURL}/rss/feed.xml`, // xml format
      json: `${siteURL}/rss/feed.json`, // json fromat
    },
    author,
  });

  // Adding blogs to the rss feed
  posts.forEach((post) => {
    const url = `${siteURL}/article/${post.id}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.summary,
      content: post.summary,
      author: [author],
      contributor: [author],
      date: new Date(post.updateTime),
    });
  });

  // generating the xml and json for rss
  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
}
