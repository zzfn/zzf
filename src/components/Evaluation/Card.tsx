import React from 'react';

function Card(props: any) {
  const { data, index } = props;
  return (
    <div className='border-solid border-b'>
      <header className='flex justify-between'>
        <div className={'flex'}>
          <img
            width={20}
            src='//oss-zzf.zzfzzf.com/001tzwrBly1gvqp2mv1lhj60zk0qoqin02.jpg'
            alt=''
          />
          <span>匿名用户</span>
        </div>
        <div>{index + 1}层</div>
      </header>
      <div>{data.content}</div>
    </div>
  );
}

export default Card;
