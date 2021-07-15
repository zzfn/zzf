import React, { useEffect, useState } from 'react';
import { listArchives, listTags } from 'services/article';
import styles from 'styles/article.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import { getTitle } from '../../utils/getTitle';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

export default function Tag(props: any): JSX.Element {
  const { serverProps = [] } = props;
  const [title, setTitle] = useState('标签');
  const router = useRouter();
  useEffect(() => {
    setTitle((router.query as any).desc);
  }, []);
  return (
    <div className={styles.detail}>
      <Head>
        <title>{getTitle(title)}</title>
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
  console.log(context);
  console.log(data);
  return {
    props: {
      serverProps: data,
    },
    revalidate: 1,
  };
};
