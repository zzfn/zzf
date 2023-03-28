import { GetStaticProps } from 'next';
import { changelogList } from 'api/changelog';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Card } from '@oc/design';
import { translateMarkdown } from '../utils/translateMarkdown';
import Head from 'next/head';
import { getTitle } from '../utils/getTitle';
import Image from 'next/image';
import { getCdn } from '../utils/getCdn';
import React from 'react';

const Changelog = (props: any) => {
  const { serverProps } = props;
  return (
    <ul>
      <Head>
        <title>{getTitle('公告')}</title>
      </Head>
      <h1 className='mt-18 mb-8 text-2.5xl text-center'>公告</h1>
      {serverProps.map((item: any) => (
        <li key={item.id} className='mb-2'>
          <Card variant='filled'>
            <h3 className={classNames('flex', 'justify-between', 'text-base', 'font-semibold')}>
              <span>{item.title}</span>
              <span>{dayjs(item.createTime).format('YYYY-MM-DD')}</span>
            </h3>
            <article
              dangerouslySetInnerHTML={{
                __html: translateMarkdown(item.content),
              }}
              className='prose text-xs'
            />
          </Card>
        </li>
      ))}
    </ul>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await changelogList();
  return {
    props: {
      serverProps: data,
    },
    revalidate: 5,
  };
};
export default Changelog;
