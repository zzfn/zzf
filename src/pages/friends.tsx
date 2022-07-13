import classNames from 'classnames';
import { Button, Alert } from '@zzf/design';

type FriendCard = {
  logo: string;
  title: string;
  description: string;
  url: string;
};
const Friends = () => {
  return (
    <div>
      <Alert type='info'>友情链接</Alert>
      <Button>申请友链</Button>
      <div className='grid grid-cols-2 gap-x-16'>
        <Card
          dataSource={{
            logo: 'https://www.dmoe.cc/random.php?s=2',
            title: '顾天恩 - 技术博客',
            description: '欢迎来到GTE的技术博客',
            url: '//blog.gute.fun/',
          }}
        />
        <Card
          dataSource={{
            logo: 'https://www.dmoe.cc/random.php?s=r',
            title: '淡然-博客',
            description: '记录个人学习笔记，发表个人学习感悟',
            url: '//101.132.68.0:3333/',
          }}
        />
      </div>
    </div>
  );
};
type CardProps = {
  dataSource: FriendCard;
};
const Card = ({ dataSource }: CardProps) => {
  const { logo, title, description, url } = dataSource;
  return (
    <a rel='noreferrer' target='_blank' href={url} className={classNames('flex', 'bg-primary','rounded-md','overflow-hidden')}>
      <img className={classNames('w-16', 'h-16', 'mr-2')} src={logo} alt='' />
      <div className={classNames('flex', 'flex-col', 'justify-between', 'p-2')}>
        <strong className='text-primary'>{title}</strong>
        <p className='text-secondary'>{description}</p>
      </div>
    </a>
  );
};
export default Friends;
