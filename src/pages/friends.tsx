import classNames from 'classnames';
import { Button, Alert } from '@dekopon/design';
import { GetStaticProps } from 'next';
import { listTags } from 'api/article';
import { friendList } from 'api/friend';

type FriendCard = {
  logo: string;
  title: string;
  description: string;
  url: string;
};
const Friends = ({ serverProps }: any) => {
  return (
    <div>
      <Alert type='info'>友情链接</Alert>
      <div className='grid grid-cols-2 gap-x-16'>
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
      <Button>申请友链</Button>
    </div>
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
      className={classNames('flex', 'bg-primary', 'rounded-md', 'overflow-hidden')}
    >
      <img className={classNames('w-16', 'h-16', 'mr-2')} src={logo} alt='' />
      <div className={classNames('flex', 'flex-col', 'justify-between', 'p-2')}>
        <strong className='text-primary'>{title}</strong>
        <p className='text-secondary'>{description}</p>
      </div>
    </a>
  );
};
export default Friends;
