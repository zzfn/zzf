import React from 'react';
import { listArchives, listTags } from 'services/article';
import styles from 'styles/article.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import { getTitle } from '../../utils/getTitle';
import type { GetStaticPaths, GetStaticProps } from 'next';
import classNames from 'classnames';
import { Alert } from '@oc/design';

type TagType = {
  title: string;
  articleList: any[];
};
export default function Tag(props: NextProps<TagType>): JSX.Element {
  const { serverProps } = props;
  return (
    <div className={styles.detail}>
      <Head>
        <title>{getTitle(serverProps.title)}</title>
      </Head>
      <Alert type='info'>{serverProps.title}</Alert>
      <ul className={classNames('font-mono', 'text-base')}>
        {serverProps.articleList.map((item) => (
          <li key={item.id}>
            <span>{item.createTime}</span>-
            <Link href={`/article/${item.id}`}>
              <a className='text-primary-4'>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await listTags({});
  const paths = data.map((_) => ({ params: { id: _.tag } }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    params: { id },
  } = context;
  const { data } = await listArchives({ code: id as string });
  return {
    props: {
      serverProps: data,
    },
    revalidate: 5,
  };
};
