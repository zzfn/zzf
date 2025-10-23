'use client';
import { useMessage } from '@/components/ui';

function Copy({ code }: { code: string }) {
  const message = useMessage();
  return (
    <span
      className='bg-bg-success-muted text-accent ml-auto hidden cursor-pointer rounded px-2 group-hover:block'
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
