import IconSymbols from "../../../../components/IconSymbols";
import { Tooltip } from "@oc/design";
import { diff } from "../../../../utils/time";
import CommentPopover from "./CommentPopover";
import dayjs from "dayjs";

function Footer({ dataSource,commentId,mutate }: { dataSource: any,commentId:string,mutate:any }) {
  return (
    <footer className='flex items-center text-sm my-2 text-[var(--md-ref-palette-neutral-60)]'>
      <IconSymbols icon='location_on' className='ml-2 mr-1' />
      {dataSource.address}
      <IconSymbols icon='update' className='ml-2 mr-1' />
      <Tooltip content={dayjs(dataSource.createdAt).format("YYYY-MM-DD HH:mm:ss")}>
        <time>{diff(dataSource.createdAt)}</time>
      </Tooltip>
      <IconSymbols icon='quickreply' className='mr-1 ml-2' />
      <CommentPopover mutate={mutate} commentId={commentId} dataSource={dataSource}>
        <span className='cursor-pointer hover:text-primary'>回复</span>
      </CommentPopover>
    </footer>
  );
}
export default Footer
