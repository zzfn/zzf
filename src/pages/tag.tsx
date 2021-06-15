import React from 'react';
import Head from 'next/head';
import { listTags } from 'services/article';
import Link from 'next/link';
import Arrow from 'components/arrow/arrow';
import { getTitle } from '../utils/getTitle';

export default function TagPage({ serverProps }: NextProps<any>): JSX.Element {
  return (
    <>
      <Head>
        <title>{getTitle('标签')}</title>
      </Head>
      {serverProps.map((item) => (
        <div key={item.code} className={'m-2 inline-block'}>
          <Link href={`/tag/${item.code}?desc=${encodeURIComponent(item.tag)}`}>
            <a>
              <Arrow color={'#108ee9'} number={item.count}>
                {item.tag}
              </Arrow>
            </a>
          </Link>
        </div>
      ))}
    </>
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
