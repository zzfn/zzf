import { listDiscuss } from 'api/discuss';
import IconSymbols from 'components/IconSymbols';
import Avatar from './Avatar';
import CommentPopover from './CommentPopover';
import Footer from './Footer';
import CommentCard from './CommentCard';
type Comment = {
  id: number;
  parentCommentId?: number;
  content: string;
  children?: Comment[];
};
const Comment = async ({ id }: { id: string }) => {
  const { data } = await listDiscuss({ id: id });
  function convertToParentChildStructure(comments: Comment[]): Comment[] {
    let parentComments: Comment[] = [];
    let childComments: Record<number, Comment[]> = {};

    // 遍历评论，分为父评论和子评论
    comments.forEach((comment) => {
      if (!comment.parentCommentId) {
        parentComments.push(comment);
      } else {
        if (!childComments[comment.parentCommentId]) {
          childComments[comment.parentCommentId] = [];
        }
        childComments[comment.parentCommentId].push(comment);
      }
    });

    // 将子评论添加到相应的父评论
    parentComments.forEach((parentComment) => {
      parentComment.children = childComments[parentComment.id] || [];
    });

    return parentComments.reverse();
  }
  return (
    <>
      <h2 className='flex items-center my-2 gap-x-2'>
        <span>{data.length} 条评论</span>
        <CommentPopover articleId={id}>
          <IconSymbols icon='reply' />
        </CommentPopover>
      </h2>
      <ul className='flex flex-col gap-y-3'>
        {convertToParentChildStructure(data).map((item: any) => (
          <CommentCard key={item.id} item={item} id={id}>
            {item.children?.map((item: any) => (
              <CommentCard key={item.id} item={item} id={id} />
            ))}
          </CommentCard>
        ))}
      </ul>
    </>
  );
};
export default Comment;
