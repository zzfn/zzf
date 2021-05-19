import React from 'react';
import styles from 'styles/tag.module.scss';
import Head from 'next/head';
import { listTags } from 'services/article';
import Link from 'next/link';
import Arrow from 'components/arrow/arrow';
import { geTitle } from '../utils/geTitle';

export default function TagPage({ serverProps }): JSX.Element {
  return (
    <div className={styles.tagWrap}>
      <Head>
        <title>{geTitle('标签')}</title>
      </Head>
      {serverProps.map((item) => (
        <div key={item.code} style={{ margin: '10px', display: 'inline-block' }}>
          <Link href={`/tag/${item.code}?desc=${encodeURIComponent(item.tag)}`}>
            <a>
              <Arrow color={'#108ee9'} number={item.count}>
                {item.tag}
              </Arrow>
            </a>
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
