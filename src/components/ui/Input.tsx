'use client';

import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import classNames from 'classnames';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={classNames(
        'text-fg-default w-full rounded-lg border border-[color:var(--borderColor-muted)] bg-[color:var(--bgColor-default)] px-4 py-2 text-sm transition-colors duration-200',
        'placeholder:text-fg-muted focus:border-[color:var(--borderColor-accent-emphasis)] focus:ring-2 focus:ring-[color:var(--borderColor-accent-emphasis)]/40 focus:outline-none',
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
