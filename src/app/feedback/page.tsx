import React from 'react';
import Comment from "../post/[id]/_components/Comment";

const Page = async () => {
  return (
    <>
      <Comment params={{
        objectId: '',
        objectType: 'message'
      }}/>
    </>
  );
};

export default Page;
