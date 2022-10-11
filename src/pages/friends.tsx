import classNames from 'classnames';
import { Button, Alert } from '@ootd/design';
import { GetStaticProps } from 'next';
import Image from 'next/future/image';
import { friendList } from 'api/friend';
import Head from 'next/head';
import { getTitle } from '../utils/getTitle';

type FriendCard = {
  logo: string;
  title: string;
  description: string;
  url: string;
};
const Friends = ({ serverProps }: any) => {
  return (
    <>
      <Head>
        <title>{getTitle('友链')}</title>
      </Head>
      <h3 className='text-neutral-4 font-bold text-xl my-3'>bio</h3>
      <p className='pl-3'>码农，软硬件爱好者，爱折腾</p>
      <h3 className='text-neutral-4 font-bold text-xl my-3'>connect</h3>
      <ul className='pl-3'>
        <li>
          Blog 🏠 <span className='text-link-4'>zzfzzf.com</span>
        </li>
        <li>
          Email 📧 <span className='text-link-4'>me@orluna.ink</span>
        </li>
        <li>
          GitHub 🕸 <span className='text-link-4'>zzfn</span>
        </li>
      </ul>
      <h3 className='text-neutral-4 font-bold text-xl my-3'>friends</h3>
      <div className='grid grid-cols-2 gap-x-16 m-2'>
        {serverProps.map((item: any) => (
          <Card
            key={item.id}
            dataSource={{
              logo: item.logo,
              title: item.title,
              description: item.description,
              url: item.url,
            }}
          />
        ))}
      </div>
      <Alert>
        please email <strong>me@orluna.ink</strong> if u want to be my friend
      </Alert>
      <p>你需要提供</p>
      <ul>
        <li>title: ootd-blog</li>
        <li>url: https://zzfzzf.com</li>
        <li>bio: 一个前端开发者的博客</li>
        <li>avatar: https://cdn.orluma.ltd/assets/logo.png</li>
      </ul>
    </>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await friendList();
  return {
    props: {
      serverProps: data,
    },
    revalidate: 1,
  };
};

type CardProps = {
  dataSource: FriendCard;
};
const Card = ({ dataSource }: CardProps) => {
  const { logo, title, description, url } = dataSource;
  return (
    <a
      rel='noreferrer'
      target='_blank'
      href={url}
      className={classNames('flex', 'bg-primary', 'rounded-md', 'overflow-hidden', 'mb-2')}
    >
      <Image
        width={100}
        height={100}
        className={classNames('w-16', 'h-16', 'mr-2')}
        src={logo}
        alt=''
      />
      <div className={classNames('flex', 'flex-col', 'justify-between', 'p-2')}>
        <strong className='text-neutral-4'>{title}</strong>
        <p className='text-neutral-2'>{description}</p>
      </div>
    </a>
  );
};
export default Friends;
