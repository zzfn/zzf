import { Button } from '@zzf/design';
import React, { useEffect, useState } from 'react';
import { saveDiscuss } from 'api/discuss';
import Link from 'next/link';
import { getUserInfo } from 'api/user';

const Comment = (props: any) => {
  const { articleId, updateList, replyId, parentId } = props;
  const [content, setContent] = useState('');
  const [userInfo, setUserInfo] = useState<any>({});
  const handleComment = async () => {
    if (!content) return;
    const { data } = await saveDiscuss({
      articleId,
      content,
      replyId,
      parentId,
      username: userInfo.username,
    });
    if (data) {
      updateList();
    }
  };
  const handleGetUser = async () => {
    const { data } = await getUserInfo();
    if (data) {
      setUserInfo(data);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('uid');
    setUserInfo({});
  };
  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <div>
      {userInfo.username ? (
        <>
          <div>
            {userInfo.username}-<a onClick={handleLogout}>退出登录</a>
          </div>
        </>
      ) : (
        <div>
          <p>您尚未登录，可匿名回复。</p>
          <Link href='/login'>
            <a>去登录/注册</a>
          </Link>
        </div>
      )}
      <textarea value={content} onChange={(e) => setContent(e.target.value)} className='border' />
      {userInfo.username && (
        <Button onClick={handleComment} className='border'>
          评论
        </Button>
      )}
    </div>
  );
};
export default Comment;
