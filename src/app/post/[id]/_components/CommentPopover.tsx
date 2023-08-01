"use client";
import { useEffect, useState } from "react";
import { saveDiscuss } from "api/discuss";
import { Input, Message, Popover } from "@oc/design";
import Monitor from "../../../../utils/monitor";
import Avatar from "./Avatar";
import IconSymbols from "../../../../components/IconSymbols";

const CommentPopover = function ({ children, dataSource = {}, onSuccess,articleId }: any) {
  const [content, setContent] = useState('');
  const [visitorId, setVisitorId] = useState('');
  const [visible, setVisible] = useState(false);
  const handleComment = async () => {
    if (!content) return;
    const { data } = await saveDiscuss({
      postId: articleId,
      content,
      replyUserId: dataSource.createBy,
      parentCommentId: dataSource.id,
    });
    if (data) {
      onSuccess();
      setVisible(false);
      setContent('');
      Message.success('评论成功');
    }
  };
  const getVisitorId = async () => {
    const monitor = new Monitor();
    const id = await monitor.getVisitor();
    setVisitorId(id);
  };
  useEffect(() => {
    getVisitorId();
  }, []);
  return (
    <Popover
      visible={visible}
      hide={() => setVisible(false)}
      show={() => setVisible(true)}
      placement='bottomLeft'
      content={
        <div className='px-3 py-2'>
          <Input
            className='h-full'
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder='说点什么'
          />
          <div className='flex items-center justify-between py-1'>
            <Avatar userId={visitorId}/>
            <IconSymbols onClick={()=>{
              handleComment()
            }} icon='send' />
          </div>
        </div>
      }
    >
      {children}
    </Popover>
  );
};
export default CommentPopover;
