'use client';

import { useState } from 'react';
import { Copy as CopyIcon, Check } from 'lucide-react';

function Copy({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      type='button'
      aria-label='复制代码'
      title={copied ? '已复制到剪贴板' : '复制代码'}
      className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-mono transition-all duration-200 cursor-pointer ${
        copied
          ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
          : 'border-border-muted/60 bg-bg-muted/50 text-fg-muted hover:border-border-muted hover:bg-bg-muted hover:text-fg-default'
      }`}
    >
      {copied ? (
        <>
          <Check size={12} className='text-emerald-500' />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <CopyIcon size={12} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

export default Copy;
