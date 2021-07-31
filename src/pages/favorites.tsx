import type { FC } from 'react';
import Link from 'next/link';
import { favoriteList } from 'api/article';
import styles from 'styles/favorites.module.scss';
import { formatImg } from '../utils/formatImg';
import type { GetStaticProps } from 'next';
import { Fragment } from 'react';
type Item = {
  category: string;
  categoryDesc: string;
  createBy?: any;
  createTime?: any;
  id: string;
  img: string;
  isDelete: number;
  isRelease: boolean;
  link: string;
  orderNum: number;
  remark: string;
  title: string;
  updateBy?: any;
  updateTime: string;
};
type Favorite = {
  serverProps: Item[];
};
const Favorites: FC<Favorite> = ({ serverProps }) => {
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
        <Fragment key={item}>
          <h2>{item}</h2>
          <nav className={`${styles.ul} color-text-primary`}>
            {arr[item].map((node) => (
              <Link key={node.title} href={node.link}>
                <a target={'_blank'} className={'flex flex-col items-center'}>
                  <img height={40} width={40} src={formatImg(node.img, 40)} alt={node.title} />
                  <section title={node.title} className={styles.title}>
                    {node.title}
                  </section>
                </a>
              </Link>
            ))}
          </nav>
        </Fragment>
      ))}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await favoriteList({});
  return {
    props: {
      serverProps: data,
    },
    revalidate: 1,
  };
};
export default Favorites;
