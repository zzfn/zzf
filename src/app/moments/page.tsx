import React from 'react';
import Comment from '../post/[id]/_components/Comment';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: '心情',
};
const Page = async (props: { searchParams: { id: string } }) => {
  return (
    <Comment
      params={{
        objectId: props.searchParams.id || '0',
        objectType: 'thinking',
      }}
    />
  );
};

export default Page;
