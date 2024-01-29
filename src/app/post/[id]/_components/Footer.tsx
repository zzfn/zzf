import IconSymbols from '../../../../components/IconSymbols';
import { Tooltip } from '@oc/design';
import { diff } from '../../../../utils/time';
import CommentPopover from './CommentPopover';
import dayjs from 'dayjs';

function Footer({
  dataSource,
  commentId,
  mutate,
}: {
  dataSource: any;
  commentId: string;
  mutate: any;
}) {
  return (
    <footer className='my-2 flex items-center text-sm text-[var(--md-ref-palette-neutral-60)]'>
      <IconSymbols icon='location_on' className='ml-2 mr-1' />
      {dataSource.address}
      <IconSymbols icon='update' className='ml-2 mr-1' />
      <Tooltip content={dayjs(dataSource.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
        <time>{diff(dataSource.createdAt)}</time>
      </Tooltip>
      <IconSymbols icon='quickreply' className='ml-2 mr-1' />
      <CommentPopover mutate={mutate} commentId={commentId} dataSource={dataSource}>
        <span className='hover:text-primary cursor-pointer'>回复</span>
      </CommentPopover>
    </footer>
  );
}
export default Footer;
