'use client';

import { CURRENT_USER_ENDPOINT } from '@/services/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSWRConfig } from 'swr';

const ERROR_MESSAGE: Record<string, string> = {
  missing_discourse_payload: '缺少登录回调参数',
  invalid_discourse_payload: '登录回调校验失败',
  missing_nonce: '登录状态已失效，请重试',
  invalid_nonce: '登录状态已过期，请重新登录',
  user_sync_failed: '用户信息同步失败',
  token_issue_failed: '登录令牌生成失败',
};

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate } = useSWRConfig();
  const status = searchParams.get('status');
  const error = searchParams.get('error');

  useEffect(() => {
    if (status === 'success') {
      const storedRedirect = window.sessionStorage.getItem('post_login_redirect');
      const redirectTarget =
        storedRedirect && storedRedirect.startsWith('/') && !storedRedirect.startsWith('//')
          ? storedRedirect
          : '/';

      mutate({
        endpoint: CURRENT_USER_ENDPOINT,
        fetchParams: {
          credentials: 'include',
        },
      });

      const timer = window.setTimeout(() => {
        window.sessionStorage.removeItem('post_login_redirect');
        router.replace(redirectTarget);
        router.refresh();
      }, 1200);

      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [mutate, router, status]);

  const description =
    status === 'success'
      ? 'Discourse 登录成功，正在返回之前的页面...'
      : ERROR_MESSAGE[error || ''] || '登录未完成，请重新尝试。';

  return (
    <main className='mx-auto flex min-h-[50vh] max-w-xl items-center justify-center px-6 py-20'>
      <div className='border-border-muted bg-bg-subtle w-full rounded-3xl border p-8 text-center'>
        <p className='text-fg-default text-lg font-semibold'>
          {status === 'success' ? '登录成功' : '登录失败'}
        </p>
        <p className='text-fg-muted mt-3 text-sm'>{description}</p>
        {status !== 'success' && (
          <button
            onClick={() => router.replace('/')}
            className='bg-bg-emphasis text-fg-onEmphasis mt-6 rounded-xl px-4 py-2 text-sm font-medium'
          >
            返回首页
          </button>
        )}
      </div>
    </main>
  );
}
