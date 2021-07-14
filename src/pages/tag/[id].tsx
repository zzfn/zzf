import React from 'react';
import { listArchives, listTags } from 'services/article';
import styles from 'styles/article.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import { getTitle } from '../../utils/getTitle';
import type { GetStaticPaths, GetStaticProps } from 'next';

export default function Tag(props: any): JSX.Element {
  const { serverProps = [] } = props;
  return (
    <div className={styles.detail}>
      <Head>
        <title>{getTitle('标签')}</title>
      </Head>
      <ul className={'font-mono'}>
        {serverProps.map((item) => (
          <li key={item.id}>
            <span style={{ color: '#8a8a8a' }}>{item.createTime}</span>-
            <Link href={`/article/${item.id}`}>
              <a style={{ color: '#4183c4' }}>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await listTags({});
  const paths = data.map((_) => ({ params: { id: _.code } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    params: { id },
  } = context;
  const { data } = await listArchives({ code: id });
  return {
    props: {
      serverProps: data,
      name: context.query ? context.query.name : null,
    },
    revalidate: 1,
  };
};
