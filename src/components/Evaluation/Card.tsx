import React, { useState } from 'react';
import Comment from './Comment';
import { Modal } from '@zzf/design';

function Card(props: any) {
  const { dataSource, updateList } = props;
  const [visible, setVisible] = useState(false);
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
      <span className='text-gray-400'>点击回复</span>

      <div className='pl-4'>
        {dataSource.children?.map((item: any) => {
          return <Card key={item.id} dataSource={item} updateList={updateList} />;
        })}
      </div>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        onConfirm={() => setVisible(false)}
      >
        <Comment
          parentId={dataSource.parentId || dataSource.id}
          replyId={dataSource.id}
          articleId={dataSource.articleId}
          updateList={updateList}
        />
      </Modal>
    </div>
  );
}

export default Card;
