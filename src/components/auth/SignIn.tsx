'use client';
import { useFormStatus } from 'react-dom';
import { signInAction } from '@/app/actions/auth';

function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='flex items-center gap-2 rounded-lg bg-bg-emphasis px-4 
        py-2 text-fg-onEmphasis transition-colors 
        duration-200 hover:bg-bg-accent-emphasis disabled:opacity-70'
    >
      {pending ? (
        <svg className='h-5 w-5 animate-spin' viewBox='0 0 24 24'>
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
            fill='none'
          />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          />
        </svg>
      ) : (
        <svg viewBox='0 0 24 24' className='h-5 w-5' fill='none' aria-hidden='true'>
          <path
            d='M12 3c-4.971 0-9 4.029-9 9s4.029 9 9 9'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M12 7h7v7'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M10 14 19 5'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
      {pending ? '跳转中...' : '使用 Discourse 登录'}
    </button>
  );
}

function SignIn() {
  return (
    <form action={() => signInAction()}>
      <SignInButton />
    </form>
  );
}

export default SignIn;
