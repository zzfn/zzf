import IconSymbols from 'components/IconSymbols';
import CommentPopover from './CommentPopover';
import CommentCard from './CommentCard';
import { fetchData } from "../../../../models/api";

async function getData(params: { objectType: string; objectId: string }) {
  return fetchData<Array<any>>({
    endpoint:'/v1/comments',
    queryParams: params,
    fetchParams:{
      next: { tags: ['comments'] },
    }
  })
}

const Comment = async ({ params }: { params: { objectType: string; objectId: string } }) => {
  const data = await getData(params);
  return (
    <>
      <h2 className='flex items-center my-2 gap-x-2'>
        <span>{data.length} 条评论</span>
        <CommentPopover
          params={{
            objectId: params.objectId,
            objectType: params.objectType,
            action: 'comment',
          }}
        >
          <IconSymbols icon='reply' />
        </CommentPopover>
      </h2>
      {Array.isArray(data) && (
        <ul className='flex flex-col gap-y-3'>
          {data.map((item: any) => (
            <CommentCard key={item.id} item={item}>
              {item.replies?.map((item: any) => <CommentCard key={item.id} item={item} />)}
            </CommentCard>
          ))}
        </ul>
      )}
    </>
  );
};
export default Comment;
