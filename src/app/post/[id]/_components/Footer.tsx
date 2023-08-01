import IconSymbols from "../../../../components/IconSymbols";
import { Tooltip } from "@oc/design";
import { diff } from "../../../../utils/time";
import CommentPopover from "./CommentPopover";

function Footer({ dataSource,articleId }: { dataSource: any,articleId:string }) {
  return (
    <footer className='flex items-center text-sm my-2 text-[var(--md-ref-palette-neutral-60)]'>
      <IconSymbols icon='location_on' className='ml-2 mr-1' />
      {dataSource.address}
      <IconSymbols icon='update' className='ml-2 mr-1' />
      <Tooltip content={dataSource.createTime}>
        <time>{diff(dataSource.createTime)}</time>
      </Tooltip>
      <IconSymbols icon='quickreply' className='mr-1 ml-2' />
      <CommentPopover dataSource={dataSource} articleId={articleId}>
        <span className='cursor-pointer hover:text-primary'>回复</span>
      </CommentPopover>
    </footer>
  );
}
export default Footer
