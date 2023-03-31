import { bottts } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { IconButton, Input, Message, Popover, Tooltip } from '@oc/design';
import { useQuery } from '@tanstack/react-query';
import { listDiscuss, saveDiscuss } from 'api/discuss';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { diff } from 'utils/time';
import IconSymbols from '../../components/IconSymbols';
import Monitor from '../../utils/monitor';

function buildTree(nodes: any) {
  return nodes.reduce((prev: any, curr: any) => {
    const obj = nodes.find((item: any) => item.id === curr['parentCommentId']);
    if (obj) {
      // 存在父节点
      !Object.prototype.hasOwnProperty.call(obj, 'children') && (obj['children'] = []);
      obj['children'].push(curr);
    } else {
      prev.push(curr);
    }
    return prev;
  }, []);
}

function tree2list(trees: any = []) {
  let list: any = [];

  function dfs(node: any) {
    if (!node) return;

    list.push(node);

    if (node.children && node.children.length > 0) {
      for (let child of node.children) {
        dfs(child);
      }
    }
  }

  for (let tree of trees) {
    dfs(tree);
  }

  return list;
}
const Avatar = function ({ userId, size = 40 }: { userId: string, size?: number }) {
  const avatar = useMemo(() => {
    return createAvatar(bottts, {
      size: 128,
      flip: true,
      seed: userId,
    }).toDataUriSync();
  }, [userId]);
  return <Image width={size} height={size} src={avatar} alt={userId} />
}

const CommentPopover = function ({ children, dataSource = {}, onSuccess }: any) {
  const [content, setContent] = useState('');
  const [visitorId, setVisitorId] = useState('');
  const [visible, setVisible] = useState(false);
  const handleComment = async () => {
    if (!content) return;
    const { data } = await saveDiscuss({
      postId: "message",
      content,
      replyUserId: dataSource.createBy,
      parentCommentId: dataSource.id,
    });
    if (data) {
      onSuccess()
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
  return <Popover
    visible={visible}
    hide={() => setVisible(false)}
    show={() => setVisible(true)}
    placement='bottomLeft'
    content={
      <div className='bg-[var(--md-sys-color-background)] border px-3 py-2'>
        <Input
          className='h-full'
          type='textarea'
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder='说点什么'
        />
        <div className='flex justify-between py-1'>
          <Avatar userId={visitorId} />
          <IconButton onClick={handleComment} className='text-xl'>
            <IconSymbols icon="send" />
          </IconButton>
        </div>
      </div>
    }
  >
    {children}
  </Popover>
}

function Footer({ dataSource, refetch }: { dataSource: any, refetch: any }) {
  return <footer className='flex items-center text-sm my-2 text-[var(--md-ref-palette-neutral-60)]'>
    <IconSymbols icon="location_on" className='ml-2 mr-1' />
    {dataSource.address}
    <IconSymbols icon="update" className='ml-2 mr-1' />
    <Tooltip content={dataSource.createTime}>
      <time>{diff(dataSource.createTime)}</time>
    </Tooltip>
    <IconSymbols icon="quickreply" className='mr-1 ml-2' />
    <CommentPopover dataSource={dataSource} onSuccess={refetch}>
      <span className='cursor-pointer hover:text-primary'>
        回复
      </span>
    </CommentPopover>
  </footer>
}
function Comments(props: any) {
  const { postId } = props;
  const { data = [], refetch } = useQuery([postId], () =>
    listDiscuss({ id:postId }).then(({ data }) => buildTree(data).map((item: any) => ({ ...item, children: tree2list(item.children) }))),
  );

  return (
    <>
      <h2 className='flex items-center my-2 gap-x-2'>
        <span>{data.length} 条评论</span>
        <CommentPopover onSuccess={refetch}>
          <IconButton className='text-lg'>
            <IconSymbols icon="reply" />
          </IconButton>
        </CommentPopover>
      </h2>
      <ul>
        {
          data.map((item: any) => <div key={item.id} className='flex items-start gap-x-4'>
            <Avatar userId={item.createBy} />
            <div>
              <div className='bg-surface-5 px-3 py-2 rounded'>
                <div className='flex items-center gap-x-1 text-sm'>
                  <span className='font-medium'>{item.createBy.slice(0, 6)}</span>
                </div>
                <p className='my-2'>{item.content}</p>
              </div>
              <Footer dataSource={item} refetch={refetch}/>
              <div>
                {
                  item.children?.map((_: any) => <div key={_.id} className='flex items-start gap-x-4'>
                    <Avatar userId={_.createBy} />
                    <div>
                      <div className='bg-surface-5 px-3 py-2 rounded'>
                        <div className='flex items-center'>
                          {_.createBy.slice(0, 6)}
                        </div>
                        <p className='flex'><span className='text-primary flex mr-2'>@{_.replyUserId?.slice(0, 6)}</span>{_.content}</p>
                      </div>
                      <Footer dataSource={_} refetch={refetch}/>
                    </div>
                  </div>
                  )
                }
              </div>
            </div>
          </div>)
        }
      </ul>
    </>
  );
}

export default Comments;
