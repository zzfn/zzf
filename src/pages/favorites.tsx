import type { FC } from 'react';
import Link from 'next/link';
import { favoriteList } from 'api/article';
import type { GetStaticProps } from 'next';
import { Fragment } from 'react';
type Item = {
  category: string;
  categoryDesc: string;
  id: string;
  img: string;
  isDelete: number;
  isRelease: boolean;
  link: string;
  orderNum: number;
  remark: string;
  title: string;
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
          <h2 className={'text-2xl text-tertiary m-1'}>{item}</h2>
          <nav className={`bg-primary p-2 flex flex-wrap`}>
            {arr[item].map((node) => (
              <Link key={node.id} href={node.link}>
                <a
                  rel='noopener'
                  target={'_blank'}
                  className={
                    'text-xl text-secondary hover:text-tertiary mr-5 whitespace-nowrap mb-2'
                  }
                >
                  {node.title}
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
