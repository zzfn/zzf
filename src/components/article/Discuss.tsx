import React, { useEffect, useState } from 'react';
import { listDiscuss } from 'api/discuss';
import { useRouter } from 'next/router';
import Icon from '../Icon';
import { Os } from '@zzf/toolkit';

function Discuss(props) {
  const router = useRouter();
  const [list, setList] = useState([]);
  async function handleInit() {
    const { data } = await listDiscuss({ ...router.query });
    setList(data);
  }
  useEffect(() => {
    handleInit();
  }, []);
  return (
    <div>
      {list.map((item) => (
        <div key={item.id} className='ml-6 pl-3'>
          <div id={item.id} className='TimelineItem TimelineItem--condensed'>
            <div className='TimelineItem-avatar'>
              <img
                className='avatar'
                height='40'
                width='40'
                alt='@octocat'
                src='https://user-images.githubusercontent.com/334891/29999089-2837c968-9009-11e7-92c1-6a7540a594d5.png'
              />
            </div>

            <div className='TimelineItem-badge'>
              <Icon name={'logo'} />
            </div>

            <div className='TimelineItem-body'>
              <div className='Box Box--condensed Box--blue'>
                <div className='Box-header Box-header--blue'>
                  <h3 className='Box-title'>{item.createTime}</h3>
                </div>
                <div className='Box-body'>{item.content}</div>
                <div className='Box-footer'>
                  <a href={`#${item.replyId}`} className='link-gray'>
                    {item.remark}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/*<div className='TimelineItem-break ml-0' />*/}
      <div className='ml-6 pl-3'>
        <div className='TimelineItem TimelineItem--condensed'>
          <div className='TimelineItem-avatar'>
            <img
              className='avatar'
              height='40'
              width='40'
              alt='@octocat'
              src='https://user-images.githubusercontent.com/334891/29999089-2837c968-9009-11e7-92c1-6a7540a594d5.png'
            />
          </div>

          <div className='TimelineItem-badge'>
            <Icon name={'logo'} />
          </div>
          <div className='TimelineItem-body'>
            <div className='Box Box--condensed Box--blue'>
              <div className='Box-header Box-header--blue d-flex flex-items-center'>
                <h3 className='Box-title flex-auto'>{new Date().toDateString()}</h3>
                <button className='btn btn-primary btn-sm'>提交</button>
              </div>
              <div className='Box-body'>
                <input
                  className='form-control'
                  type='text'
                  placeholder='留言'
                  aria-label='Repository description'
                />
              </div>
              <div className='Box-footer'>
                {typeof window !== 'undefined' && Os.getPlatform()}
                {/*<a href={`#${item.replyId}`} className='link-gray'>*/}
                {/*  {item.remark}*/}
                {/*</a>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discuss;
