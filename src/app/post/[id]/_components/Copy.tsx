'use client';
import { useMessage } from '@oc/design';

function Copy({ code }: { code: string }) {
  const message = useMessage();
  return (
    <span
      className='ml-auto hidden cursor-pointer rounded bg-success-muted px-2 text-accent group-hover:block'
      onClick={async () => {
        await navigator.clipboard.writeText(code);
        message?.add({ content: 'Copied', type: 'success' });
      }}
    >
      Copy
    </span>
  );
}

export default Copy;
