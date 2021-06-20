import React, { useEffect, useState } from 'react';
import { listDiscuss, saveDiscuss } from 'api/discuss';
import { useRouter } from 'next/router';
import Icon from '../Icon';
import { Os } from '@zzf/toolkit';
import useIsPc from '../../hooks/useIsPc';
import Loading from '../loading/Loading';

function Discuss(): JSX.Element {
  const router = useRouter();
  const isPc = useIsPc();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [replyId, setReplyId] = useState('');
  async function handleInit() {
    setLoading(true);
    const { data } = await listDiscuss({ ...router.query });
    setLoading(false);
    setList(data);
  }
  async function handleSubmit() {
    await saveDiscuss({
      content: value,
      remark: Os.getPlatform(),
      replyId,
      articleId: router.query.id,
    });
    handleInit();
  }
  useEffect(() => {
    handleInit();
  }, []);
  return loading ? (
    <Loading />
  ) : isPc ? (
    <div>
      {list.map((item, idx) => (
        <div key={item.id} className='ml-6 pl-3'>
          <div discuss-id={item.id} className='TimelineItem TimelineItem--condensed'>
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
                  <h3 className='Box-title flex-auto'>
                    {list.length - idx}楼-{item.createTime}
                  </h3>
                  <a href={'#reply'}>
                    <button
                      onClick={() => {
                        setReplyId(item.id);
                        const e = document.querySelector(`[discuss-id = ${item.replyId}]`);
                        e &&
                          e.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                            inline: 'nearest',
                          });
                      }}
                      className='btn btn-primary btn-sm'
                    >
                      回复
                    </button>
                  </a>
                </div>
                <div className='Box-body'>{item.content}</div>
                <div className='Box-footer'>
                  <a href={`#${item.replyId}`} className='link-gray'>
                    {item.remark}
                  </a>
                  <a
                    onClick={() => {
                      const e = document.querySelector(`[discuss-id = ${item.replyId}]`);
                      e &&
                        e.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                    }}
                  >
                    {item.replyId &&
                      `回复${list.length - list.findIndex((i) => i.id === item.replyId)}楼`}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className='ml-6 pl-3'>
        <div discuss-id={'reply'} className='TimelineItem TimelineItem--condensed'>
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
                <button onClick={handleSubmit} className='btn btn-primary btn-sm'>
                  提交
                </button>
              </div>
              <div className='Box-body'>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
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
  ) : (
    <div>
      {list.map((item, idx) => (
        <div key={item.id} discuss-id={item.id} className='TimelineItem TimelineItem--condensed'>
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
                <h3 className='Box-title flex-auto'>
                  <img
                    className='avatar'
                    height='20'
                    width='20'
                    alt='@octocat'
                    src='https://user-images.githubusercontent.com/334891/29999089-2837c968-9009-11e7-92c1-6a7540a594d5.png'
                  />
                  {list.length - idx}楼-{item.createTime}
                </h3>
                <a href={'#reply'}>
                  <button
                    onClick={() => {
                      setReplyId(item.id);
                      const e = document.querySelector(`[discuss-id = "${item.replyId}"]`);
                      e &&
                        e.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                          inline: 'nearest',
                        });
                    }}
                    className='btn btn-primary btn-sm'
                  >
                    回复
                  </button>
                </a>
              </div>
              <div className='Box-body'>{item.content}</div>
              <div className='Box-footer'>
                {item.remark}
                <a
                  onClick={() => {
                    const e = document.querySelector(`[discuss-id = "${item.replyId}"]`);
                    e &&
                      e.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                  }}
                >
                  {item.replyId &&
                    `回复${list.length - list.findIndex((i) => i.id === item.replyId)}楼`}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div discuss-id={'reply'} className='TimelineItem TimelineItem--condensed'>
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
              <button onClick={handleSubmit} className='btn btn-primary btn-sm'>
                提交
              </button>
            </div>
            <div className='Box-body'>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
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
  );
}

export default Discuss;
