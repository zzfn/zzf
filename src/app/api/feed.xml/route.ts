import { lastCreated } from "api/article";
import { Feed } from "feed";
import { marked } from "marked";
import { mangle } from "marked-mangle";
import { gfmHeadingId } from "marked-gfm-heading-id";
export async function GET() {
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
  marked.use(mangle())
  const options = {
    prefix: "heading-",
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
      image: post.logo,
      description: post.summary,
      content: marked.parse(post.content),
      author: [author],
      contributor: [author],
      date: new Date(post.updateTime),
    });
  });
  return new Response(feed.rss2(),{
    status: 200,
    headers: {
      "Content-Type": "application/xml"
    },
  })
}
