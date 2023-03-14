import React from 'react';
import { listArchives, listTags } from 'services/article';
import Head from 'next/head';
import Link from 'next/link';
import { getTitle } from '../../utils/getTitle';
import type { GetStaticPaths, GetStaticProps } from 'next';
import classNames from 'classnames';
import { Alert, Card } from "@oc/design";

type TagType = {
  title: string;
  articleList: any[];
};
export default function Tag(props: NextProps<TagType>): JSX.Element {
  const { serverProps } = props;
  return (
    <>
      <Head>
        <title>{getTitle(serverProps.title)}</title>
      </Head>
      <Alert type='info'>{serverProps.title}</Alert>
        <ul className={classNames( 'text-base','text-[var(--primary-text)]')}>
          {serverProps.articleList.map((item) => (
            <li className={classNames('bg-surface')} key={item.id}>
              <span className='font-mono'>{item.createTime}</span>-
              <Link href={`/article/${item.id}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
    </>
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
