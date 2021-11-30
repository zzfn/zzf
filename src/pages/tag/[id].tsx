import React, { useEffect, useState } from 'react';
import { listArchives, listTags } from 'services/article';
import styles from 'styles/article.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import { getTitle } from '../../utils/getTitle';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import classNames from 'classnames';

type TagType = {
  createTime: string;
  id: string;
  title: string;
};
export default function Tag(props: NextProps<TagType[]>): JSX.Element {
  const { serverProps = [] } = props;
  const [title, setTitle] = useState('标签');
  const router = useRouter();
  useEffect(() => {
    const title = router.query.title;
    !Array.isArray(title) && setTitle(title);
  }, [router.query]);
  return (
    <div className={styles.detail}>
      <Head>
        <title>{getTitle(title)}</title>
      </Head>
      <ul className={classNames('font-mono', 'text-base')}>
        {serverProps.map((item) => (
          <li key={item.id}>
            <span>{item.createTime}</span>-
            <Link href={`/article/${item.id}`}>
              <a className={'text-brand'}>{item.title}</a>
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
