import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { favoriteList } from 'api/article';
import styles from 'styles/favorites.module.scss';
import { formatImg } from '../utils/formatImg';

function Favorites({ serverProps }: { serverProps: any[] }) {
  const arr = serverProps.reduce((prev, curr) => {
    const tag = curr.categoryDesc;
    if (Object.prototype.hasOwnProperty.call(prev, tag)) {
      prev[tag].push(curr);
    } else {
      prev[tag] = [];
      prev[tag].push(curr);
    }
    return prev;
  }, {});
  return (
    <>
      {Object.keys(arr).map((item) => (
        <React.Fragment key={item}>
          <h2>{item}</h2>
          <nav className={styles.ul}>
            {arr[item].map((node) => (
              <Link key={node.title} href={node.link}>
                <a target={'_blank'}>
                  <Image
                    height={40}
                    width={40}
                    layout={'intrinsic'}
                    src={formatImg(node.img, 40)}
                  />
                  <section className={styles.title}>{node.title}</section>
                </a>
              </Link>
            ))}
          </nav>
        </React.Fragment>
      ))}
    </>
  );
}

export const getStaticProps = async () => {
  const { data } = await favoriteList({});
  return {
    props: {
      serverProps: data,
    },
    revalidate: 1,
  };
};
export default Favorites;
