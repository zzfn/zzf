import React from 'react';
import { listArchives, listTags } from "api/article";
import dayjs from "dayjs";

export default async function Page() {
  const { data=[] } = await listArchives({ });
  return (
    <>
      <div className='flex flex-col gap-y-2'>
        {data.map((post: any) => (
          <a key={post.id} href={`/post/${post.id}`} className='flex justify-between hover:bg-muted p-2 rounded'>
            <span>{post.title}</span>
            <time className="font-mono font-thin text-muted">{dayjs(post.createTime).format('YYYY-MM-DD')}</time>
          </a>
        ))}
      </div>
    </>
  );
}
