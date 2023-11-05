import React from 'react';
import Comment from "../post/[id]/_components/Comment";
import {Metadata} from "next";
export const metadata: Metadata = {
    title: 'Feedback',
};
const Page = async () => {
  return (
    <Comment
      params={{
        objectId: '0',
        objectType: 'message',
      }}
    />
  );
};

export default Page;
