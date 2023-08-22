import React from 'react';
import Comment from "../post/[id]/_components/Comment";

export const revalidate = 0;
const Page = async () => {
  return (
    <>
      <Comment id="message"/>
    </>
  );
};

export default Page;
