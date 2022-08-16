import styles from 'styles/home.module.scss';
import LottiePlayer from '../LottiePlayer/LottiePlayer';
import classNames from 'classnames';
import Link from 'next/link';
import { diff } from 'utils/time';
import React, { useEffect, useState } from 'react';
import { Card, SvgIcon } from '@dekopon/design';
import useFcp from 'hooks/useFcp';
import { articleCount, lastUpdated } from 'api/article';

type LastUpdatedListType = {
  title: string;
  id: string;
  updateTime: string;
};

const Right = () => {
  const [lastUpdatedList, setLastUpdatedList] = useState<LastUpdatedListType[]>([]);
  const loadTime = useFcp();
  const [count, setCount] = useState<any>({ tag: 0, article: 0 });

  async function getLastUpdatedList() {
    const { data } = await lastUpdated();
    setLastUpdatedList(data);
  }
  async function getCount() {
    const { data } = await articleCount();
    setCount(data);
  }
  useEffect(() => {
    getLastUpdatedList();
    getCount();
  }, []);
  return (
    <>
      <Card title='关于我'>
        <div className={styles.wrap}>
          <LottiePlayer size={100} url='https://oss-zzf.zzfzzf.com/cdn/1632384646840vb5kcx.json' />
          <div className='flex justify-around'>
            <div>
              <div className='text-center'>
                <Link href='/archive'>{count.article}</Link>
              </div>
              <div>文章</div>
            </div>
            <div>
              <div className='text-center'>
                <Link href='/tags'>{count.tag}</Link>
              </div>
              <div>标签</div>
            </div>
          </div>
        </div>
      </Card>
      <Card className='mt-4 test' title='关于本站'>
        <div className={classNames('text-info', 'text-sm')}>
          本次加载时间 <span className='font-medium'>{loadTime}</span> ms
        </div>
      </Card>
      <Card className='mt-4' title='最近更新'>
        <ul>
          {lastUpdatedList.map((n) => (
            <li className={classNames('flex')} key={n.id}>
              <Link prefetch={false} href={`/article/${n.id}`}>
                <a
                  title={n.title}
                  className={classNames(
                    'flex',
                    'justify-between',
                    'items-center',
                    'group',
                    'w-full',
                  )}
                  target='_blank'
                >
                  <div className={classNames('flex', 'justify-between', 'items-center')}>
                    <SvgIcon
                      className={classNames(
                        'group-hover:translate-x-2',
                        'text-primary',
                        'mr-4',
                        'duration-300',
                      )}
                      name='right'
                    />
                    <div
                      className={classNames('truncate', 'font-medium', 'text-base', 'text-info')}
                    >
                      {n.title}
                    </div>
                  </div>
                  <div className={classNames('whitespace-nowrap', 'text-sm', 'text-gray-1000')}>
                    --{diff(n.updateTime)}
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};
export default Right;
