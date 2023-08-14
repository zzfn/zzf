import { listDiscuss } from 'api/discuss';
import IconSymbols from 'components/IconSymbols';
import CommentPopover from './CommentPopover';
import CommentCard from './CommentCard';

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
const Comment = async ({ id }: { id: string }) => {
  const { data } = await listDiscuss({ id: id });
  return (
    <>
      <h2 className='flex items-center my-2 gap-x-2'>
        <span>{data.length} 条评论</span>
        <CommentPopover articleId={id}>
          <IconSymbols icon='reply' />
        </CommentPopover>
      </h2>
      <ul className='flex flex-col gap-y-3'>
        {buildTree(data).map((item: any) => ({ ...item, children: tree2list(item.children) })).reverse().map((item: any) => (
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
