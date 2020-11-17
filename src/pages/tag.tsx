import React from 'react';
import styles from '@/styles/tag.module.scss';
import Head from 'next/head';
import { listTags } from '@/services/article';
import Link from 'next/link';
import { Tag } from 'com/Tag/Tag';

export default function About({ serverProps }): JSX.Element {
  return (
    <div className={styles.tagWrap}>
      <Head>
        <title>zzf~标签</title>
      </Head>
      {serverProps.map((item) => (
        <div key={item.code} style={{ margin: '20px', display: 'inline-block' }}>
          <Link href={`/tag/${item.code}?name=${item.tag}`}>
            <span style={{ cursor: 'pointer' }}>
              <Tag color={'#108ee9'}>
                {item.tag}-{item.count}
              </Tag>
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const { data } = await listTags({});
  return {
    props: {
      serverProps: data,
    },
    revalidate: 1,
  };
};
