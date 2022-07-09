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
      <Card
        dataSource={{
          logo: 'https://oss-zzf.zzfzzf.com/cdn/1657291776373FsCXbK.jpg',
          title: '后台管理系统',
          description: '博客的后台管理系统',
          url: '//admin.zzfzzf.com',
        }}
      />
    </div>
  );
};
type CardProps = {
  dataSource: FriendCard;
};
const Card = ({ dataSource }: CardProps) => {
  const { logo, title, description, url } = dataSource;
  return (
    <a rel='noreferrer' target='_blank' href={url} className={classNames('flex', 'bg-primary')}>
      <img className={classNames('w-16', 'h-16')} src={logo} alt='' />
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </a>
  );
};
export default Friends;
