import React from 'react';
import Portal from './Portal';
import Comment from './Comment';

function Card(props: any) {
  const { dataSource, updateList } = props;
  return (
    <div className='border-solid border-b mt-5'>
      <header className='flex justify-between text-gray-400'>
        <div>
          <span>{dataSource.nickName}</span>
          {dataSource.replyId !== dataSource.parentId && (
            <>
              回复
              <span>{dataSource.replyName}</span>
            </>
          )}
        </div>
        <div>
          <span>{dataSource.address}</span>-<span>{dataSource.createTime}</span>
        </div>
      </header>
      <div>{dataSource.content}</div>
      <Portal toggled={<span className='text-gray-400'>点击回复</span>}>
        <Comment
          parentId={dataSource.parentId || dataSource.id}
          replyId={dataSource.id}
          articleId={dataSource.articleId}
          updateList={updateList}
        />
      </Portal>
      <div className='pl-4'>
        {dataSource.children?.map((item: any) => {
          return <Card key={item.id} dataSource={item} updateList={updateList} />;
        })}
      </div>
    </div>
  );
}

export default Card;
